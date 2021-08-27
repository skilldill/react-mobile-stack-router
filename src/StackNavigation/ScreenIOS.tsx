import React, { CSSProperties, FC, useEffect, useState } from "react";
import cn from "classnames";

import styles from "./StackNavigation.module.css";
import { useTouch } from "../hooks";
import { MobileNavigationService } from "../MobileNavigation";
import { ScreenStateType } from "../MobileNavigation/MobileNavigation.context";
import { getWidthPercents } from "./StackNavigation.utils";

interface ScreenIOSProps {
    index: number;
    stackName: string;
    translated?: boolean;
    animated?: boolean;
    screenShowState: ScreenStateType;
    translateState?: any
}

export const ScreenIOS: FC<ScreenIOSProps> = (props) => {
    const {children, index, screenShowState, translated, animated, stackName, translateState} = props;

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

    const onTouchMove = () => {
        const translated = getWidthPercents(15) - stateTranslateX / 30;
        history.setPrelastScreenState({ translated });
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
                history.setPrelastScreenState({ translated: getWidthPercents(15) });
            }
        }
    }

    const translateStyle: CSSProperties = {
        transform: animated ? `translate(${stateTranslateX}px)` : 'none',
        zIndex: 1000 + index,
        transition: touched ? 'none' : 'all .2s',
    }

    const styleWithTranslateState = (!!translateState && !!translateState.translated) ? {
        ...translateStyle,
        transform: `translateX(-${translateState.translated}px) !important`,
    } : translateStyle;

    useEffect(() => {
        console.clear();
        if (translateState) {
            console.log(index, styleWithTranslateState);
        }
    }, [translateState])


    return (
        <div 
            onTouchStart={handleTouchStart(onToucheStart)}
            onTouchMove={handleTouchMove(onTouchMove)}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            className={cn({
                [styles.screenIOS]: true,
                [styles.screenIOSanimated]: animated,
                [styles.screenIOSclose]: screenShowState === 'closing',
                [styles.screenIOStranslated]: translated,
            })} 
            style={styleWithTranslateState}
        >
            {children}
        </div>
    )
}