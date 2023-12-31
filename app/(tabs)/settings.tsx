import { Container, Label, Row, Value } from "../../components/styles";
import { Margin } from "../../styles/common";
import { Button } from "../../styles/buttons";
import { resetAllKeys } from "../helpers/localStorage";
import * as Application from "expo-application";

export default function SettingsScreen() {
  const handleResetPress = () => {
    resetAllKeys();
  };

  return (
    <Container>
      <Margin bottom={4}>
        <Row>
          <Label>App version</Label>
          <Value>{Application.nativeBuildVersion}</Value>
        </Row>
        <Row>
          <Label>Reset all data (long press)</Label>
          <Button onLongPress={handleResetPress} label="Reset" />
        </Row>
      </Margin>
    </Container>
  );
}
