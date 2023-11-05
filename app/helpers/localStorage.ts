import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character, Healing, Magic, Money } from '../initialState';

const storageKeys = {
  char: 'CHARACTER',
  magic: 'MAGIC',
  money: 'MONEY',
  healing: 'HEALING',
};

function handleError(e: unknown) {
  console.warn(e);
}

const localStorageHelper = {
  async set(key: string, state: unknown) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      handleError(e);
    }
  },

  async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key)

      return value ? await JSON.parse(value) : null;
    } catch(e) {
      handleError(e);
    }
  },

  async delete(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch(e) {
      handleError(e);
    }
  },
};

export function setCharacter(char: Character) {
  return localStorageHelper.set(storageKeys.char, char);
}

export function getCharacter() {
  return localStorageHelper.get(storageKeys.char);
}

export function setHealing(healing: Healing) {
  return localStorageHelper.set(storageKeys.healing, healing);
}

export function getHealing() {
  return localStorageHelper.get(storageKeys.healing);
}

export function setMoney(money: Money) {
  return localStorageHelper.set(storageKeys.money, money);
}

export function getMoney() {
  return localStorageHelper.get(storageKeys.money);
}

export function setMagic(magic: Magic) {
  return localStorageHelper.set(storageKeys.magic, magic);
}

export function getMagic() {
  return localStorageHelper.get(storageKeys.magic);
}

export function resetAllKeys() {
  Object.values(storageKeys).forEach(key => {
    localStorageHelper.delete(key);
  });
}
