import {useContext} from "react";
import { MobileNavigationContext } from "./MobileNavigation.context";

export const useStackNavigation = (stackName: string) => {
    const navigation = useContext(MobileNavigationContext);

    const history = {
        push: (name: string, params?: any) => navigation.push(stackName, name, params),
        back: () => navigation.back(stackName),
    }

    return history;
}

export const useStackParams = <T = any>() => {
    const navigation = useContext(MobileNavigationContext);
    return navigation.params as T;
}

export const useMobileNavigation = () => {
    const navigation = useContext(MobileNavigationContext);
    
    return {
        changeStack: navigation.setActiveStack,
        translateX: navigation.translateX,
    }
}

/**
 * For inner use
 */
export const MobileNavigationService = (stackName: string) => {
    const navigation = useContext(MobileNavigationContext);

    const history = {
        push: (name: string) => navigation.push(stackName, name),
        back: () => navigation.back(stackName),
        handleBack: () => navigation.back(stackName, true),
    }

    return {
        ...history,

        platform: navigation.platform,
        stackMap: navigation.stackMap,
        activeStack: navigation.activeStack,
        addStack: navigation.addStack,
        setActiveStack: navigation.setActiveStack,
        translateX: navigation.translateX,
        setTranslateX: navigation.setTranslateX,
    };
}