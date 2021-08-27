import {createContext} from "react";

export type ScreenStateType = 'show' | 'closing' | 'handleClosing';
export interface StackScreenObject {
    name: string, showState: ScreenStateType, translateState: any
}

interface MobileNavigationContextModel {
    activeStack: string | undefined
    stackMap: {[key: string]: {history: StackScreenObject[]}};
    platform: 'android' | 'ios';
    params: any;
    prelastScreenState: {[key: string]: any};

    setActiveStack: (stackName: string) => void;
    push: (stackName: string, name: string, params?: any) => void;
    back: (stackName: string, handleClosing?: boolean) => void;
    addStack: (name: string) => void;
    setPrelastScreenState: (state: {[key: string]: any}) => void;
}

export const MobileNavigationContext = createContext<MobileNavigationContextModel>({
    activeStack: undefined,
    stackMap: {},
    platform: 'ios',
    params: undefined,
    prelastScreenState: {},
    
    setActiveStack: () => {},
    push: () => {},
    back: () => {},
    addStack: () => {},
    setPrelastScreenState: () => {},
})