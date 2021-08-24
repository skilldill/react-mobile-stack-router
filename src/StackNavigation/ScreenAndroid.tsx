import React, { FC } from "react";
import cn from "classnames";

import styles from "./StackNavigation.module.css";
import { useTouch } from "../hooks";
import { MobileNavigationService } from "../MobileNavigation";

interface ScreenAndroidProps {
    index: number;
    stackName: string;
    closing?: boolean;
    animated?: boolean;
}

export const ScreenAndroid: FC<ScreenAndroidProps> = (props) => {
    const {children, index, closing, animated, stackName} = props;

    const history = MobileNavigationService(stackName);
    const {
        handleTouchStart, 
        handleTouchMove, 
        handleTouchEnd,
        stateStartX,
        stateTranslateX
    } = useTouch();

    const onTouchEnd = () => {
        const diff = stateTranslateX - stateStartX;
        
        if (animated && stateStartX < 100 && diff >= 100) {
            history.back();
        }
    }

    return (
        <div 
            onTouchStart={handleTouchStart()}
            onTouchMove={handleTouchMove()}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            className={cn({
                [styles.screenAndroid]: true,
                [styles.screenAndroidAnimated]: animated,
                [styles.screenAndroidClose]: closing,
            })} 
            style={{zIndex: 1000 + index}}
        >
            {children}
        </div>
    )
}