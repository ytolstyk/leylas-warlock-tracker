export type Character = {
  name: string;
  race: string;
  class: string;
  totalLevel: string;
  isMulticlass?: boolean;
  description?: string;
  imageUrl?: string;
};

export type MagicSlot = {
  label: string;
  amount: number;
  total: number;
};

export type Rest = 'long rest' | 'short rest' | 'custom';

export type MagicItem = {
  label: string;
  resetOn: Rest;
  abilities: MagicSlot[];
};

export type Magic = {
  shortRest: MagicSlot[];
  longRest: MagicSlot[];
  items: MagicItem[];
};

export type Money =
  {
    label: string;
    amount: number
  }[];

export type Potion = {
  name: string;
  amount: string;
  description: string;
  diceType: number;
  numOfDice: number;
  plusModifier: number;
};

export type Healing = {
  potions: Potion[];
}

export type State = {
  character: Character;
  magic: Magic;
  money: Money;
  healing: Healing;
};

export const initialState: State = {
  character: {
    name: "Kellen Stumbleduck",
    race: "Gnome",
    class: "Warlock",
    totalLevel: '15',
    isMulticlass: false,
    description: "What a wonderful person this is",
    imageUrl: "https://saltmarsh-files.s3.us-west-1.amazonaws.com/images/characters/kellen_hat.jpeg",
  },
  magic: {
    shortRest: [
      {
        label: 'Spell slots',
        amount: 3,
        total: 3,
      },
      {
        label: 'Fade away',
        amount: 1,
        total: 1,
      },
      {
        label: 'Inspiring leader',
        amount: 1,
        total: 1,
      },
    ],
    longRest: [
      {
        label: 'Level 6',
        amount: 1,
        total: 1,
      },
      {
        label: 'Level 7',
        amount: 1,
        total: 1,
      },
      {
        label: 'Level 8',
        amount: 1,
        total: 1,
      },
      {
        label: 'Polymorph invocation',
        amount: 1,
        total: 1,
      },
      {
        label: 'Sorcery points',
        amount: 2,
        total: 2,
      },
      {
        label: 'Living artifice',
        amount: 1,
        total: 1,
      },
      {
        label: 'Summon construct',
        amount: 1,
        total: 1,
      },
    ],
    items: [
      {
        label: 'Talisman',
        resetOn: 'long rest',
        abilities: [
          {
            label: 'Ability check',
            amount: 5,
            total: 5,
          },
          {
            label: 'Saving throw',
            amount: 5,
            total: 5,
          },
          {
            label: 'Teleport',
            amount: 5,
            total: 5,
          },
        ],
      },
      {
        label: 'Wand of magic missiles',
        resetOn: 'custom',
        abilities: [
          {
            label: 'Magic missile',
            amount: 7,
            total: 7,
          },
        ],
      },
    ],
  },
  money: [
    { label: 'Platinum', amount: 0 },
    { label: 'Gold', amount: 0 },
    { label: 'Electrum', amount: 0 },
    { label: 'Silver', amount: 0 },
    { label: 'Copper', amount: 0 },
  ],
  healing: {
    potions: [
      {
        name: "Healing potion",
        amount: '0',
        description: "2d4 + 2",
        diceType: 4,
        numOfDice: 2,
        plusModifier: 2,
      },
      {
        name: "Greater healing potion",
        amount: '0',
        description: "4d4 + 4",
        diceType: 4,
        numOfDice: 4,
        plusModifier: 4,
      },
      {
        name: "Superior healing potion",
        amount: '0',
        description: "8d4 + 8",
        diceType: 4,
        numOfDice: 8,
        plusModifier: 8,
      },
      {
        name: "Supreme healing potion",
        amount: '0',
        description: "10d4 + 20",
        diceType: 4,
        numOfDice: 10,
        plusModifier: 20,
      },
    ],
  },
};
