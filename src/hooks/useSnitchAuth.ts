import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export type SnitchUser = {
  id: string;
  codename: string;
};

export default function useSnitchAuth() {
  const [user, setUser] = useState<SnitchUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const bootstrap = async () => {
      try {
        let id = await SecureStore.getItemAsync('snitch_user_id');
        if (!id) {
          id = `snitch_${Math.random().toString(36).slice(2, 10)}`;
          await SecureStore.setItemAsync('snitch_user_id', id);
        }

        if (!cancelled) {
          const codename = `Agent ${id.slice(-4).toUpperCase()}`;
          setUser({ id, codename });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading };
}
