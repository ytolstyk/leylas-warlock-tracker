import styled from "styled-components/native";
import { Text } from "./Themed";
import { colors, spellSlots } from "../styles/colors";
import { lighten } from "polished";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const spellSlotDim = "48px";

export const Container = styled.ScrollView`
  padding: 12px;
`;

export const Label = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

export const Value = styled(Text)`
  font-size: 18px;
`;

export const Row = styled.View`
  margin-bottom: 12px;
`;

export const CharacterImage = styled.Image`
  align-self: center;
  height: 300px;
  width: 300px;
  border-radius: 500px;
`;

export const PotionRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const PotionIcon = styled(MaterialCommunityIcons)<{ percent?: number }>`
  margin-right: 12px;
  color: ${({ color, percent = 0 }) =>
    color && percent ? lighten(percent, String(color)) : String(color)};
`;

export const SpellRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SpellRowPressable = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

type SpellSlotProps = {
  isFilled: boolean;
  percent?: number;
  colorIndex?: number;
  pressed?: boolean;
};

export const SpellSlot = styled.View<SpellSlotProps>`
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
  width: ${spellSlotDim};
  height: ${spellSlotDim};
  background-color: ${({ isFilled, percent = 0, colorIndex = 0 }) =>
    isFilled ? lighten(percent, spellSlots[colorIndex]) : "transparent"};
  margin: 12px;
  border-radius: ${spellSlotDim};
  display: inline-block;
  border: 2px solid #fff;
`;

export const Section = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #9d9d9d;
  padding-bottom: 12px;
  margin: 0 24px 24px;
`;

export const MagicTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
`;

type MagicMissileProps = {
  colorIndex?: number;
  isFilled?: boolean;
  pressed?: boolean;
};

export const MagicMissile = styled(MaterialCommunityIcons)<MagicMissileProps>`
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
  transform: rotate(-90deg);
  ${({ colorIndex, isFilled }) => {
    if (!isFilled) {
      return `
        color: ${colors.emptyMissile};
      `;
    }

    if (colorIndex !== undefined) {
      return `color: ${spellSlots[colorIndex & spellSlots.length]};`;
    }
  }}
`;
