import { useState } from "react";
import { Text } from "../../../components/Themed";
import { Button } from "../../../styles/buttons";
import { Margin } from "../../../styles/common";
import { StyledInput } from "../../../styles/inputs";

type Props = {
  moneyType: {
    label: string;
    amount: number;
  };
  updateMoney: (amount: number) => void;
};

export function AddOrSubtractMoney({ moneyType, updateMoney }: Props) {
  const [moneyNum, setMoneyNum] = useState("0");

  const handleAddPress = () => {
    updateMoney(Number(moneyType.amount) + Number(moneyNum));
    setMoneyNum("0");
  };

  const handleSubtractPress = () => {
    const newAmount = Number(moneyType.amount) - Number(moneyNum);

    if (newAmount <= 0) {
      return updateMoney(0);
    }

    updateMoney(newAmount);
    setMoneyNum("0");
  };

  return (
    <Margin flexDirection="row">
      <Button onPress={handleSubtractPress} label="Subtract" />
      <StyledInput
        value={moneyNum}
        keyboardType="numeric"
        borderRadius={0}
        onChangeText={setMoneyNum}
      />
      <Button onPress={handleAddPress} label="Add" />
    </Margin>
  );
}
