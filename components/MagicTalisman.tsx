import { MagicItem, MagicSlot } from "../app/initialState";
import { SpellRowPressable, SpellSlot } from "./styles";
import { spellSlots } from "../styles/colors";
import { Text } from "./Themed";
import { View, ImageBackground } from "react-native";
import {
  SpellPosition,
  TalismanSpell,
  TalismanTitle,
  TalismanTitleText,
  TalismanWrapper,
} from "./MagicTalisman.style";
import { useMemo } from "react";

type Props = {
  item: MagicItem;
  onUpdateItem: (item: MagicItem) => void;
};

const displacement = -1;

export function MagicTalisman({ item, onUpdateItem }: Props) {
  const slice = useMemo(() => {
    const denominator = item.abilities.reduce(
      (acc, spells) => acc + spells.total,
      0
    );

    return (2 * Math.PI) / denominator;
  }, [item]);

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

  function renderSpellSlots(ability: MagicSlot, abilityIndex: number) {
    return Array(ability.total)
      .fill(0)
      .map((_, index) => {
        const nextNum = abilityIndex * ability.total + index + displacement;
        const currentSlice = nextNum * slice;
        const xPosition = Math.cos(currentSlice) * 34 + 50;
        const yPosition = Math.sin(currentSlice) * 34 + 50;

        return (
          <SpellPosition key={index} x={xPosition} y={yPosition}>
            <SpellRowPressable
              onPress={handleOnPress(abilityIndex)}
              onLongPress={handleLongPress(abilityIndex)}
            >
              {({ pressed }) => (
                <TalismanSpell
                  colorIndex={abilityIndex}
                  isFilled={index < ability.amount}
                  percent={Number((index / (3 * ability.total)).toFixed(2))}
                  pressed={pressed}
                />
              )}
            </SpellRowPressable>
          </SpellPosition>
        );
      });
  }

  function renderAbilities() {
    return item.abilities.map((ability, abilityIndex) => {
      return renderSpellSlots(ability, abilityIndex);
    });
  }

  function renderTitles() {
    return item.abilities.map((ability, index) => {
      const currentSlice = slice * index * ability.total + 1 / 2;
      const xPosition = Math.cos(currentSlice) * 23 + 50;
      const yPosition = Math.sin(currentSlice) * 23 + 50;
      const rotationAngle = (currentSlice / (2 * Math.PI)) * 360 + 90;

      return (
        <TalismanTitle
          key={index}
          x={xPosition}
          y={yPosition}
          rotate={rotationAngle}
        >
          <TalismanTitleText>{ability.label}</TalismanTitleText>
        </TalismanTitle>
      );
    });
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.midjourney.com/21e27d2c-8375-4e6a-87a1-62da1054bc59/0_3.webp",
      }}
      imageStyle={{
        opacity: 1,
      }}
    >
      <TalismanWrapper>
        {renderAbilities()}
        {renderTitles()}
      </TalismanWrapper>
    </ImageBackground>
  );
}
