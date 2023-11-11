import useSWR from 'swr';
import { getMoney, setMoney } from '../../helpers/localStorage';
import { Money, initialState } from '../../initialState';
import { useCallback, useEffect } from 'react';

const MONEY_KEY = 'MONEY';

export function useMoney() {
  const { data, isLoading, error, mutate } = useSWR<Money>(MONEY_KEY, getMoney);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      setMoney(initialState.money).then(() => {
        mutate();
      });
    }
  }, [data, isLoading, error, mutate]);

  const updateMoney = useCallback((money: Money) => {
    setMoney(money).then(() => {
      mutate();
    });
  }, [mutate]);

  return {
    money: data,
    isLoading,
    error,
    updateMoney,
  };
};
