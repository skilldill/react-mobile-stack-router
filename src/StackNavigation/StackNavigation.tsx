import React, {FC, useEffect} from "react";
import { MobileNavigationService } from "../MobileNavigation";

import { ScreenAndroid } from "./ScreenAndroid";
import { ScreenIOS } from "./ScreenIOS";

import styles from "./StackNavigation.module.css";
import { createStackScreensMap } from "./StackNavigation.utils";

interface StackProps {
    name: string;
}

export const Stack: FC<StackProps> = (props) => {
    const {children, name} = props;

    const {addStack, activeStack, stackMap, platform} = MobileNavigationService(name);

    useEffect(() => {
        addStack(name);
    }, [])

    const stackScreensMap = createStackScreensMap(children);

    if (platform === 'android') {
        return (
            <div className={styles.stackNavigation} style={{display: activeStack === name ? 'block' : 'none'}}>
                <ScreenAndroid
                    stackName={name}
                    index={0}
                >
                    {(children as any[])[0]}
                </ScreenAndroid>
    
                {!!stackMap && !!stackMap[name] && (stackMap[name].history.length > 0) && (
                    stackMap[name].history.map((screen, i) => 
                        <ScreenAndroid 
                            stackName={name}
                            animated
                            key={i} 
                            index={i} 
                            closing={screen.state === 'closing'}
                        >
                            {stackScreensMap[screen.name]}
                        </ScreenAndroid>
                    )
                )}
            </div>
        )
    }

    return (
        <div className={styles.stackNavigation} style={{display: activeStack === name ? 'block' : 'none'}}>
            <ScreenIOS 
                stackName={name}
                index={0} 
                translated={stackMap[name] && 
                    stackMap[name].history.length > 0 && 
                    stackMap[name].history[stackMap[name].history.length - 1].state === 'show'
                }
            >
                {(children as any[])[0]}
            </ScreenIOS>

            {!!stackMap && !!stackMap[name] && (stackMap[name].history.length > 0) && (
                stackMap[name].history.map((screen, i) => 
                    <ScreenIOS 
                        stackName={name}
                        animated
                        key={i} 
                        index={i} 
                        closing={screen.state === 'closing'}
                        translated={i !== (stackMap[name].history.length - 1) && 
                            stackMap[name].history[stackMap[name].history.length - 1].state === 'show'
                        }
                    >
                        {stackScreensMap[screen.name]}
                    </ScreenIOS>
                )
            )}
        </div>
    )
}