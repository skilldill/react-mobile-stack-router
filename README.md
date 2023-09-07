# react-mobile-stack-router

[![NPM](https://img.shields.io/npm/v/react-mobile-stack-router.svg)](https://www.npmjs.com/package/react-mobile-stack-router) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Use with webview for creation pretty navigation 📱

⭐️⭐️⭐️ Build a beautiful mobile app using React and Webview ⭐️⭐️⭐️

You will get navigation with animation like ios and android without unnecessary things 😏

Introducing "React Mobile Stack Router"

## Description

React Mobile Stack Router is a comprehensive React library specifically crafted to provide a robust and feature-rich mobile navigation experience. Utilizing the power of React, this library empowers developers to create dynamic and efficient navigation stacks similar to those found in popular mobile platforms.

Key Features:

- Mobile Stack Navigation: React Mobile Stack Router offers a stack-based navigation system that allows users to navigate through different screens in a mobile application with ease. It provides a smooth transition between screens, maintaining a consistent and intuitive user flow.

- Flexible Configuration: This library provides a flexible configuration setup, allowing developers to customize the navigation stack as per their application's requirements. Developers have full control over the navigation stack, including the ability to define screens, transitions, and animations.

- React Integration: React Mobile Stack Router seamlessly integrates with React applications, leveraging the power and flexibility of React components. It provides a straightforward API that aligns with React's component-based architecture.

- Navigation Hooks: The library offers navigation hooks, empowering developers to interact with the navigation stack and access essential features like pushing, popping, or replacing screens programmatically. This enables fine-grained control over the navigation flow and allows for dynamic navigation handling.

- Tab-based Navigation: React Mobile Stack Router enables you to implement tab-based navigation patterns commonly found in mobile applications. Users can switch between different tabs, each representing a specific section or functionality of your app, providing them easy access to different views or features.


Regardless of your mobile application's complexity, React Mobile Stack Router provides an intuitive and efficient solution for managing the navigation stack. Streamline your development process and deliver an exceptional mobile navigation experience to your users with React Mobile Stack Router.

Start implementing React Mobile Stack Router in your React projects today and unlock a new level of mobile navigation prowess!

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

### Props

| MobileNavigation | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| platform  | `ios`, `android` | `ios` | true |
| children | `ReactNode` | *none* | true |

| Stack | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |
| if `Stack` in `Tab` | | | |
| key  | `string` | *none* | true |

| Tabs | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| onChange  | `(tabName: string) => void` | *none* | false |

| Tab | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |

| StackScreen | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| name  | `string` | *none* | true |
| children | `ReactNode` | *none* | true |

| useStackNavigation | | | |
| -------- | ------- | ------- | ------- |
| **Prop**    | **Values** | **Default Values** | **Required** |
| stackName  | `string` | *none* | true |


## License

MIT © [](https://github.com/)
