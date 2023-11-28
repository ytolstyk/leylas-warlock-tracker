import { useState } from "react";
import { Button } from "../../styles/buttons";
import {
  Container,
  Label,
  Value,
  Row,
  CharacterImage,
} from "../../components/styles";
import { useCharacter } from "../hooks/useCharacter";
import { CharacterForm } from "../../components/CharacterForm";
import { Character } from "../initialState";
import { Margin } from "../../styles/common";
import { ImageBackground } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../styles/colors";
import { lighten } from "polished";

export default function CharacterScreen() {
  const { character, isLoading, updateCharacter } = useCharacter();
  const [currentRoll, setCurrentRoll] = useState(0);
  const [view, setView] = useState<"read" | "edit">("read");

  const handleEditPress = () => {
    setView("edit");
  };

  const handleSavePress = (char: Character) => {
    updateCharacter(char);
    setView("read");
  };

  const handleCancelPress = () => {
    setView("read");
  };

  if (isLoading) {
    return (
      <Container>
        <Label>LOADING!</Label>
      </Container>
    );
  }

  if (view === "edit") {
    return (
      <ImageBackground
        source={{
          uri: "https://cdn.midjourney.com/c8445847-3a97-499b-a083-a3c472b5ed00/0_2.webp",
        }}
        imageStyle={{
          opacity: 0.5,
        }}
      >
        <Container>
          <Margin bottom={4}>
            <CharacterForm
              onSavePress={handleSavePress}
              character={character!}
              onCancelPress={handleCancelPress}
            />
          </Margin>
        </Container>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.midjourney.com/2fcfee29-6fa0-4323-aa70-6c7783b4d274/0_3.webp",
      }}
      imageStyle={{
        opacity: 0.5,
      }}
    >
      <Container>
        <Margin top={1} bottom={4}>
          {character && character.imageUrl && character.imageUrl !== "" && (
            <Row>
              <CharacterImage
                source={{
                  uri: character?.imageUrl,
                }}
              />
            </Row>
          )}
          <Row>
            <Label>Name</Label>
            <Value>{character?.name}</Value>
          </Row>
          <Row>
            <Label>Race</Label>
            <Value>{character?.race}</Value>
          </Row>
          <Row>
            <Label>Class</Label>
            <Value>{character?.class}</Value>
          </Row>
          <Row>
            <Label>Total level</Label>
            <Value>{character?.totalLevel}</Value>
          </Row>
          <Row style={{ width: "100%" }}>
            <Label>Current roll: {currentRoll}</Label>
            <Value style={{ width: "100%" }}>
              <Slider
                style={{ width: 300, height: 40 }}
                value={currentRoll}
                step={1}
                minimumValue={1}
                maximumValue={26}
                minimumTrackTintColor={colors.buttonPrimary}
                thumbTintColor={colors.buttonPrimary}
                maximumTrackTintColor={lighten(0.5, colors.buttonPrimary)}
                onValueChange={(val) => setCurrentRoll(val)}
              />
            </Value>
          </Row>
          <Row>
            <Button onPress={handleEditPress} label="Edit" />
          </Row>
        </Margin>
      </Container>
    </ImageBackground>
  );
}
