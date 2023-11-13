import useSWR from 'swr';
import { getCharacter, setCharacter } from '../helpers/localStorage';
import { Character, initialState } from '../initialState';
import { useCallback, useEffect } from 'react';

const CHARACTER_KEY = 'CHARACTER';

export function useCharacter() {
  const { data, isLoading, error, mutate } = useSWR<Character>(CHARACTER_KEY, getCharacter);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      setCharacter(initialState.character).then(() => {
        mutate();
      });
    }
  }, [data, error, isLoading, mutate]);

  const updateCharacter = useCallback((char: Character) => {
    setCharacter(char).then(() => {
      mutate();
    });
  }, [mutate]);

  return {
    character: data,
    isLoading,
    error,
    updateCharacter,
  };
};
