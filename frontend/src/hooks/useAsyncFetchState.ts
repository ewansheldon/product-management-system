import { useState } from "react";

export function useAsyncFetchState() {
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    waiting,
    setWaiting,
    error,
    setError
  };
}