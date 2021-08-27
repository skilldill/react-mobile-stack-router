import React, { CSSProperties, FC, useState } from "react";
import cn from "classnames";

import styles from "./StackNavigation.module.css";
import { useTouch } from "../hooks";
import { MobileNavigationService } from "../MobileNavigation";
import { ScreenStateType } from "../MobileNavigation/MobileNavigation.context";

interface ScreenIOSProps {
    index: number;
    stackName: string;
    translated?: boolean;
    animated?: boolean;
    screenState: ScreenStateType
}

export const ScreenIOS: FC<ScreenIOSProps> = (props) => {
    const {children, index, screenState, translated, animated, stackName} = props;

    const [touched, setTouched] = useState(false);

    const history = MobileNavigationService(stackName);
    const {
        handleTouchStart, 
        handleTouchMove, 
        handleTouchEnd,
        stateStartX,
        stateTranslateX,
        setStateTranslateX
    } = useTouch();

    const onToucheStart = () => {
        setTouched(true);
    }

    const onTouchEnd = () => {
        setTouched(false);

        const diff = stateTranslateX - stateStartX;
        
        if (animated && stateStartX < 100) {
            if (diff >= 100) {
                setStateTranslateX(window.innerWidth);
                history.handleClosing();
            } else {
                setStateTranslateX(0);
            }
        }
    }

    const translateStyle: CSSProperties = {
        transform: animated ? `translate(${stateTranslateX}px)` : 'none',
        zIndex: 1000 + index,
        transition: touched ? 'none' : 'all .2s',
    }

    return (
        <div 
            onTouchStart={handleTouchStart(onToucheStart)}
            onTouchMove={handleTouchMove()}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            className={cn({
                [styles.screenIOS]: true,
                [styles.screenIOSanimated]: animated,
                [styles.screenIOSclose]: screenState === 'closing',
                [styles.screenIOStranslated]: translated,
            })} 
            style={translateStyle}
        >
            {children}
        </div>
    )
}