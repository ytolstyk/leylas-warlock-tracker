import { Container } from "./styles";
import { ShortRestSpells } from "../../components/ShortRestSpells";
import { LongRestSpells } from "../../components/LongRestSpells";
import { ItemSpells } from "../../components/ItemSpells";
import { Margin } from "../../styles/common";

export default function MagicScreen() {
  return (
    <Container>
      <Margin bottom={4}>
        <ShortRestSpells />
        <LongRestSpells />
        <ItemSpells />
      </Margin>
    </Container>
  );
}
