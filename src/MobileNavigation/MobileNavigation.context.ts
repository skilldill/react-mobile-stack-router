import { createContext } from 'react';

interface MobileNavigationContextModel {
  activeStack: string | undefined;
  stackMap: {
    [key: string]: { history: { name: string; state: 'show' | 'closing' }[] };
  };
  platform: 'android' | 'ios';
  params: any;

  setActiveStack: (stackName: string) => void;
  push: (stackName: string, name: string, params?: any) => void;
  back: (stackName: string) => void;
  addStack: (name: string) => void;
}

export const MobileNavigationContext =
  createContext<MobileNavigationContextModel>({
    activeStack: undefined,
    stackMap: {},
    platform: 'ios',
    params: undefined,

    setActiveStack: () => {},
    push: () => {},
    back: () => {},
    addStack: () => {},
  });
