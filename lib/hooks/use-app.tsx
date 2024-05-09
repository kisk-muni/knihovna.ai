"use client";

import classNames from "classnames";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type AppContextType = {
  htmlScrollAllowed: boolean;
  setHtmlScrollAllowed: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const result = useContext(AppContext);
  if (!result) {
    throw new Error();
  }
  return result;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [htmlScrollAllowed, setHtmlScrollAllowed] = useState(true);

  return (
    <AppContext.Provider
      value={{
        htmlScrollAllowed,
        setHtmlScrollAllowed,
      }}
    >
      <html
        lang="en"
        className={classNames({ "overflow-hidden": !htmlScrollAllowed })}
      >
        {children}
      </html>
    </AppContext.Provider>
  );
}
