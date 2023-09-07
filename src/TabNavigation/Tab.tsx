import React, { FC, PropsWithChildren } from 'react';
import styles from './TabNavigation.module.css';

interface TabProps {
  name: string;
  title: React.ReactNode;
  titleActive: React.ReactNode;
}

export const Tab: FC<PropsWithChildren<TabProps>> = (props) => {
  const { children } = props;
  return <div className={styles.tab}>{children}</div>;
};
