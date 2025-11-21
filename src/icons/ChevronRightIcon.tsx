/**
 * ChevronRightIcon.tsx
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

export const ChevronRightIcon: React.FC<IconProps> = ({
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
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
    );
};
