import useSWR from 'swr';
import { getMagic, setMagic } from '../../helpers/localStorage';
import { Magic, initialState } from '../../initialState';
import { useCallback, useEffect } from 'react';
import { resetItemsOnRest, resetSlotsOnRest } from '../../helpers/resetOnRest';

const MAGIC_KEY = 'MAGIC';

export function useMagic() {
  const { data, isLoading, error, mutate } = useSWR<Magic>(MAGIC_KEY, getMagic);

  useEffect(() => {
    if (!data && !isLoading && !error) {
      setMagic(initialState.magic).then(() => {
        mutate();
      });
    }
  }, [data, isLoading, error, mutate]);

  const updateMagic = useCallback((magic: Magic) => {
    setMagic(magic).then(() => {
      mutate();
    });
  }, [mutate]);

  const onLongRest = useCallback(() => {
    if (!data) {
      return;
    }

    const { shortRest, longRest, items } = data;

    updateMagic({
      ...data,
      shortRest: resetSlotsOnRest(shortRest),
      longRest: resetSlotsOnRest(longRest),
      items: resetItemsOnRest(items, 'long rest'),
    });
  }, [data, mutate, updateMagic]);

  const onShortRest = useCallback(() => {
    if (!data) {
      return;
    }

    const { shortRest, items } = data;

    updateMagic({
      ...data,
      shortRest: resetSlotsOnRest(shortRest),
      items: resetItemsOnRest(items, 'short rest'),
    });
  }, [data, mutate, updateMagic]);

  return {
    magic: data,
    isLoading,
    error,
    updateMagic,
    onLongRest,
    onShortRest,
  };
};
