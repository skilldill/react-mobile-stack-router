import React, { FC, useEffect } from "react";
import {useStackNavigation, useStackParams} from "react-mobile-stack-router";
import cn from "classnames";

import {ScreenProps} from "./Screen.model";
import styles from "./screens.module.css";

export const SecondScreen: FC<ScreenProps> = ({stackName}) => {
    const history = useStackNavigation(stackName);
    const {id} = useStackParams<{id: number}>();

    useEffect(() => {
        console.log(id);
    }, [id])

    const handleClick = () => {
        history.push('profile');
    }

    return (
        <div className={cn([styles.screen, styles.secondScreen])}>
            <button className={styles.screenButton} onClick={handleClick}>
                Thrid screen
            </button>
        </div>
    )
}