/**
 * styles.ts
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import styled, { css } from "styled-components";
import { TreeItemStyles } from "./types";

// 기본값 상수
const DEFAULT_VALUES = {
    CHECKBOX_SPACING: "10px",
    CHECKBOX_BORDER_COLOR: "#999",
    ITEM_SPACING: "2px",
    SEARCH_INPUT_HEIGHT: "40px",
    SEARCH_INPUT_FONT_SIZE: "16px",
    TREE_LINE_COLOR: "#d1d1d1",
    INDENT_SIZE: 20,
} as const;

export const TreeContainer = styled.div<{
    $backgroundColor?: string;
    $border?: string;
    $borderRadius?: string;
    $padding?: string;
    $maxHeight?: string;
}>`
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.$backgroundColor || "#ffffff"};
    border: ${(props) => props.$border || "1px solid #ddd"};
    border-radius: ${(props) => props.$borderRadius || "4px"};

    .tree-content {
        flex: 1;
        overflow-y: auto;
        max-height: ${(props) => props.$maxHeight || "none"};
    }
`;

export const TreeItemContainer = styled.div<{
    $selectionColor?: string;
    $hoverColor?: string;
    $showHover?: boolean;
    $itemStyles?: TreeItemStyles;
    $iconColor?: string;
    $padding?: string;
    $collapsible?: boolean;
    $itemSpacing?: string;
    $checkboxSpacing?: string;
    $showEndIconOnHover?: boolean;
    $showTreeLines?: boolean;
    $treeLineColor?: string;
}>`
    padding: ${(props) => props.$padding || "1rem"};

    .tree-node {
        position: relative;
    }

    .tree-children {
        ${(props) =>
            props.$showTreeLines &&
            css`
                position: relative;

                /* 세로선 (자식들 연결) */
                &::before {
                    content: "";
                    position: absolute;
                    left: var(--tree-line-left, 13px);
                    top: 0;
                    bottom: 15px;
                    width: 1px;
                    background-color: ${props.$treeLineColor ||
                    DEFAULT_VALUES.TREE_LINE_COLOR};
                }
            `}
    }

    .tree-item {
        display: flex;
        align-items: center;
        padding: 2px 8px 2px 0;
        margin-bottom: ${(props) =>
            props.$itemSpacing || DEFAULT_VALUES.ITEM_SPACING};
        border-radius: 4px;
        user-select: none;
        position: relative;

        &.has-children {
            cursor: ${(props) => (props.$collapsible ? "pointer" : "default")};
        }

        &:hover {
            background-color: ${(props) =>
                props.$showHover
                    ? props.$hoverColor
                        ? `${props.$hoverColor}cc`
                        : "rgba(0, 0, 0, 0.04)"
                    : "transparent"};
        }

        &.selected {
            background-color: ${(props) => props.$selectionColor || "#e3f2fd"};
        }
    }

    .tree-item-content {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .tree-item-label {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: ${(props) => props.$itemStyles?.color || "inherit"};
        font-size: ${(props) =>
            props.$itemStyles?.fontSize
                ? typeof props.$itemStyles.fontSize === "number"
                    ? `${props.$itemStyles.fontSize}px`
                    : props.$itemStyles.fontSize
                : "inherit"};
    }

    .expand-icon-container {
        width: 28px;
        display: ${(props) => (props.$collapsible ? "flex" : "none")};
        align-items: center;
        justify-content: center;
        color: ${(props) => props.$iconColor || "inherit"};
    }

    .checkbox-container {
        margin-right: ${(props) =>
            props.$checkboxSpacing || DEFAULT_VALUES.CHECKBOX_SPACING};
        display: flex;
    }

    .end-icon-container {
        display: flex;
        align-items: center;
        margin-left: auto;
        visibility: ${(props) =>
            props.$showEndIconOnHover ? "hidden" : "visible"};
    }

    .tree-item:hover .end-icon-container {
        visibility: visible;
    }
`;

export const SearchContainer = styled.div`
    margin-bottom: 1rem;
`;

// MUI TextField 기준 크기
const SEARCH_SIZE_CONFIG = {
    small: {
        height: "40px",
        fontSize: "14px",
        padding: "0 36px 0 38px",
        iconLeft: "12px",
        iconRight: "12px",
    },
    medium: {
        height: "56px",
        fontSize: "16px",
        padding: "0 48px 0 50px",
        iconLeft: "16px",
        iconRight: "16px",
    },
    large: {
        height: "64px",
        fontSize: "18px",
        padding: "0 52px 0 54px",
        iconLeft: "18px",
        iconRight: "18px",
    },
} as const;

export type SearchSize = "small" | "medium" | "large";
export { SEARCH_SIZE_CONFIG };

export const StyledInput = styled.input<{
    $searchInputHeight?: string;
    $searchInputFontSize?: string;
    $searchSize?: "small" | "medium" | "large";
}>`
    width: 100%;
    height: ${(props) =>
        props.$searchInputHeight ||
        SEARCH_SIZE_CONFIG[props.$searchSize || "medium"].height};
    padding: ${(props) =>
        SEARCH_SIZE_CONFIG[props.$searchSize || "medium"].padding};
    font-size: ${(props) =>
        props.$searchInputFontSize ||
        SEARCH_SIZE_CONFIG[props.$searchSize || "medium"].fontSize};
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;

    &:focus {
        border-color: #1976d2;
    }
`;

export const InputWrapper = styled.div<{
    $searchSize?: SearchSize;
}>`
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border: 2px solid #1976d2;
        border-radius: 5px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    &:focus-within::after {
        opacity: 1;
    }

    &:focus-within input {
        border-color: transparent;
    }

    .search-icon {
        position: absolute;
        left: ${(props) =>
            SEARCH_SIZE_CONFIG[props.$searchSize || "medium"].iconLeft};
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        display: flex;
    }

    .clear-icon {
        position: absolute;
        right: ${(props) =>
            SEARCH_SIZE_CONFIG[props.$searchSize || "medium"].iconRight};
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        display: flex;
        color: #999;

        &:hover {
            color: #666;
        }
    }
`;

export const Collapse = styled.div<{
    $isOpen: boolean;
    $shouldAnimate?: boolean;
}>`
    overflow: hidden;
    transition: ${(props) =>
        props.$shouldAnimate ? "max-height 0.2s ease-in-out" : "none"};
    max-height: ${(props) => (props.$isOpen ? "2000px" : "0")};
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 2rem 0;
    color: #666;
`;
