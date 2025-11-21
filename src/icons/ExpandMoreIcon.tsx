/**
 * ExpandMoreIcon.tsx
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
}

const sizeMap = {
    small: 20,
    medium: 24,
    large: 28,
};

export const ExpandMoreIcon: React.FC<IconProps> = ({
    fontSize = "medium",
    style,
    className,
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
        >
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
    );
};
