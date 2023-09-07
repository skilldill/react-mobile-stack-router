import React from 'react';

import {
  useMobileNavigation,
  Tabs,
  Tab,
  Stack,
  StackScreen,
} from 'react-mobile-stack-router';

import { FirstScreen, SecondScreen, ThirdScreen } from './screens';

export const Navigation = () => {
  const { changeStack } = useMobileNavigation();

  return (
    <Tabs onChange={changeStack}>
      <Tab name='firstStack' title='First' titleActive='FIRST'>
        <Stack name='firstStack' key='firstStack'>
          <StackScreen name='home'>
            <FirstScreen stackName='firstStack' />
          </StackScreen>

          <StackScreen name='settings'>
            <SecondScreen stackName='firstStack' />
          </StackScreen>

          <StackScreen name='profile'>
            <ThirdScreen stackName='firstStack' />
          </StackScreen>
        </Stack>
      </Tab>

      <Tab name='secondStack' title='Second' titleActive='SECOND'>
        <Stack name='secondStack' key='secondStack'>
          <StackScreen name='home'>
            <FirstScreen stackName='secondStack' />
          </StackScreen>

          <StackScreen name='settings'>
            <SecondScreen stackName='secondStack' />
          </StackScreen>

          <StackScreen name='profile'>
            <ThirdScreen stackName='secondStack' />
          </StackScreen>
        </Stack>
      </Tab>
    </Tabs>
  );
};
