import { useState } from "react";

export type Notice = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

let noticesState: Notice[] = [];
let listeners: Function[] = [];

export function useNotices() {
  const [notices, setNotices] = useState(noticesState);

  const addNotice = (notice: Notice) => {
    noticesState = [notice, ...noticesState];
    listeners.forEach((l) => l(noticesState));
  };

  const subscribe = (listener: Function) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  // sync state
  useState(() => {
    const unsub = subscribe(setNotices);
    return unsub;
  });

  return { notices, addNotice };
}