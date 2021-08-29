import React, { CSSProperties, FC, useMemo, useState } from "react";
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
    fromHistory?: boolean;
}

export const ScreenIOS: FC<ScreenIOSProps> = (props) => {
    const {children, index, closing, translated, animated, stackName, fromHistory} = props;

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

    const isPrelast = useMemo(() => (!!history.stackMap[stackName] && history.stackMap[stackName].history.length === 1 && index === 0 && !fromHistory) ||
        (!!history.stackMap[stackName] && history.stackMap[stackName].history.length > 1 && index === history.stackMap[stackName].history.length - 2)
    , [index, history.stackMap])

    const onTouchStart = () => {
        setTouched(true);
    }

    const onTouchMove = () => {
        history.setTranslateX(stateTranslateX);
    }

    const onTouchEnd = () => {
        setTouched(false);
        history.setTranslateX(0);
        const diff = stateTranslateX - stateStartX;

        if (animated && stateStartX < 100) {
            if (diff >= 100) {
                setStateTranslateX(window.innerWidth);    
                history.handleBack();
            } else {
                setStateTranslateX(0);
            }
        }
    }

    const translateStyle: CSSProperties = {
        transform: (animated || isPrelast) && stateTranslateX >= 0  ? 
            `translateX(${history.translateX > 0 && isPrelast ? (history.translateX / 10 - window.innerWidth * 0.15) : stateTranslateX}px)` : 
            'none',

        zIndex: 1000 + index,
        transition: touched || history.translateX > 0 ? 'none' : 'all .2s',
    }

    return (
        <div 
            onTouchStart={handleTouchStart(onTouchStart)}
            onTouchMove={handleTouchMove(onTouchMove)}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            className={cn({
                [styles.screenIOS]: true,
                [styles.screenIOSanimated]: animated,
                [styles.screenIOSclose]: closing,
                [styles.screenIOStranslated]: history.translateX === 0 && translated,
            })} 
            style={translateStyle}
        >
            {children}
        </div>
    )
}