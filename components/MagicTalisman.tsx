import { MagicItem, MagicSlot } from "../app/initialState";
import { SpellRow, SpellRowPressable, SpellSlot } from "./styles";
import { spellSlots } from "../styles/colors";
import { Text } from "./Themed";
import { View, ImageBackground } from "react-native";

type Props = {
  item: MagicItem;
  onUpdateItem: (item: MagicItem) => void;
};

export function MagicTalisman({ item, onUpdateItem }: Props) {
  const handleLongPress = (abilityIndex: number) => () => {
    const ability = item.abilities[abilityIndex];
    let newAmount = ability.amount + 1;

    if (ability.amount + 1 >= ability.total) {
      newAmount = ability.total;
    }

    const { abilities } = item;
    abilities[abilityIndex].amount = newAmount;

    onUpdateItem({
      ...item,
      abilities,
    });
  };

  const handleOnPress = (abilityIndex: number) => () => {
    const ability = item.abilities[abilityIndex];
    let newAmount = ability.amount - 1;

    if (newAmount <= 0) {
      newAmount = 0;
    }

    const { abilities } = item;
    abilities[abilityIndex].amount = newAmount;

    onUpdateItem({
      ...item,
      abilities,
    });
  };

  function renderSpellSlots(
    ability: MagicSlot,
    abilityIndex: number,
    pressed?: boolean
  ) {
    return Array(ability.total)
      .fill(0)
      .map((_, index) => {
        return (
          <SpellSlot
            key={index}
            colorIndex={abilityIndex % spellSlots.length}
            isFilled={index < ability.amount}
            percent={Number((index / (2 * ability.total)).toFixed(2))}
            pressed={pressed}
          />
        );
      });
  }

  function renderAbilities() {
    return item.abilities.map((ability, abilityIndex) => {
      return (
        <View key={ability.label}>
          <Text>{ability.label}</Text>
          <SpellRow>
            <SpellRowPressable
              onPress={handleOnPress(abilityIndex)}
              onLongPress={handleLongPress(abilityIndex)}
            >
              {({ pressed }) =>
                renderSpellSlots(ability, abilityIndex, pressed)
              }
            </SpellRowPressable>
          </SpellRow>
        </View>
      );
    });
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.midjourney.com/910f1abe-f01b-435a-9045-bdc9e288b71a/0_0.webp",
      }}
      imageStyle={{
        opacity: 0.5,
      }}
    >
      {renderAbilities()}
    </ImageBackground>
  );
}
