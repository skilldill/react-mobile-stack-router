import React, { FC, useState } from "react";

import {MobileNavigationContext, ScreenObject} from "./MobileNavigation.context";

interface MobileNavigationModel {
    platform?: 'android' | 'ios'
}

export const MobileNavigation: FC<MobileNavigationModel> = (props) => {
    const {children, platform} = props;

    const [stackMap, setStackMap] = useState<{[key: string]: {history: ScreenObject[]}}>({});
    const [activeStack, setActiveStack] = useState<string>();
    const [params, setParams] = useState<any>();

    const [translateX, setTranslateX] = useState(0);

    const addStack = () => {
        let inProcess = false;

        const add = (name: string) => {
            if (!inProcess) {
                inProcess = true;
                setStackMap((stackMap) => ({ ...stackMap, [name]: {history: []} }));
                !activeStack && setActiveStack(name);
                inProcess = false;
                
                return;
            } else {
                add(name);
            }
        }

        return add;
    }

    const back = (stackName: string, isHandleClose?: boolean) => {
        const prepareStacksMap = {...stackMap};

        
        prepareStacksMap[stackName].history[prepareStacksMap[stackName].history.length - 1].closingType = isHandleClose ? "handleClose" : "default";
        setStackMap(prepareStacksMap);

        const timeout = setTimeout(() => {
            const prepareStacksMap = {...stackMap};
            prepareStacksMap[stackName].history.pop();
            setTranslateX(0);
            setStackMap(prepareStacksMap);
            clearTimeout(timeout);
        }, 200)
    }

    const push = (stackName: string, screenName: string, params?: any) => {
        !!params && setParams(params);

        const prepareStacksMap = {...stackMap};
        prepareStacksMap[stackName].history.push({name: screenName, closingType: null});
        setStackMap(prepareStacksMap);
    }

    const values = {
        activeStack,
        stackMap,
        platform: !!platform ? platform : 'ios', 
        params,
        translateX,

        setActiveStack,
        back,
        push,
        addStack: addStack(),
        setTranslateX
    }

    return (
        <MobileNavigationContext.Provider value={values}>
            {children}
        </MobileNavigationContext.Provider>
    )
}