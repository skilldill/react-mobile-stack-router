import React, { FC } from "react";
import cn from "classnames";

import styles from "./StackNavigation.module.css";
import { useTouch } from "../hooks";
import { MobileNavigationService } from "../MobileNavigation";

interface ScreenIOSProps {
    index: number;
    stackName: string;
    closing?: boolean;
    translated?: boolean;
    animated?: boolean;
}

export const ScreenIOS: FC<ScreenIOSProps> = (props) => {
    const {children, index, closing, translated, animated, stackName} = props;

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
                [styles.screenIOS]: true,
                [styles.screenIOSanimated]: animated,
                [styles.screenIOSclose]: closing,
                [styles.screenIOStranslated]: translated,
            })} 
            style={{zIndex: 1000 + index}}
        >
            {children}
        </div>
    )
}