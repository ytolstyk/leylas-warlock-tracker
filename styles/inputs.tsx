import styled from "styled-components/native";
import { TextInput } from "../components/Themed";
import { base } from "./constants";

type InputProps = {
  borderRadius?: number;
  width?: number;
};

export const StyledInput = styled(TextInput)<InputProps>`
  background-color: #888888;
  padding: 6px;
  font-size: 18px;
  border-radius: ${({ borderRadius }) =>
    borderRadius !== undefined ? `${borderRadius}px` : "4px"};

  ${({ width }) => {
    if (width) {
      return `width: ${width * base}px`;
    }
  }}
`;
