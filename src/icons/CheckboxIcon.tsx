/**
 * CheckboxIcon.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import React from "react";

interface CheckboxIconProps {
    checked: boolean;
    indeterminate: boolean;
    disabled?: boolean;
    checkboxColor?: string;
    checkboxBorderColor?: string;
}

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({
    checked,
    indeterminate,
    disabled = false,
    checkboxColor = "#1976d2",
    checkboxBorderColor = "#999",
}) => {
    const size = 18;
    const opacity = disabled ? 0.5 : 1;

    if (indeterminate) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 18 18"
                style={{ opacity }}
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="17"
                    height="17"
                    rx="3"
                    fill={checkboxColor}
                    stroke={checkboxColor}
                    strokeWidth="2"
                />
                <line
                    x1="5"
                    y1="9"
                    x2="13"
                    y2="9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (checked) {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 18 18"
                style={{ opacity }}
            >
                <rect
                    x="0.5"
                    y="0.5"
                    width="17"
                    height="17"
                    rx="3"
                    fill={checkboxColor}
                    stroke={checkboxColor}
                    strokeWidth="2"
                />
                <path
                    d="M5 9L8 12L13 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>
        );
    }

    return (
        <svg width={size} height={size} viewBox="0 0 18 18" style={{ opacity }}>
            <rect
                x="0.5"
                y="0.5"
                width="17"
                height="17"
                rx="3"
                fill="white"
                stroke={checkboxBorderColor}
                strokeWidth="2"
            />
        </svg>
    );
};
