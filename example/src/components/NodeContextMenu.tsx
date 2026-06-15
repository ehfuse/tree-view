import type { ReactNode, CSSProperties } from "react";
import styled from "styled-components";

/** 메뉴 한 줄 정의 */
export interface ContextMenuItem {
    label: ReactNode; // 표시 텍스트/노드
    onClick?: () => void; // 클릭 동작 (실행 후 자동 닫힘)
    danger?: boolean; // 위험 동작(삭제 등) → 빨간색
    disabled?: boolean; // 비활성화
}

export interface NodeContextMenuProps {
    anchorPos: { left: number; top: number } | null; // null이면 닫힘
    items: ContextMenuItem[]; // 메뉴 항목들
    onClose: () => void; // 닫기 콜백
    title?: ReactNode; // 상단 타이틀 (어떤 노드인지 표시)
    showCancel?: boolean; // 하단 "취소" 항목 표시 (기본 true)
    cancelLabel?: ReactNode; // 취소 항목 라벨 (기본 "취소")
    menuStyle?: CSSProperties; // 메뉴 컨테이너 인라인 스타일 오버라이드
    className?: string; // 메뉴 컨테이너 클래스 (외부 스타일링)
}

// 메뉴 바깥 클릭/우클릭으로 닫기 위한 투명 배경
const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    z-index: 999;
`;

const Menu = styled.ul`
    position: fixed;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 180px;

    .menu-title {
        padding: 6px 16px;
        font-size: 12px;
        font-weight: 600;
        color: #888;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 260px;
        cursor: default;

        &:hover {
            background: transparent;
        }
    }

    .menu-divider {
        height: 1px;
        margin: 4px 0;
        background: #eee;
    }

    .menu-item {
        padding: 6px 16px;
        cursor: pointer;
        font-size: 14px;

        &:hover {
            background: #f0f7ff;
        }

        &.danger {
            color: #c0392b;
        }

        &.cancel {
            color: #888;
        }

        &.disabled {
            color: #bbb;
            cursor: default;
            &:hover {
                background: transparent;
            }
        }
    }
`;

/**
 * 트리 노드 우클릭용 재사용 컨텍스트 메뉴.
 * tree-view 라이브러리는 onNodeContextMenu 콜백으로 좌표와 TreeItem만 넘겨주고,
 * 메뉴의 구성/스타일은 이 컴포넌트의 props(items/title/menuStyle 등)로 제어한다.
 */
export function NodeContextMenu({
    anchorPos,
    items,
    onClose,
    title,
    showCancel = true,
    cancelLabel = "취소",
    menuStyle,
    className,
}: NodeContextMenuProps) {
    if (!anchorPos) return null;

    return (
        <>
            <Backdrop
                onClick={onClose}
                onContextMenu={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            />
            <Menu
                className={className}
                style={{ left: anchorPos.left, top: anchorPos.top, ...menuStyle }}
                onClick={(e) => e.stopPropagation()}
            >
                {title != null && (
                    <>
                        <li className="menu-title">{title}</li>
                        <div className="menu-divider" />
                    </>
                )}

                {items.map((item, i) => (
                    <li
                        key={i}
                        className={`menu-item ${item.danger ? "danger" : ""} ${
                            item.disabled ? "disabled" : ""
                        }`}
                        onClick={() => {
                            if (item.disabled) return;
                            item.onClick?.();
                            onClose();
                        }}
                    >
                        {item.label}
                    </li>
                ))}

                {showCancel && (
                    <>
                        <div className="menu-divider" />
                        <li className="menu-item cancel" onClick={onClose}>
                            {cancelLabel}
                        </li>
                    </>
                )}
            </Menu>
        </>
    );
}
