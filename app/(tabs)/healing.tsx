import { ImageBackground, Pressable } from "react-native";
import { Text } from "../../components/Themed";
import { Button } from "../../styles/buttons";
import { Potion } from "../initialState";
import { useHealing } from "../hooks/useHealing";
import {
  Container,
  Label,
  PotionIcon,
  PotionRow,
  Row,
} from "../../components/styles";
import { Margin } from "../../styles/common";
import { useEffect, useState } from "react";
import { rollDiceWithModifier } from "../helpers/diceRolls";
import { colors } from "../../styles/colors";
import { HealingAmountAnimation } from "../../components/HealingAmountAnimation";

export default function HealingScreen() {
  const { healing, isLoading, updateHealing } = useHealing();
  const [currentHeal, setCurrentHeal] = useState({
    index: 0,
    healAmount: "",
  });

  const handleAddPotionPress = (atIndex: number) => () => {
    if (!healing) {
      return;
    }

    const newState = { ...healing };
    const { amount } = healing?.potions[atIndex];
    newState.potions[atIndex].amount = String(Number(amount) + 1);

    updateHealing(newState);
    setCurrentHeal({
      index: 0,
      healAmount: "",
    });
  };

  const handleRemovePotionPress = (atIndex: number) => () => {
    if (!healing) {
      return;
    }

    const newState = { ...healing };
    const { amount, diceType, numOfDice, plusModifier } =
      healing?.potions[atIndex];

    if (amount === "0") {
      return;
    }

    newState.potions[atIndex].amount = String(Number(amount) - 1);

    updateHealing(newState);
    setCurrentHeal({
      index: atIndex,
      healAmount: `+ ${rollDiceWithModifier(
        diceType,
        numOfDice,
        plusModifier
      )}`,
    });
  };

  useEffect(() => {
    if (currentHeal.healAmount === "") {
      return;
    }

    const timer = setTimeout(() => {
      setCurrentHeal({
        index: 0,
        healAmount: "",
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentHeal]);

  function renderPotionNumber(potion: Potion, iconSize: number) {
    if (potion.amount === "0") {
      return (
        <PotionIcon
          size={iconSize}
          name="bottle-tonic-plus-outline"
          color={colors.emptyPotion}
        />
      );
    }

    return Array(Number(potion.amount))
      .fill("")
      .map((_, index) => {
        return (
          <PotionIcon
            size={iconSize}
            name="bottle-tonic-plus"
            color={colors.healingPotion}
            key={index}
            percent={Number((index / (4 * Number(potion.amount))).toFixed(2))}
          />
        );
      });
  }

  function renderHealing() {
    return healing?.potions.map((potion, index) => {
      const iconSize = 36 * Math.log(index + 2);
      const animateDirection = index === 0 ? "down" : "up";

      return (
        <Row key={potion.description}>
          <Margin flexDirection="row" alignItems="center">
            <Label>{potion.name}</Label>
            <Margin left={1}>
              <Text>({potion.description})</Text>
            </Margin>
          </Margin>
          <PotionRow>
            {renderPotionNumber(potion, iconSize)}
            <Pressable onPress={handleAddPotionPress(index)}>
              <PotionIcon color="#30db5e" size={36} name="plus" />
            </Pressable>
          </PotionRow>
          <PotionRow>
            <Button
              onLongPress={handleRemovePotionPress(index)}
              label="Drink"
            />
            {index === currentHeal.index && currentHeal.healAmount !== "" && (
              <Margin left={3}>
                <HealingAmountAnimation
                  label={currentHeal.healAmount}
                  direction={animateDirection}
                />
              </Margin>
            )}
          </PotionRow>
        </Row>
      );
    });
  }

  if (isLoading) {
    return (
      <Container>
        <Label>LOADING!</Label>
      </Container>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://cdn.midjourney.com/28ccd177-76f7-40c7-8d22-0453676a0d11/0_2.webp",
      }}
      imageStyle={{
        opacity: 0.5,
      }}
    >
      <Container>
        <Margin bottom={4}>{renderHealing()}</Margin>
      </Container>
    </ImageBackground>
  );
}
