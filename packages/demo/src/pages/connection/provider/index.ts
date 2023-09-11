import { createContext, useContext } from "react";
import { ConnectManager } from "../manager/connect-manager";

export const ConnectManagerContext = createContext<{
  manager: ConnectManager | null;
}>({
  manager: null,
});

export const useConnectManager = () => {
  const { manager } = useContext(ConnectManagerContext);
  return manager;
};
