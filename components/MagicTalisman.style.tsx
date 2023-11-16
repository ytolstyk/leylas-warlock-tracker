import styled from "styled-components/native";
import { talismanColors } from "../styles/colors";
import { lighten } from "polished";

const talismanDim = 36;
const transformDim = talismanDim / 2;

export const TalismanWrapper = styled.View`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

type SpellPositionProps = {
  x: number;
  y: number;
  rotate?: number;
};

export const SpellPosition = styled.View<SpellPositionProps>`
  position: absolute;
  transform: translateX(-${transformDim}px) translateY(-${transformDim}px);
  top: ${({ y }) => y}%;
  left: ${({ x }) => x}%;
`;

type TalismanSpell = {
  isFilled: boolean;
  percent?: number;
  colorIndex?: number;
  pressed?: boolean;
};

export const TalismanSpell = styled.View<TalismanSpell>`
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
  width: ${talismanDim}px;
  height: ${talismanDim}px;
  background-color: ${({ isFilled, percent = 0, colorIndex = 0 }) =>
    isFilled
      ? lighten(percent, talismanColors[colorIndex % talismanColors.length])
      : "transparent"};
  border-radius: ${talismanDim}px;
  display: inline-block;
  border: 2px solid #fff;
`;

export const TalismanTitle = styled.View<SpellPositionProps>`
  position: absolute;
  transform: rotate(${({ rotate }) => rotate}deg) translateX(-48px)
    translateY(-12px);
  top: ${({ y }) => y}%;
  left: ${({ x }) => x}%;
`;

export const TalismanTitleText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);
`;
