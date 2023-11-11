import useSWR from "swr";
import { Healing, initialState } from "../../initialState";
import { getHealing, setHealing } from "../../helpers/localStorage";
import { useCallback, useEffect } from "react";

const HEALING_KEY = 'HEALING';

export function useHealing() {
  const { data, isLoading, error, mutate } = useSWR<Healing>(HEALING_KEY, getHealing);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      setHealing(initialState.healing).then(() => {
        mutate();
      });
    }
  }, [data, isLoading, error, mutate]);

  const updateHealing = useCallback((heal: Healing) => {
    setHealing(heal).then(() => {
      mutate();
    });
  }, [mutate]);

  return {
    healing: data,
    isLoading,
    error,
    updateHealing,
  }
}