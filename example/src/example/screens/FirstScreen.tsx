import React, { FC } from "react";
import {useStackNavigation} from "react-mobile-stack-router";
import cn from "classnames";

import {ScreenProps} from "./Screen.model";
import styles from "./screens.module.css";

export const FirstScreen: FC<ScreenProps> = ({stackName}) => {
    const history = useStackNavigation(stackName);

    const handleClick = () => {
        history.push('settings', {id: 1});
    }

    return (
        <div className={cn([styles.screen, styles.firstScreen])}>
            <button className={styles.screenButton} onClick={handleClick}>
                Second screen
            </button>
        </div>
    )
}