import {createContext} from "react";

export type ClosingType = 'default' | 'handleClose';

export interface ScreenObject {
    name: string; 
    closingType: ClosingType | null;
}

interface MobileNavigationContextModel {
    activeStack: string | undefined
    stackMap: {[key: string]: {history: ScreenObject[]}};
    platform: 'android' | 'ios';
    params: any;
    translateX: number;

    setActiveStack: (stackName: string) => void;
    push: (stackName: string, name: string, params?: any) => void;
    back: (stackName: string, isHandleClose?: boolean) => void;
    addStack: (name: string) => void;
    setTranslateX: (x: number) => void;
}

export const MobileNavigationContext = createContext<MobileNavigationContextModel>({
    activeStack: undefined,
    stackMap: {},
    platform: 'ios',
    params: undefined,
    translateX: 0,

    setActiveStack: () => {},
    push: () => {},
    back: () => {},
    addStack: () => {},
    setTranslateX: () => {}
})