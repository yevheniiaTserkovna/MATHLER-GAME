import { createContext, useContext, useState } from 'react';

const PopapContext = createContext();

export const usePopap = () => {
  const context = useContext(PopapContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a PopapContext');
  }
  return context;
};

export const PopapProvider = ({ children }) => {
  const [popap, setPopap] = useState({ isVisible: false });

  const show = (title, text) => setPopap({ isVisible: true, title, text });
  const hide = () => setPopap({ isVisible: false });

  return (
    <PopapContext.Provider
      value={{
        isVisible: popap.isVisible,
        title: popap.title,
        text: popap.text,
        show,
        hide,
      }}
    >
      {children}
    </PopapContext.Provider>
  );
};
