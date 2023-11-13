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

export default function CharacterScreen() {
  const { character, isLoading, updateCharacter } = useCharacter();
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
          uri: "https://cdn.midjourney.com/1689ee3a-402b-475d-8a84-3466f8936ec4/0_0.webp",
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
        uri: "https://cdn.midjourney.com/91b9c7b3-6562-42af-8042-83d432f13504/0_2.webp",
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
            <Label>Total Level</Label>
            <Value>{character?.totalLevel}</Value>
          </Row>
          <Row>
            <Button onPress={handleEditPress} label="Edit" />
          </Row>
        </Margin>
      </Container>
    </ImageBackground>
  );
}
