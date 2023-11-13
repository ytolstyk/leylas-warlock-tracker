import { useMagic } from "../app/hooks/useMagic";
import { Label, MagicTitle, Row, Section } from "../app/(tabs)/styles";
import { MagicItem } from "../app/initialState";
import { MagicTalisman } from "./MagicTalisman";
import { Text, View } from "./Themed";
import { WandOfMagicMissiles } from "./WandOfMagicMissiles";

export function ItemSpells() {
  const { magic, isLoading, updateMagic } = useMagic();

  const handleUpdateItem = (index: number) => (item: MagicItem) => {
    if (!magic) {
      return;
    }
    const { items } = magic;
    items[index] = item;
    updateMagic({
      ...magic,
      items,
    });
  };

  function renderItem(item: MagicItem, index: number) {
    switch (item.label) {
      case "Talisman":
        return (
          <MagicTalisman item={item} onUpdateItem={handleUpdateItem(index)} />
        );

      case "Wand of magic missiles":
        return (
          <WandOfMagicMissiles
            item={item}
            onUpdateItem={handleUpdateItem(index)}
          />
        );

      default:
        return null;
    }
  }

  function renderMagicItems() {
    return magic?.items.map((item, index) => {
      return (
        <Row key={item.label}>
          <Label>{item.label}</Label>
          {renderItem(item, index)}
        </Row>
      );
    });
  }

  if (!magic || isLoading) {
    return (
      <View>
        <Text>LOADING!</Text>
      </View>
    );
  }

  return (
    <View>
      <Section>
        <MagicTitle>Magic Items</MagicTitle>
      </Section>
      {renderMagicItems()}
    </View>
  );
}
