import React, { CSSProperties, FC, useState } from "react";
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
        transform: animated && stateTranslateX >= 0  ? 
            `translateX(${stateTranslateX}px)` : 
            'none',

        opacity: animated ? 1 - stateTranslateX / 1000 : 1,
        zIndex: 1000 + index,
        transition: touched || history.translateX > 0 ? 'none' : 'all .2s',
    }

    return (
        <div 
            onTouchStart={handleTouchStart(onTouchStart)}
            onTouchMove={handleTouchMove(onTouchMove)}
            onTouchEnd={handleTouchEnd(onTouchEnd)}
            className={cn({
                [styles.screenAndroid]: true,
                [styles.screenAndroidAnimated]: animated,
                [styles.screenAndroidClose]: closing,
            })} 
            style={translateStyle}
        >
            {children}
        </div>
    )
}