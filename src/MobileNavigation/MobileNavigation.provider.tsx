import React, { FC, useEffect, useState } from "react";

import {MobileNavigationContext, StackScreenObject} from "./MobileNavigation.context";

interface MobileNavigationModel {
    platform?: 'android' | 'ios'
}

export const MobileNavigation: FC<MobileNavigationModel> = (props) => {
    const {children, platform} = props;

    const [stackMap, setStackMap] = useState<{[key: string]: {history: StackScreenObject[]}}>({});
    const [activeStack, setActiveStack] = useState<string>();
    const [params, setParams] = useState<any>();

    const [prelastScreenState, setPrelastScreenState] = useState({});

    useEffect(() => {
        console.log(prelastScreenState);
    }, [prelastScreenState])

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

    const back = (stackName: string, handleClosing?: boolean) => {
        const prepareStacksMap = {...stackMap};

        prepareStacksMap[stackName].history[prepareStacksMap[stackName].history.length - 1].showState = handleClosing ? "handleClosing" : "closing";
        setStackMap(prepareStacksMap);

        const timeout = setTimeout(() => {
            const prepareStacksMap = {...stackMap};
            prepareStacksMap[stackName].history.pop();
            setStackMap(prepareStacksMap);
            clearTimeout(timeout);
        }, 200)
    }

    const push = (stackName: string, screenName: string, params?: any) => {
        !!params && setParams(params);

        const prepareStacksMap = {...stackMap};
        prepareStacksMap[stackName].history.push({name: screenName, showState: 'show', translateState: null});
        setStackMap(prepareStacksMap);
    }

    const values = {
        activeStack,
        stackMap,
        platform: !!platform ? platform : 'ios', 
        params,
        prelastScreenState,

        setActiveStack,
        back,
        push,
        addStack: addStack(),
        setPrelastScreenState
    }

    return (
        <MobileNavigationContext.Provider value={values}>
            {children}
        </MobileNavigationContext.Provider>
    )
}