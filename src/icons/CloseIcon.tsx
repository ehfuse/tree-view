/**
 * CloseIcon.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import React from "react";

interface IconProps {
    fontSize?: "small" | "medium" | "large";
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

const sizeMap = {
    small: 18,
    medium: 24,
    large: 28,
};

export const CloseIcon: React.FC<IconProps> = ({
    fontSize = "small",
    style,
    className,
    onClick,
}) => {
    const size = sizeMap[fontSize];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={style}
            className={className}
            onClick={onClick}
        >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
    );
};
