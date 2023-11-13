import { MagicItem, MagicSlot } from "../app/initialState";
import {
  MagicMissile,
  SpellRow,
  SpellRowPressable,
} from "../app/(tabs)/styles";
import { spellSlots } from "../styles/colors";
import { Margin } from "../styles/common";
import { RocketAnimation } from "./RocketAnimation";
import { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";

type Props = {
  item: MagicItem;
  onUpdateItem: (item: MagicItem) => void;
};

export function WandOfMagicMissiles({ item, onUpdateItem }: Props) {
  const [showMissileIndex, setShowMissileIndex] = useState(-1);

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
    setShowMissileIndex(newAmount);
  };

  useEffect(() => {
    if (showMissileIndex === -1) {
      return;
    }

    const timer = setTimeout(() => {
      setShowMissileIndex(-1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showMissileIndex]);

  function renderSpellSlots(ability: MagicSlot, pressed?: boolean) {
    return Array(ability.total)
      .fill(0)
      .map((_, index) => {
        return (
          <Margin top={1} left={1} key={index}>
            <MagicMissile
              size={36}
              name="shark"
              colorIndex={index % spellSlots.length}
              isFilled={index < ability.amount}
              pressed={pressed}
            />
            <View style={{ position: "absolute", width: 60 }}>
              {showMissileIndex === index && (
                <RocketAnimation colorIndex={showMissileIndex} />
              )}
            </View>
          </Margin>
        );
      });
  }

  function renderAbilities() {
    return item.abilities.map((ability, abilityIndex) => {
      return (
        <View key={ability.label}>
          <SpellRow>
            <SpellRowPressable
              onPress={handleOnPress(abilityIndex)}
              onLongPress={handleLongPress(abilityIndex)}
              style={{ paddingBottom: 36, paddingTop: 24 }}
            >
              {({ pressed }) => renderSpellSlots(ability, pressed)}
            </SpellRowPressable>
          </SpellRow>
        </View>
      );
    });
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.midjourney.com/22022697-57b0-4046-80dc-1e4484c092eb/0_0.webp",
      }}
      imageStyle={{
        opacity: 0.5,
      }}
    >
      {renderAbilities()}
    </ImageBackground>
  );
}
