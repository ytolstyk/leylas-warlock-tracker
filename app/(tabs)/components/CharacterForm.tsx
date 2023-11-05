import { useState } from "react";
import { Button } from "../../../styles/buttons";
import { Character } from "../../initialState";
import { Container, Label, Row } from "../styles";
import { StyledInput } from "../../../styles/inputs";
import { Margin } from "../../../styles/common";

type Props = {
  onSavePress: (char: Character) => void;
  onCancelPress: () => void;
  character: Character;
};

export function CharacterForm({
  onSavePress,
  onCancelPress,
  character,
}: Props) {
  const [formData, setFormData] = useState<Character>(character);

  const handleInputChange = (key: keyof typeof character) => (text: string) => {
    setFormData((oldData) => {
      return {
        ...oldData,
        [key]: text,
      };
    });
  };

  const handleSavePress = () => {
    onSavePress(formData);
  };

  return (
    <Container>
      <Row>
        <Label>Name</Label>
        <StyledInput
          value={formData?.name}
          onChangeText={handleInputChange("name")}
        />
      </Row>
      <Row>
        <Label>Race</Label>
        <StyledInput
          value={formData?.race}
          onChangeText={handleInputChange("race")}
        />
      </Row>
      <Row>
        <Label>Class</Label>
        <StyledInput
          value={formData?.class}
          onChangeText={handleInputChange("class")}
        />
      </Row>
      <Row>
        <Label>Total Level</Label>
        <StyledInput
          value={formData?.totalLevel}
          onChangeText={handleInputChange("totalLevel")}
          keyboardType="numeric"
        />
      </Row>
      <Row>
        <Label>Image URL</Label>
        <StyledInput
          value={formData?.imageUrl}
          onChangeText={handleInputChange("imageUrl")}
        />
      </Row>
      <Margin flexDirection="row" top={2}>
        <Button onPress={onCancelPress} label="Cancel" />
        <Margin left={2}>
          <Button onPress={handleSavePress} label="Save" />
        </Margin>
      </Margin>
    </Container>
  );
}
