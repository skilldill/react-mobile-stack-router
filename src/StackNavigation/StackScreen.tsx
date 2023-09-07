import React, { FC, PropsWithChildren } from 'react';

interface StackScreenProps {
  name: string;
}

export const StackScreen: FC<PropsWithChildren<StackScreenProps>> = ({
  children,
}) => <React.Fragment>{children}</React.Fragment>;
