import { ImageBackground } from "react-native";
import { useMagic } from "../app/hooks/useMagic";
import { Label, MagicTitle, Row, Section } from "./styles";
import { MagicSlot } from "../app/initialState";
import { Button } from "../styles/buttons";
import { Margin } from "../styles/common";
import { SpellSlotComponent } from "./SpellSlotComponent";
import { Text, View } from "./Themed";

export function LongRestSpells() {
  const { magic, isLoading, updateMagic, onLongRest } = useMagic();

  const handleUpdateSpellSlot = (index: number) => (slot: MagicSlot) => {
    if (!magic) {
      return;
    }
    const { longRest } = magic;
    longRest[index] = slot;
    updateMagic({
      ...magic,
      longRest,
    });
  };

  function renderLongRestMagic() {
    return magic?.longRest.map((slot, index) => {
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
        <MagicTitle>Long Rest</MagicTitle>
      </Section>
      <ImageBackground
        source={{
          uri: "https://cdn.midjourney.com/b6ad0776-476e-4b65-bb99-93828796dbfb/0_0.webp",
        }}
        imageStyle={{
          opacity: 0.5,
        }}
      >
        {renderLongRestMagic()}
        <Button
          onLongPress={onLongRest}
          width="full-width"
          label="Take long rest"
        />
      </ImageBackground>
    </Margin>
  );
}
