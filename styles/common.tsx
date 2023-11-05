import styled from "styled-components/native";
import type * as CSS from "csstype";
import { base } from "./constants";

type MarginProps = {
  bottom?: number;
  top?: number;
  left?: number;
  right?: number;
  flexDirection?: CSS.Property.FlexDirection;
  alignItems?: CSS.Property.AlignItems;
  justifyContent?: CSS.Property.JustifyContent;
};

export const Margin = styled.View<MarginProps>`
  margin-top: ${({ top }) => (top ? top * base : 0)}px;
  margin-bottom: ${({ bottom }) => (bottom ? bottom * base : 0)}px;
  margin-right: ${({ right }) => (right ? right * base : 0)}px;
  margin-left: ${({ left }) => (left ? left * base : 0)}px;

  ${({ flexDirection }) =>
    flexDirection ? `flex-direction: ${flexDirection};` : ""}
  ${({ alignItems }) => (alignItems ? `align-items: ${alignItems};` : "")}
  ${({ justifyContent }) =>
    justifyContent ? `justify-content: ${justifyContent};` : ""}
`;
