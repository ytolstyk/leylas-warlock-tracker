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
        uri: "https://cdn.midjourney.com/ea8e7b3f-d094-4ddd-b0a6-b2afe8191afc/0_3.webp",
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
