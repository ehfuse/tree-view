/**
 * types.ts
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import React from "react";

/** 트리 아이템 개별 스타일 설정 */
export interface TreeItemStyles {
    color?: string; // 텍스트 색상
    fontSize?: string | number; // 폰트 크기
    backgroundColor?: string; // 배경색
}

/** 트리 아이템 데이터 구조 */
export interface TreeItem {
    id: string; // 고유 식별자
    label: string; // 표시될 텍스트
    remark?: string; // 부가 설명 (label 뒤에 괄호로 표시)
    parentId?: string; // 부모 아이템 ID
    collapsed?: boolean; // 초기 접힘 상태 (미사용)
    disabled?: boolean; // 비활성화 여부
    styles?: TreeItemStyles; // 개별 스타일
    children?: TreeItem[]; // 자식 아이템 배열
    endIcon?: React.ReactNode; // 우측 끝에 표시될 아이콘
    alwaysShowEndIcon?: boolean; // endIcon을 항상 표시 (호버 설정 무시)
}

/** 트리뷰 전체 컨테이너 스타일 설정 */
export interface TreeViewStyles {
    backgroundColor?: string; // 배경색
    selectionColor?: string; // 선택된 아이템 배경색
    hoverColor?: string; // 호버 시 배경색
    border?: string; // 테두리
    borderRadius?: string; // 테두리 둥글기
    padding?: string; // 안쪽 여백
    iconColor?: string; // 확장/축소 아이콘 색상
    maxHeight?: string; // 트리 컨텐츠 최대 높이
    checkboxColor?: string; // 체크박스 배경색 (체크됨)
    checkboxBorderColor?: string; // 체크박스 테두리 색상 (기본값: #999)
    checkboxSpacing?: string; // 체크박스와 텍스트 간격 (기본값: 8px)
    itemSpacing?: string; // 아이템 간 간격 (기본값: 4px)
    searchInputHeight?: string; // 검색 입력창 높이 (기본값: 40px)
    searchInputFontSize?: string; // 검색 입력창 폰트 크기 (기본값: 16px)
    treeLineColor?: string; // 트리 라인 색상 (기본값: #ddd)
    indentSize?: number; // 들여쓰기 크기 px (기본값: 15)
}

/** 트리뷰 컴포넌트 Props */
export interface TreeViewProps {
    onChange?: (selectedItemLabels: string[]) => void; // 선택 변경 콜백 (선택된 아이템의 label 배열)
    initialSelections?: string[]; // 초기 선택 아이템 (label 배열)
    resetTrigger?: number; // 선택 초기화 트리거 (값 변경 시 선택 해제)
    defaultExpanded?: boolean; // 초기 확장 상태 (true: 모두 펼침)
    excludeItems?: string[]; // 제외할 아이템 label 배열
    items: TreeItem[]; // 트리 데이터
    showSearch?: boolean; // 검색창 표시 여부
    searchPlaceholder?: string; // 검색창 placeholder (기본값: "검색어를 입력하세요")
    showSelection?: boolean; // 선택된 아이템 배경색 표시 여부
    showHover?: boolean; // 호버 배경색 표시 여부
    showEndIconOnHover?: boolean; // endIcon을 호버 시에만 표시 (기본값: false)
    checkbox?: boolean; // 체크박스 표시 여부
    multiSelect?: boolean; // 다중 선택 허용 여부
    selectable?: boolean; // 선택 가능 여부
    collapsible?: boolean; // 접기/펼치기 가능 여부 (false면 모든 노드 펼컨)
    showTreeLines?: boolean; // 트리 라인 표시 여부 (기본값: false)
    selectionMode?: "all" | "parent" | "child"; // 선택 항목 반환 방식 (all: 모두, parent: 부모만, child: 자식만, 기본: parent)
    itemStyles?: TreeItemStyles; // 전체 아이템에 적용될 기본 스타일
    styles?: TreeViewStyles; // 트리뷰 컨테이너 스타일
    className?: string; // 최상위 div CSS 클래스명
    style?: React.CSSProperties; // 최상위 div 인라인 스타일
}

/** 내부에서 사용되는 트리 노드 구조 */
export interface TreeNode {
    id: string; // 고유 식별자
    itemId?: string; // 원본 TreeItem의 ID
    label: string; // 표시될 텍스트 (remark 포함)
    remark?: string; // 부가 설명
    children: TreeNode[]; // 자식 노드 배열
    disabled?: boolean; // 비활성화 여부
    styles?: TreeItemStyles; // 개별 스타일
    endIcon?: React.ReactNode; // 우측 끝 아이콘
    alwaysShowEndIcon?: boolean; // endIcon을 항상 표시
}
