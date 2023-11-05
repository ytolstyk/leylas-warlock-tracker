import { MagicItem, MagicSlot, Rest } from "../initialState";

function resetSlotOnRest(slot: MagicSlot) {
  return {
    ...slot,
    amount: slot.total,
  };
}

export function resetSlotsOnRest(slots: MagicSlot[]) {
  return slots.map(resetSlotOnRest);
}

function resetItemOnRest(item: MagicItem) {
  return {
    ...item,
    abilities: resetSlotsOnRest(item.abilities),
  };
}

export function resetItemsOnRest(items: MagicItem[], restType: Rest) {
  return items.map(item => {
    if (item.resetOn === restType) {
      return resetItemOnRest(item);
    }

    return item;
  });
}
