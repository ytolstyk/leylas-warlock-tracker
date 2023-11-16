import { ImageBackground } from "react-native";
import { useMagic } from "../app/hooks/useMagic";
import { Label, MagicTitle, Row, Section } from "./styles";
import { MagicSlot } from "../app/initialState";
import { Button } from "../styles/buttons";
import { Margin } from "../styles/common";
import { SpellSlotComponent } from "./SpellSlotComponent";
import { Text, View } from "./Themed";

export function ShortRestSpells() {
  const { magic, isLoading, updateMagic, onShortRest } = useMagic();

  const handleUpdateSpellSlot = (index: number) => (slot: MagicSlot) => {
    if (!magic) {
      return;
    }

    const { shortRest } = magic;
    shortRest[index] = slot;

    updateMagic({
      ...magic,
      shortRest,
    });
  };

  function renderShortRestMagic() {
    return magic?.shortRest.map((slot, index) => {
      return (
        <Row key={slot.label}>
          <Label>{slot.label}</Label>
          <SpellSlotComponent
            slot={slot}
            slotIndex={index}
            updateSlot={handleUpdateSpellSlot(index)}
          />
        </Row>
      );
    });
  }

  if (!magic || isLoading) {
    return (
      <View>
        <Text>LOADING!</Text>
      </View>
    );
  }

  return (
    <Margin bottom={2}>
      <Section>
        <MagicTitle>Short Rest</MagicTitle>
      </Section>
      <ImageBackground
        source={{
          uri: "https://cdn.midjourney.com/e6eb329c-e3ef-437a-a6ce-0c719c62a13d/0_0.webp",
        }}
        imageStyle={{
          opacity: 0.8,
        }}
      >
        {renderShortRestMagic()}
        <Button
          onLongPress={onShortRest}
          width="full-width"
          label="Take short rest"
        />
      </ImageBackground>
    </Margin>
  );
}
