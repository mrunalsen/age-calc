import { createContext, useContext } from 'react';

interface HeaderVisibilityContextValue {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
}

export const HeaderVisibilityContext = createContext<HeaderVisibilityContextValue>({
  hidden: false,
  setHidden: () => {},
});

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext);
