import React from "react";
import { MobileNavigation } from "react-mobile-stack-router";

import { Navigation } from "./Navigation";

export const ExampleApp = () => {
    return (
        <MobileNavigation platform="android">
            <Navigation />
        </MobileNavigation>
    )
}