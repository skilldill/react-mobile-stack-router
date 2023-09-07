import React, { FC, PropsWithChildren, useState } from 'react';

import { MobileNavigationContext } from './MobileNavigation.context';

interface MobileNavigationModel {
  platform?: 'android' | 'ios';
}

export const MobileNavigation: FC<PropsWithChildren<MobileNavigationModel>> = (
  props,
) => {
  const { children, platform } = props;

  const [stackMap, setStackMap] = useState<{
    [key: string]: { history: { name: string; state: 'show' | 'closing' }[] };
  }>({});
  const [activeStack, setActiveStack] = useState<string>();
  const [params, setParams] = useState<any>();

  const addStack = () => {
    let inProcess = false;

    const add = (name: string) => {
      if (!inProcess) {
        inProcess = true;
        setStackMap((stackMap) => ({ ...stackMap, [name]: { history: [] } }));
        !activeStack && setActiveStack(name);
        inProcess = false;

        return;
      } else {
        add(name);
      }
    };

    return add;
  };

  const back = (stackName: string) => {
    const prepareStacksMap = { ...stackMap };

    prepareStacksMap[stackName].history[
      prepareStacksMap[stackName].history.length - 1
    ].state = 'closing';
    setStackMap(prepareStacksMap);

    const timeout = setTimeout(() => {
      const prepareStacksMap = { ...stackMap };
      prepareStacksMap[stackName].history.pop();
      setStackMap(prepareStacksMap);
      clearTimeout(timeout);
    }, 200);
  };

  const push = (stackName: string, screenName: string, params?: any) => {
    !!params && setParams(params);

    const prepareStacksMap = { ...stackMap };
    prepareStacksMap[stackName].history.push({
      name: screenName,
      state: 'show',
    });
    setStackMap(prepareStacksMap);
  };

  const values = {
    activeStack,
    stackMap,
    platform: !!platform ? platform : 'ios',
    params,

    setActiveStack,
    back,
    push,
    addStack: addStack(),
  };

  return (
    <MobileNavigationContext.Provider value={values}>
      {children}
    </MobileNavigationContext.Provider>
  );
};
