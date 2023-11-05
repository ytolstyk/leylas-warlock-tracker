import styled from "styled-components/native";
import { colors } from "./colors";
import { darken, lighten } from "polished";
import { PressableProps } from "react-native";

type StyledPressableProps = {
  width?: "narrow" | "default" | "wide" | "full-width";
};

const StyledPressable = styled.Pressable<StyledPressableProps>`
  align-self: flex-start;

  ${({ width }) => {
    if (width === "full-width") {
      return `
        align-self: stretch;
        align-items: center;
      `;
    }
  }}
`;

type ButtonWithPressedProps = StyledPressableProps & {
  pressed: boolean;
  onLongPress?: unknown;
};

const ButtonBackground = styled.View<ButtonWithPressedProps>`
  background-color: ${({ pressed, onLongPress }) => {
    if (pressed && onLongPress) {
      return darken(0.2, colors.buttonPrimary);
    }

    return pressed ? lighten(0.2, colors.buttonPrimary) : colors.buttonPrimary;
  }};
  padding: 12px 24px;
  align-self: flex-start;

  ${({ width }) => {
    if (width === "full-width") {
      return `
        align-self: stretch;
        align-items: center;
      `;
    }
  }}
`;

const ButtonText = styled.Text<ButtonWithPressedProps>`
  color: white;
`;

type ButtonProps = StyledPressableProps &
  PressableProps & {
    label?: string;
  };

export function Button({
  label,
  width,
  onLongPress,
  ...restProps
}: ButtonProps) {
  return (
    <StyledPressable onLongPress={onLongPress} {...restProps} width={width}>
      {({ pressed }) => (
        <ButtonBackground
          pressed={pressed}
          width={width}
          onLongPress={onLongPress}
        >
          <ButtonText pressed={pressed}>{label}</ButtonText>
        </ButtonBackground>
      )}
    </StyledPressable>
  );
}
