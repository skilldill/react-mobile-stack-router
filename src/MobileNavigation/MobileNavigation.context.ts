import {createContext} from "react";

export type ScreenStateType = 'show' | 'closing' | 'handleClosing';

interface MobileNavigationContextModel {
    activeStack: string | undefined
    stackMap: {[key: string]: {history: {name: string, state: ScreenStateType}[]}};
    platform: 'android' | 'ios';
    params: any;

    setActiveStack: (stackName: string) => void;
    push: (stackName: string, name: string, params?: any) => void;
    back: (stackName: string, handleClosing?: boolean) => void;
    addStack: (name: string) => void;
}

export const MobileNavigationContext = createContext<MobileNavigationContextModel>({
    activeStack: undefined,
    stackMap: {},
    platform: 'ios',
    params: undefined,

    setActiveStack: () => {},
    push: () => {},
    back: () => {},
    addStack: () => {},
})