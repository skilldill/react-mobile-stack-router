import React, {FC} from "react";
import styles from "./TabNavigation.module.css";

interface TabProps {
    name: string,
    title: React.ReactNode,
    titleActive: React.ReactNode,
}

export const Tab: FC<TabProps> = (props) => {
    const {children} = props;
    return <div className={styles.tab}>{children}</div>;
}