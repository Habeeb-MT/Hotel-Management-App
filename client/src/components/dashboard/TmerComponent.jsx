// TimerComponent.jsx

import React, { useState, useEffect } from 'react';

export const TimerComponent = ({ onUpdateDateTime }) => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentDateTime(now);
            onUpdateDateTime(now);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [onUpdateDateTime]);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

    return (
        <span style={{ color: "black" }}>{formattedDateTime}</span>
    );
};

