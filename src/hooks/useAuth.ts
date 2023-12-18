import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { authFB } from "~/utils/firebase";

export default function useAuth() {
  const [state, setState] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFB, (user) => {
      setState(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
