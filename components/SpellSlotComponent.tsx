import { View } from "react-native";
import { SpellRow, SpellRowPressable, SpellSlot } from "./styles";
import { MagicSlot } from "../app/initialState";
import { spellSlots } from "../styles/colors";

type Props = {
  slot: MagicSlot;
  slotIndex: number;
  updateSlot: (slot: MagicSlot) => void;
};

export function SpellSlotComponent({ slot, slotIndex, updateSlot }: Props) {
  const handleLongPress = () => {
    let newAmount = slot.amount + 1;

    if (slot.amount + 1 >= slot.total) {
      newAmount = slot.total;
    }

    updateSlot({
      ...slot,
      amount: newAmount,
    });
  };

  const handleOnPress = () => {
    let newAmount = slot.amount - 1;

    if (newAmount <= 0) {
      newAmount = 0;
    }

    updateSlot({
      ...slot,
      amount: newAmount,
    });
  };

  function renderSpellSlots(pressed: boolean) {
    return Array(slot.total)
      .fill(0)
      .map((_, index) => {
        return (
          <SpellSlot
            key={index}
            colorIndex={slotIndex % spellSlots.length}
            isFilled={index < slot.amount}
            percent={Number((index / (2 * slot.total)).toFixed(2))}
            pressed={pressed}
          />
        );
      });
  }

  return (
    <SpellRow>
      <SpellRowPressable onPress={handleOnPress} onLongPress={handleLongPress}>
        {({ pressed }) => renderSpellSlots(pressed)}
      </SpellRowPressable>
    </SpellRow>
  );
}
