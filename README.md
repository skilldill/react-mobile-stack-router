# React mobile stack modals

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-mobile-stack-modals.svg)](https://www.npmjs.com/package/react-mobile-stack-modals) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Use with webview for creation pretty navigation 📱

⭐️⭐️⭐️ Build a beautiful mobile app using React and Webview ⭐️⭐️⭐️

You will get navigation with animation like ios and android without unnecessary things 😏

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
import { MobileNavigation, Stack, StackScreen, useStackNavigation, useStackParams } from "react-mobile-stack-router";

const FirstScreen = () => {
  const history = useStackNavigation("BaseStack");

  const openSecondScreen = () => {
    history.push('SecondScreen', { id: 1 });
  }

  return (
    <div className="screen">
      <button onClick={openSecondScreen}>
        Open second screen
      </button>
    </div>  
  )
}

const SecondScreen = () => {
  const history = useStackNavigation("BaseStack");

  const { id } = useStackParams();

  const openThridScreen = () => {
    history.push('ThirdScreen');
  }

  const backToFirstScreen = () => {
    history.back();
  }

  return (
    <div className="screen">
      <button onClick={openSecondPage}>
        Open third screen
      </button>

      <button onClick={backToFirstScreen}>
        Back
      </button>
    </div>  
  )
}

const SecondScreen = () => {
  const history = useStackNavigation("BaseStack");

  const backToSecondScreen = () => {
    history.back();
  }

  return (
    <div className="screen">
      <button onClick={backToSecondScreen}>
        Back
      </button>
    </div>  
  )
}


const App = () => {
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
  )
}
```

### With tab navigation

```tsx
import React from 'react';

import { Tabs, Tab, Stack, StackScreen, useMobileNavigation } from "react-mobile-stack-router";

const Navigation = () => {
  const {changeStack} = useMobileNavigation();

  const handleChangeStack = (tabName: string) => {
    changeStack(tabName);
  }

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
  )
}

/* App.tsx */
import 'react-mobile-stack-router/dist/index.css';
import { MobileNavigation, Stack, StackScreen } from "react-mobile-stack-router";

const App = () => {
  return (
    <MobileNavigation>
      <Navigation />
    </MobileNavigation>
  )
}
```

### Platform indication

Default value "ios".

You can use [Capacitor]()

```tsx
  import 'react-mobile-stack-router/dist/index.css';
  import { MobileNavigation } from "react-mobile-stack-router";

  const App = () => {
    return (
      <MobileNavigation platform="android">
        {/* Your app */}
      </MobileNavigation>
    )
  }
```

### Props
#### MobileNavigation
* ``platform``: "ios" | "android" (default "ios")

#### Stack
* ``name``: string (require)

if use with Tab navigation
*``key`` (require)

#### StackScreen
* ``name``: string (require)

#### useStackNavigation
* stackName: string (require) 

## License

MIT © [](https://github.com/)