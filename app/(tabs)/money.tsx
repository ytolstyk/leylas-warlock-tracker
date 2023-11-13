import { ImageBackground } from "react-native";
import { Margin } from "../../styles/common";
import { AddOrSubtractMoney } from "../../components/AddOrSubtractMoney";
import { useMoney } from "../hooks/useMoney";
import { Container, Label, Value } from "../../components/styles";

export default function MoneyScreen() {
  const { money, isLoading, updateMoney } = useMoney();

  function renderMoney() {
    if (!money) {
      return null;
    }

    return money.map((moneyType, index) => {
      const updateCurrentMoney = (amount: number) => {
        const newMoney = [...money];
        newMoney[index].amount = amount;
        updateMoney(money);
      };

      return (
        <Margin key={moneyType.label} bottom={2}>
          <Label>{moneyType.label}</Label>
          <Margin
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Value>{moneyType.amount}</Value>
            <AddOrSubtractMoney
              moneyType={moneyType}
              updateMoney={updateCurrentMoney}
            />
          </Margin>
        </Margin>
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
        uri: "https://cdn.midjourney.com/fe387a5c-1761-4f3e-882c-1788a6790ba8/0_2.webp",
      }}
      imageStyle={{
        opacity: 0.5,
      }}
    >
      <Container>
        <Margin bottom={4}>{renderMoney()}</Margin>
      </Container>
    </ImageBackground>
  );
}
