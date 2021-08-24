import React, { CSSProperties, FC, useState } from "react";
import cn from "classnames";

import styles from "./TabNavigation.module.css";

interface TabsProps {
    onChange?: (tabName: string) => void;

    classTabbar?: string,
    styleTabbar?: CSSProperties,
}

export const Tabs: FC<TabsProps> = (props) => {
    const {children, onChange, classTabbar, styleTabbar} = props;

    const [active, setActive] = useState(0);

    const handleChangeTab = (tabIndex: number, tabName: string) => {
        setActive(tabIndex);
        !!onChange && onChange(tabName);
    }

    const classesTabbar = !!classTabbar ? cn([styles.tabbar, classTabbar]) : styles.tabbar;

    return (
        <div className={styles.tabs}>
            {(children as any[])[active]}
            <div className={classesTabbar} style={styleTabbar}>
                <div className={styles.tabbarContent}>
                    {(children as any[]).map((tab, i) => 
                        <div key={i} onClick={() => handleChangeTab(i, tab.props.name)}>
                            {i === active ? tab.props.titleActive : tab.props.title}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}