'use client';
import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            {/*<Next13ProgressBar height="3px" color="#F89D33" options={{ showSpinner: true }} showOnShallow />*/}
            <Next13ProgressBar height="3px" color="#A34411" options={{ showSpinner: true }} showOnShallow />
        </>
    );
};

export default Providers;