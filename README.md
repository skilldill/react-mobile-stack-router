# react-mobile-stack-router

[![NPM](https://img.shields.io/npm/v/react-mobile-stack-router.svg)](https://www.npmjs.com/package/react-mobile-stack-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Use with webview for creation pretty navigation 📱

### Navigation like IOS
![example](https://github.com/skilldill/react-mobile-stack-router/blob/master/blob/ios.gif?raw=true)

### Navigation like Android
![example](https://github.com/skilldill/react-mobile-stack-router/blob/master/blob/android.gif?raw=true)


⭐️⭐️⭐️ Build a beautiful mobile app using React and Webview ⭐️⭐️⭐️

You will get navigation with animation like ios and android without unnecessary things 😏

Introducing "React Mobile Stack Router"

## Description

**react-mobile-stack-router** is a comprehensive React library specifically crafted to provide a robust and feature-rich mobile navigation experience. Utilizing the power of React, this library empowers developers to create dynamic and efficient navigation stacks similar to those found in popular mobile platforms.

Regardless of your mobile application's complexity, **react-mobile-stack-router** provides an intuitive and efficient solution for managing the navigation stack. Streamline your development process and deliver an exceptional mobile navigation experience to your users with **react-mobile-stack-router**.

Start implementing **react-mobile-stack-router** in your React projects today and unlock a new level of mobile navigation prowess!

## Install

```bash
npm install --save react-mobile-stack-router
```

or

```bash
yarn add react-mobile-stack-router
```

## Usage

### One stack of screens

```tsx
import React from 'react';

import 'react-mobile-stack-router/dist/index.css';
import {
  MobileNavigation,
  Stack,
  StackScreen,
  useStackNavigation,
  useStackParams,
} from 'react-mobile-stack-router';

const FirstScreen = () => {
  const history = useStackNavigation('BaseStack');

  const openSecondScreen = () => {
    history.push('SecondScreen', { id: 1 });
  };

  return (
    <div className='screen'>
      <button onClick={openSecondScreen}>Open second screen</button>
    </div>
  );
};

const SecondScreen = () => {
  const history = useStackNavigation('BaseStack');

  const { id } = useStackParams();

  const openThridScreen = () => {
    history.push('ThirdScreen');
  };

  const backToFirstScreen = () => {
    history.back();
  };

  return (
    <div className='screen'>
      <button onClick={openThridScreen}>Open third screen</button>

      <button onClick={backToFirstScreen}>Back</button>
    </div>
  );
};

const ThridScreen = () => {
  const history = useStackNavigation('BaseStack');

  const backToSecondScreen = () => {
    history.back();
  };

  return (
    <div className='screen'>
      <button onClick={backToSecondScreen}>Back</button>
    </div>
  );
};

const MobileApp = () => {
  return (
    <MobileNavigation>
      <Stack name="BaseStack">
        <StackScreen name="FirstScreen">
          <FirstScreen />
        </StackScreen>

        <StackScreen name="SecondScreen">
          <SecondScreen />
        </StackScreen>

        <StackScreen name="ThirdScreen">
          <ThridScreen />
        </StackScreen>
      </Stack>
    </MobileNavigation>
  );
};
```

### With tab navigation

```tsx
import React from 'react';

import {
  Tabs,
  Tab,
  Stack,
  StackScreen,
  useMobileNavigation,
} from 'react-mobile-stack-router';

const Navigation = () => {
  const { changeStack } = useMobileNavigation();

  const handleChangeStack = (tabName: string) => {
    changeStack(tabName);
  };

  return (
    <Tabs onChange={handleChangeStack}>
      <Tab name="Main">
        <Stack name="Main" key="Main">
          <StackScreen name="TodoList">
            <FirstScreen />
          </StackScreen>

          <StackScreen name="Todo">
            <SecondScreen />
          </StackScreen>
        </Stack>
      </Tab>

      <Tab name="Settings">
        <Stack name="Settings" key="Settings">
          <StackScreen name="SettingsList">
            <ThirdScreen />
          </StackScreen>

          <StackScreen name="Todo">
            <FourthScreen />
          </StackScreen>
        </Stack>
      </Tab>
    </Tabs>
  );
};

/* App.tsx */
import 'react-mobile-stack-router/dist/index.css';
import {
  MobileNavigation,
  Stack,
  StackScreen,
} from 'react-mobile-stack-router';

const MobileApp = () => {
  return (
    <MobileNavigation>
      <Navigation />
    </MobileNavigation>
  );
};
```

### Platform indication

Default value `ios`.

You can use [Capacitor](https://capacitorjs.com/)

```tsx
import 'react-mobile-stack-router/dist/index.css';
import { MobileNavigation } from 'react-mobile-stack-router';

const MobileApp = () => {
  return (
    <MobileNavigation platform="android">{/* Your app */}</MobileNavigation>
  );
};
```

### See [example](https://skilldill.github.io/react-mobile-stack-router/) 👀


### Props

| MobileNavigation | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| platform  | `ios`, `android` | `ios` | true |
| children | `ReactNode` | *none* | true |

<hr>

| Stack | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |
| if `Stack` in `Tab` | | | |
| key  | `string` | *none* | true |

<hr>

| Tabs | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| onChange  | `(tabName: string) => void` | *none* | false |

<hr>

| Tab | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |

<hr>

| StackScreen | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |

<hr>

| useStackNavigation | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| stackName  | `string` | *none* | true |


## License

MIT © [](https://github.com/)
