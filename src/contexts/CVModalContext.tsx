import { createContext, useContext, useState, type ReactNode } from 'react';

interface CVModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CVModalContext = createContext<CVModalContextType | undefined>(undefined);

export function CVModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CVModalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CVModalContext.Provider>
  );
}

export function useCVModalContext() {
  const context = useContext(CVModalContext);
  if (!context) {
    throw new Error('useCVModalContext must be used within a CVModalProvider');
  }
  return context;
}
