/**
 * TreeView.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { OverlayScrollbar } from "@ehfuse/overlay-scrollbar";

import { TreeViewProps, TreeItem, TreeNode, TreeViewStyles } from "./types";
import { ExpandMoreIcon, ChevronRightIcon, SearchIcon, CloseIcon, CheckboxIcon } from "./icons";
import {
    TreeContainer,
    TreeItemContainer,
    SearchContainer,
    StyledInput,
    InputWrapper,
    Collapse,
    EmptyMessage,
} from "./styles";

// 기본값을 렌더 밖에 고정해 매 렌더 새 참조로 인한 불필요한 재계산을 막는다.
const EMPTY_STRING_ARRAY: string[] = [];
const EMPTY_TREE_ITEMS: TreeItem[] = [];
const DEFAULT_TREE_STYLES: TreeViewStyles = {
    backgroundColor: "#ffffff",
    selectionColor: "#e3f2fd",
    hoverColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "4px",
    indentSize: 20,
    padding: "1rem",
};

/** 펼쳐질 노드가 실제로 새로 추가되는지 확인한다. */
function hasNewExpandedNode(prev: Set<string>, ensuredExpandedNodeIds: string[]): boolean {
    return ensuredExpandedNodeIds.some((nodeId) => !prev.has(nodeId));
}

export const TreeView: React.FC<TreeViewProps> = ({
    onChange,
    onNodeClick,
    onNodeContextMenu,
    initialSelections = EMPTY_STRING_ARRAY,
    resetTrigger,
    defaultExpanded = true,
    initialExpandedItemIds = EMPTY_STRING_ARRAY,
    ensureExpandedItemIds = EMPTY_STRING_ARRAY,
    ensureExpandedVersion = 0,
    excludeItems = EMPTY_STRING_ARRAY,
    items = EMPTY_TREE_ITEMS,
    showSearch = true,
    searchSize = "medium",
    searchPlaceholder = "검색어를 입력하세요",
    searchAutoFocus = false,
    showSelection = false,
    showHover = true,
    showEndIconOnHover = false,
    checkbox = true,
    multiSelect = true,
    selectable = true,
    collapsible = true,
    showTreeLines = false,
    selectionMode = "parent",
    itemStyles,
    styles = DEFAULT_TREE_STYLES,
    className,
    style,
    highlightTerm,
    highlightColor = "#3b9eff",
    toggleCheckOnLabelClick = false,
}) => {
    // indentSize 기본값 처리
    const indentSizeValue = styles.indentSize ?? 20;

    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

    const onChangeRef = useRef(onChange);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    // 마운트 시 검색창 자동 포커스(다이얼로그 트랜지션 이후 안정적으로 잡히도록 한 프레임 뒤에 포커스).
    useEffect(() => {
        if (!searchAutoFocus || !showSearch) {
            return;
        }
        const timer = setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);
        return () => clearTimeout(timer);
    }, [searchAutoFocus, showSearch]);

    // Debounce 검색
    useEffect(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            setDebouncedSearchValue(searchValue);
        }, 300);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchValue]);

    // TreeItem을 TreeNode로 변환
    const buildTreeNodes = useCallback(
        (
            sourceItems: TreeItem[],
            parentId: string | undefined,
            excludedIds: Set<string> | undefined,
            counter: { current: number }
        ): TreeNode[] => {
            const filtered = sourceItems.filter((item) => item.parentId === parentId && !excludedIds?.has(item.id));

            return filtered.map((item) => ({
                id: `node-${counter.current++}`,
                itemId: item.id,
                label: item.remark ? `${item.label} (${item.remark})` : item.label,
                remark: item.remark,
                disabled: item.disabled,
                styles: item.styles,
                endIcon: item.endIcon,
                alwaysShowEndIcon: item.alwaysShowEndIcon,
                renderLabel: item.renderLabel,
                // 빈 children 배열([])은 "자식 없음"이 아니라 truthy 이므로, 그대로 두면
                // parentId 기반(평면) 자식이 무시되어 손자 노드가 빌드/렌더/선택에서 누락된다.
                // 길이가 0이면 parentId 해석으로 폴백한다(없으면 [] 반환이라 안전).
                children:
                    item.children && item.children.length > 0
                        ? item.children.map((child) => buildSingleNode(child, excludedIds, counter))
                        : buildTreeNodes(sourceItems, item.id, excludedIds, counter),
            }));
        },
        []
    );

    const buildSingleNode = useCallback(
        (item: TreeItem, excludedIds?: Set<string>, counter?: { current: number }): TreeNode => {
            const cnt = counter || { current: 0 };
            if (excludedIds?.has(item.id)) {
                return {
                    id: `node-${cnt.current++}`,
                    itemId: item.id,
                    label: "",
                    children: [],
                };
            }

            return {
                id: `node-${cnt.current++}`,
                itemId: item.id,
                label: item.remark ? `${item.label} (${item.remark})` : item.label,
                remark: item.remark,
                disabled: item.disabled,
                styles: item.styles,
                endIcon: item.endIcon,
                alwaysShowEndIcon: item.alwaysShowEndIcon,
                renderLabel: item.renderLabel,
                children: item.children ? item.children.map((child) => buildSingleNode(child, excludedIds, cnt)) : [],
            };
        },
        []
    );

    // Exclude 아이템 처리
    const excludedIds = useMemo(() => {
        const ids = new Set<string>();
        if (excludeItems.length === 0) return ids;

        const findItemByLabel = (label: string): TreeItem | undefined => {
            const search = (itemList: TreeItem[]): TreeItem | undefined => {
                for (const item of itemList) {
                    if (item.label === label) return item;
                    if (item.children) {
                        const found = search(item.children);
                        if (found) return found;
                    }
                }
                return undefined;
            };
            return search(items);
        };

        const addItemAndChildren = (item: TreeItem) => {
            ids.add(item.id);
            if (item.children) {
                item.children.forEach((child) => addItemAndChildren(child));
            }
        };

        excludeItems.forEach((label) => {
            const item = findItemByLabel(label);
            if (item) {
                addItemAndChildren(item);
            }
        });

        return ids;
    }, [excludeItems, items]);

    // items 배열을 평면화
    const flattenedItems = useMemo(() => {
        const flatten = (itemList: TreeItem[]): TreeItem[] => {
            const result: TreeItem[] = [];
            itemList.forEach((item) => {
                result.push(item);
                if (item.children) {
                    result.push(...flatten(item.children));
                }
            });
            return result;
        };
        return flatten(items);
    }, [items]);

    // 트리 노드 생성
    const allTreeNodes = useMemo(() => {
        const counter = { current: 0 };
        return buildTreeNodes(items, undefined, excludedIds, counter);
    }, [items, excludedIds, buildTreeNodes]);

    // 검색 필터링
    const filterTreeBySearch = useCallback((nodes: TreeNode[], searchTerm: string): TreeNode[] => {
        if (!searchTerm) return nodes;

        const term = searchTerm.toLowerCase();
        const filtered: TreeNode[] = [];

        for (const node of nodes) {
            const matchesSearch = node.label.toLowerCase().includes(term);
            const filteredChildren = filterTreeBySearch(node.children, searchTerm);

            if (matchesSearch || filteredChildren.length > 0) {
                filtered.push({
                    ...node,
                    children: filteredChildren,
                });
            }
        }

        return filtered;
    }, []);

    const filteredTreeNodes = useMemo(() => {
        return filterTreeBySearch(allTreeNodes, debouncedSearchValue);
    }, [allTreeNodes, debouncedSearchValue, filterTreeBySearch]);

    // initialExpandedItemIds(원본 item id)를 내부 node id 로 변환
    const initialExpandedNodeIds = useMemo(() => {
        const expandedIds: string[] = [];

        const collect = (nodes: TreeNode[]) => {
            nodes.forEach((node) => {
                if (node.itemId && initialExpandedItemIds.includes(node.itemId) && node.children.length > 0) {
                    expandedIds.push(node.id);
                }
                if (node.children.length > 0) {
                    collect(node.children);
                }
            });
        };

        collect(allTreeNodes);
        return expandedIds;
    }, [allTreeNodes, initialExpandedItemIds]);

    // ensureExpandedItemIds(원본 item id)를 내부 node id 로 변환
    const ensuredExpandedNodeIds = useMemo(() => {
        const expandedIds: string[] = [];

        const collect = (nodes: TreeNode[]) => {
            nodes.forEach((node) => {
                if (node.itemId && ensureExpandedItemIds.includes(node.itemId) && node.children.length > 0) {
                    expandedIds.push(node.id);
                }
                if (node.children.length > 0) {
                    collect(node.children);
                }
            });
        };

        collect(allTreeNodes);
        return expandedIds;
    }, [allTreeNodes, ensureExpandedItemIds]);

    // 기본 확장 설정 (초기 마운트 시에만 실행)
    const isInitialMount = useRef(true);
    const prevDefaultExpanded = useRef(defaultExpanded);
    const prevCollapsible = useRef(collapsible);
    const prevInitialExpandedItemIdsKey = useRef(initialExpandedItemIds.join("|"));

    useEffect(() => {
        const initialExpandedItemIdsKey = initialExpandedItemIds.join("|");

        // 초기 마운트이거나 defaultExpanded 또는 collapsible 값이 변경된 경우에만 실행
        if (
            !isInitialMount.current &&
            prevDefaultExpanded.current === defaultExpanded &&
            prevCollapsible.current === collapsible &&
            prevInitialExpandedItemIdsKey.current === initialExpandedItemIdsKey
        ) {
            return;
        }

        const wasInitialMount = isInitialMount.current;
        isInitialMount.current = false;
        prevDefaultExpanded.current = defaultExpanded;
        prevCollapsible.current = collapsible;
        prevInitialExpandedItemIdsKey.current = initialExpandedItemIdsKey;

        const getAllNodeIds = (nodes: TreeNode[]): string[] => {
            const ids: string[] = [];
            const collect = (nodeList: TreeNode[]) => {
                nodeList.forEach((node) => {
                    if (node.children && node.children.length > 0) {
                        ids.push(node.id);
                        collect(node.children);
                    }
                });
            };
            collect(nodes);
            return ids;
        };

        // collapsible이 false면 모든 노드 펼침
        if (!collapsible || defaultExpanded) {
            const allIds = getAllNodeIds(allTreeNodes);
            setExpandedItems(new Set(allIds));
        } else if (initialExpandedNodeIds.length > 0) {
            setExpandedItems(new Set(initialExpandedNodeIds));
        } else {
            setExpandedItems(new Set());
        }

        // 초기 마운트 후 애니메이션 활성화
        if (wasInitialMount) {
            requestAnimationFrame(() => {
                setIsAnimationEnabled(true);
            });
        }
    }, [defaultExpanded, collapsible, allTreeNodes, initialExpandedItemIds, initialExpandedNodeIds]);

    // ensureExpandedItemIds: 현재 펼침 상태를 유지한 채 지정 노드만 추가로 펼친다.
    useEffect(() => {
        if (ensuredExpandedNodeIds.length === 0) {
            return;
        }

        setExpandedItems((prev) => {
            if (!hasNewExpandedNode(prev, ensuredExpandedNodeIds)) {
                return prev;
            }

            const next = new Set(prev);
            ensuredExpandedNodeIds.forEach((nodeId) => next.add(nodeId));
            return next;
        });
    }, [ensureExpandedVersion, ensuredExpandedNodeIds]);

    // 비활성(disabled) 노드를 선택 목록에 고정한다(역할 기반 권한 등 잠금·체크 표시).
    const addDisabledNodeIds = useCallback((selectedIds: Set<string>, nodes: TreeNode[]) => {
        nodes.forEach((node) => {
            if (node.disabled) {
                selectedIds.add(node.id);
            }

            if (node.children.length > 0) {
                addDisabledNodeIds(selectedIds, node.children);
            }
        });
    }, []);

    // disabled 노드는 항상 선택 상태를 유지한다(트리 변경 시 재적용).
    useEffect(() => {
        setSelectedItems((prev) => {
            const pinned = new Set(prev);
            addDisabledNodeIds(pinned, allTreeNodes);
            return pinned.size === prev.size ? prev : pinned;
        });
    }, [allTreeNodes, addDisabledNodeIds]);

    // 초기 선택 설정
    const isInitialSelectionSet = useRef(false);
    const buildSelectedIds = useCallback(() => {
        const selectedIds = new Set<string>();
        const findNodesByLabels = (nodes: TreeNode[]) => {
            nodes.forEach((node) => {
                const originalLabel = flattenedItems.find((item) => item.id === node.itemId)?.label;
                if (originalLabel && initialSelections.includes(originalLabel)) {
                    selectedIds.add(node.id);
                    // 하위 항목도 모두 선택
                    addAllChildren(node.id, selectedIds, allTreeNodes);
                }
                if (node.children.length > 0) {
                    findNodesByLabels(node.children);
                }
            });
        };

        findNodesByLabels(allTreeNodes);
        addDisabledNodeIds(selectedIds, allTreeNodes);
        return selectedIds;
    }, [addDisabledNodeIds, initialSelections, flattenedItems, allTreeNodes]);

    useEffect(() => {
        if (initialSelections.length === 0 || isInitialSelectionSet.current) return;
        isInitialSelectionSet.current = true;
        setSelectedItems(buildSelectedIds());
    }, [initialSelections, buildSelectedIds]);

    // 리셋 트리거
    // resetTrigger 값이 "실제로 변경"됐을 때만 선택을 초기화한다.
    // (initialSelections 기본값 []·buildSelectedIds 재계산으로 effect가 매 렌더
    //  재실행될 수 있는데, 레벨 트리거로 두면 resetTrigger>0 동안 매 렌더마다
    //  선택이 지워져, 검색/reset 이후 새 체크가 즉시 wipe되는 버그가 발생한다.)
    const prevResetTriggerRef = useRef(resetTrigger);
    useEffect(() => {
        if (resetTrigger === prevResetTriggerRef.current) return;
        prevResetTriggerRef.current = resetTrigger;

        if (!resetTrigger || resetTrigger <= 0) return;

        // initialSelections 가 비어도 buildSelectedIds 가 disabled 고정을 포함하므로 그대로 사용한다.
        setSelectedItems(buildSelectedIds());
    }, [resetTrigger, initialSelections, buildSelectedIds]);

    // selectable이 false로 변경되면 선택 해제
    useEffect(() => {
        if (!selectable) {
            setSelectedItems(new Set());
            if (onChangeRef.current) {
                onChangeRef.current([]);
            }
        }
    }, [selectable]);

    // 트리 아이템 찾기
    const findNodeById = useCallback((id: string, nodes: TreeNode[]): TreeNode | null => {
        for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children.length > 0) {
                const found = findNodeById(id, node.children);
                if (found) return found;
            }
        }
        return null;
    }, []);

    // 모든 자식 ID 가져오기
    const getAllChildrenIds = useCallback((node: TreeNode): string[] => {
        const ids: string[] = [];
        const collect = (n: TreeNode) => {
            n.children.forEach((child) => {
                ids.push(child.id);
                collect(child);
            });
        };
        collect(node);
        return ids;
    }, []);

    // 말단(leaf) 자손 ID만 수집한다.
    // 부모 체크 상태는 중간 부모 노드의 id가 selectedItems에 들어있는지와
    // 무관하게 "모든 말단 자손이 선택됐는가"로만 판정해야 한다. (중간 부모 id는
    // updateParentStates 경로로만 채워져, 말단을 개별 체크하면 빠질 수 있어
    // 모든 하위가 체크됐는데 상위가 indeterminate(-)로 보이는 버그가 발생.)
    const getLeafDescendantIds = useCallback((node: TreeNode): string[] => {
        const ids: string[] = [];
        const collect = (n: TreeNode) => {
            n.children.forEach((child) => {
                if (child.children && child.children.length > 0) {
                    collect(child);
                } else {
                    ids.push(child.id);
                }
            });
        };
        collect(node);
        return ids;
    }, []);

    // 하위 항목 모두 선택
    const addAllChildren = (nodeId: string, selectedSet: Set<string>, nodes: TreeNode[]) => {
        const node = findNodeById(nodeId, nodes);
        if (!node) return;

        const childIds = getAllChildrenIds(node);
        childIds.forEach((id) => {
            selectedSet.add(id);
            // 동일한 itemId를 가진 모든 노드도 함께 선택
            const childNode = findNodeById(id, nodes);
            if (childNode?.itemId) {
                findAllNodesWithItemId(childNode.itemId, nodes).forEach((matchingId) => selectedSet.add(matchingId));
            }
        });
    };

    // 하위 항목 모두 해제
    const removeAllChildren = (nodeId: string, selectedSet: Set<string>, nodes: TreeNode[]) => {
        const node = findNodeById(nodeId, nodes);
        if (!node) return;

        const childIds = getAllChildrenIds(node);
        childIds.forEach((id) => {
            // disabled 노드는 부모 해제 캐스케이드에서도 체크를 유지한다.
            const childNode = findNodeById(id, nodes);
            if (childNode?.disabled) {
                return;
            }

            selectedSet.delete(id);
            // 동일한 itemId를 가진 모든 노드도 함께 해제
            if (childNode?.itemId) {
                findAllNodesWithItemId(childNode.itemId, nodes).forEach((matchingId) => {
                    const matchingNode = findNodeById(matchingId, nodes);
                    if (!matchingNode?.disabled) {
                        selectedSet.delete(matchingId);
                    }
                });
            }
        });
    };

    // 특정 itemId를 가진 모든 노드 찾기
    const findAllNodesWithItemId = (itemId: string, nodes: TreeNode[]): string[] => {
        const nodeIds: string[] = [];
        const search = (nodeList: TreeNode[]) => {
            nodeList.forEach((n) => {
                if (n.itemId === itemId) {
                    nodeIds.push(n.id);
                }
                if (n.children.length > 0) {
                    search(n.children);
                }
            });
        };
        search(nodes);
        return nodeIds;
    };

    // 부모 상태 업데이트
    const updateParentStates = (nodeId: string, selectedSet: Set<string>, nodes: TreeNode[]) => {
        const node = findNodeById(nodeId, nodes);
        if (!node || !node.itemId) return;

        // 평면화된 목록에서 parentId 우선으로 부모를 찾는다(중첩 children 트리에서도 동작).
        const currentItem = flattenedItems.find((item) => item.id === node.itemId);
        const parentItem =
            (currentItem?.parentId ? flattenedItems.find((item) => item.id === currentItem.parentId) : undefined) ??
            flattenedItems.find((item) => item.children?.some((child) => child.id === node.itemId));

        if (!parentItem) return;

        const parentNode = findNodeById(parentItem.id, nodes);
        if (!parentNode) return;

        // disabled 부모는 자식 상태와 무관하게 항상 체크 고정
        if (parentNode.disabled) {
            selectedSet.add(parentNode.id);
            updateParentStates(parentNode.id, selectedSet, nodes);
            return;
        }

        // 모든 자식이 선택되었는지 확인
        const allChildrenSelected = parentNode.children.every((child) => selectedSet.has(child.id));

        if (allChildrenSelected) {
            selectedSet.add(parentNode.id);
        } else {
            selectedSet.delete(parentNode.id);
        }

        // 재귀적으로 상위 부모 업데이트
        updateParentStates(parentNode.id, selectedSet, nodes);
    };

    // 체크박스 상태 계산
    const getCheckboxState = (node: TreeNode) => {
        const isChecked = selectedItems.has(node.id);
        // 말단 자손 기준으로만 판정한다(중간 부모 id 누락에 영향받지 않음).
        const leafIds = getLeafDescendantIds(node);

        if (leafIds.length === 0) {
            return { checked: isChecked, indeterminate: false };
        }

        const checkedChildren = leafIds.filter((id) => selectedItems.has(id));
        const allChildrenChecked = checkedChildren.length === leafIds.length;
        const someChildrenChecked = checkedChildren.length > 0 && checkedChildren.length < leafIds.length;

        return {
            checked: allChildrenChecked,
            indeterminate: someChildrenChecked,
        };
    };

    // 아이템 선택/해제
    const handleItemCheck = (nodeId: string, checked: boolean) => {
        if (!selectable) return;

        const newSelected = new Set(selectedItems);

        // 동일한 itemId를 가진 모든 노드를 찾아서 함께 처리
        const node = findNodeById(nodeId, allTreeNodes);
        if (!node) return;

        const allMatchingNodeIds = node.itemId ? findAllNodesWithItemId(node.itemId, allTreeNodes) : [nodeId];

        if (multiSelect) {
            // 다중 선택 모드
            if (checked) {
                // 모든 동일한 아이템과 그 하위 항목 선택
                allMatchingNodeIds.forEach((id) => {
                    newSelected.add(id);
                    addAllChildren(id, newSelected, allTreeNodes);
                });
                // 첫 번째 노드로 부모 상태 업데이트
                updateParentStates(nodeId, newSelected, allTreeNodes);
            } else {
                // 모든 동일한 아이템과 그 하위 항목 해제 (disabled 는 체크 유지)
                allMatchingNodeIds.forEach((id) => {
                    const matchingNode = findNodeById(id, allTreeNodes);
                    if (!matchingNode?.disabled) {
                        newSelected.delete(id);
                    }
                    removeAllChildren(id, newSelected, allTreeNodes);
                });
                // 첫 번째 노드로 부모 상태 업데이트
                updateParentStates(nodeId, newSelected, allTreeNodes);
            }
        } else {
            // 단일 선택 모드
            newSelected.clear();
            if (checked) {
                allMatchingNodeIds.forEach((id) => newSelected.add(id));
            }
        }

        addDisabledNodeIds(newSelected, allTreeNodes);

        setSelectedItems(newSelected);

        // onChange 콜백 호출
        if (onChangeRef.current) {
            const selectedLabels: string[] = [];
            const processedItemIds = new Set<string>();

            // 모든 노드를 확인하여 선택된 항목 수집 (자식이 모두 선택된 부모 포함)
            const collectSelectedLabels = (nodes: TreeNode[]) => {
                nodes.forEach((node) => {
                    if (node.itemId && !processedItemIds.has(node.itemId)) {
                        const isDirectlySelected = newSelected.has(node.id);
                        const leafIds = getLeafDescendantIds(node);
                        const allChildrenSelected =
                            leafIds.length > 0 && leafIds.every((id) => newSelected.has(id));

                        if (isDirectlySelected || allChildrenSelected) {
                            const item = flattenedItems.find((i) => i.id === node.itemId);
                            if (item) {
                                selectedLabels.push(item.label);
                                processedItemIds.add(item.id);
                            }
                        }
                    }
                    if (node.children.length > 0) {
                        collectSelectedLabels(node.children);
                    }
                });
            };

            collectSelectedLabels(allTreeNodes);

            // selectionMode에 따라 필터링
            let filteredLabels = selectedLabels;
            if (selectionMode === "parent") {
                // 부모만 반환: 자식이 모두 선택된 경우 부모만 표시 (자식은 제외)
                filteredLabels = selectedLabels.filter((label) => {
                    const item = flattenedItems.find((i) => i.label === label);
                    if (!item) return true;

                    // 부모가 선택되어 있는지 확인
                    if (item.parentId) {
                        const parent = flattenedItems.find((i) => i.id === item.parentId);
                        // 부모가 선택되어 있으면 자식은 제외
                        if (parent && selectedLabels.includes(parent.label)) {
                            return false;
                        }
                    }
                    return true;
                });
            } else if (selectionMode === "child") {
                // 자식만 반환: 부모가 선택된 경우 부모는 제외하고 자식만 표시
                filteredLabels = selectedLabels.filter((label) => {
                    const item = flattenedItems.find((i) => i.label === label);
                    if (!item || !item.children || item.children.length === 0) {
                        // 자식이 없으면 포함
                        return true;
                    }
                    // 자식이 있는 부모인 경우, 자식이 하나라도 선택되어 있으면 부모 제외
                    const childLabels = item.children.map((child) => child.label);
                    const hasSelectedChild = childLabels.some((childLabel) => selectedLabels.includes(childLabel));
                    return !hasSelectedChild;
                });
            }
            // selectionMode === "all"이면 filteredLabels = selectedLabels 그대로

            onChangeRef.current(filteredLabels);
        }
    };

    // 검색 활성화 여부 (매칭 경로 강제 펼침에 사용)
    const isSearchActive = debouncedSearchValue.trim().length > 0;

    // 확장/축소 토글
    const toggleExpand = (nodeId: string) => {
        if (!collapsible) return;
        // 검색 중에는 매칭 경로를 강제로 펼쳐 보여주므로 토글로 펼침 상태를
        // 변경하지 않는다. (검색을 비우면 검색 이전 상태가 그대로 복원되도록)
        if (isSearchActive) return;

        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(nodeId)) {
            newExpanded.delete(nodeId);
        } else {
            newExpanded.add(nodeId);
        }
        setExpandedItems(newExpanded);
    };

    // 체크박스 클릭 핸들러
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // 라벨에서 검색어(highlightTerm) 부분 문자열만 강조색으로 렌더한다(대소문자 무시).
    // node.label 문자열 자체는 선택 키로 쓰이므로 변경하지 않고, 표시만 분할한다.
    const renderLabel = (label: string): React.ReactNode => {
        const term = (highlightTerm ?? "").trim();
        if (!term) return label;
        const lower = label.toLowerCase();
        const lowerTerm = term.toLowerCase();
        const parts: React.ReactNode[] = [];
        let from = 0;
        let idx = lower.indexOf(lowerTerm, from);
        if (idx === -1) return label;
        let key = 0;
        while (idx !== -1) {
            if (idx > from) parts.push(label.slice(from, idx));
            parts.push(
                <span key={`hl-${key++}`} style={{ color: highlightColor }}>
                    {label.slice(idx, idx + term.length)}
                </span>
            );
            from = idx + term.length;
            idx = lower.indexOf(lowerTerm, from);
        }
        if (from < label.length) parts.push(label.slice(from));
        return parts;
    };

    // 트리 아이템 렌더링
    const renderTreeItem = (node: TreeNode, level: number = 0, isLastChild: boolean = false): React.ReactNode => {
        const hasChildren = node.children && node.children.length > 0;
        // 검색 중에는 필터된 트리에서 자식이 있는 노드(= 매칭 노드의 조상)를
        // 강제로 펼쳐, 접힌 가지 안의 매칭 결과도 즉시 보이게 한다.
        const isExpanded = (isSearchActive && hasChildren) || expandedItems.has(node.id);
        const { checked, indeterminate } = getCheckboxState(node);
        const isSelected = selectedItems.has(node.id);

        // 노드 콜백에 전달할 원본 TreeItem (id 등 소비자 식별용)
        const originalItem = node.itemId
            ? flattenedItems.find((item) => item.id === node.itemId)
            : undefined;

        return (
            <div key={node.id} className="tree-node" data-level={level}>
                <div
                    className={`tree-item ${
                        hasChildren ? "has-children" : ""
                    } ${isSelected && showSelection ? "selected" : ""} ${
                        isLastChild ? "last-child" : ""
                    } ${isExpanded ? "expanded" : ""} ${node.disabled ? "disabled" : ""}`}
                    onClick={(e) => {
                        if (originalItem && onNodeClick) {
                            onNodeClick(originalItem, e);
                        }
                        if (hasChildren) toggleExpand(node.id);
                    }}
                    onContextMenu={
                        originalItem && onNodeContextMenu
                            ? (e) => onNodeContextMenu(originalItem, e)
                            : undefined
                    }
                    style={{
                        marginLeft: `${level * indentSizeValue}px`,
                    }}
                >
                    <div className="tree-item-content">
                        <div className="expand-icon-container">
                            {hasChildren &&
                                collapsible &&
                                (isExpanded ? (
                                    <ExpandMoreIcon fontSize="small" />
                                ) : (
                                    <ChevronRightIcon fontSize="small" />
                                ))}
                        </div>

                        {checkbox && selectable && (
                            <div className="checkbox-container" onClick={handleCheckboxClick}>
                                <div
                                    style={{
                                        cursor: node.disabled ? "not-allowed" : "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (node.disabled) return;
                                        handleItemCheck(node.id, !checked);
                                    }}
                                >
                                    <CheckboxIcon
                                        checked={checked}
                                        indeterminate={indeterminate}
                                        disabled={node.disabled}
                                        checkboxColor={styles.checkboxColor}
                                        checkboxBorderColor={styles.checkboxBorderColor}
                                    />
                                </div>
                            </div>
                        )}

                        {/* 라벨 영역 클릭 토글 — renderLabel(직접 그린 라벨)도 포함한다(1.0.16). 예전에는 기본 글자 span 에만 걸려
                            이름을 직접 그리는 소비처(직원 고르기 창)에서는 체크박스를 정확히 눌러야만 골라졌다. 펼침/접힘과는 분리한다. */}
                        <div
                            className="tree-item-label"
                            onClick={
                                toggleCheckOnLabelClick && checkbox && selectable && !node.disabled
                                    ? (e) => {
                                          e.stopPropagation();
                                          handleItemCheck(node.id, !checked);
                                      }
                                    : undefined
                            }
                            style={
                                toggleCheckOnLabelClick && checkbox && selectable && !node.disabled
                                    ? { cursor: "pointer" }
                                    : undefined
                            }
                        >
                            {node.renderLabel != null ? node.renderLabel : <span>{renderLabel(node.label)}</span>}
                        </div>

                        {node.endIcon && (
                            <div
                                className="end-icon-container"
                                onClick={(e) => e.stopPropagation()}
                                style={
                                    // 호버 노출 방식이 opacity/pointer-events 기반이라 셋 다 강제한다.
                                    node.alwaysShowEndIcon
                                        ? { opacity: 1, visibility: "visible", pointerEvents: "auto" }
                                        : undefined
                                }
                            >
                                {node.endIcon}
                            </div>
                        )}
                    </div>
                </div>

                {hasChildren && (
                    <Collapse $isOpen={isExpanded} $shouldAnimate={isAnimationEnabled}>
                        <div
                            className="tree-children"
                            style={
                                {
                                    ...(showTreeLines
                                        ? {
                                              "--tree-line-left": `${level * indentSizeValue + 13}px`,
                                          }
                                        : {}),
                                } as React.CSSProperties
                            }
                        >
                            {node.children.map((child, index) =>
                                renderTreeItem(child, level + 1, index === node.children.length - 1)
                            )}
                        </div>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <div
            className={`ehfuse-tree-view ${className || ""}`}
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minHeight: 0,
                width: "100%",
                ...style,
            }}
        >
            {showSearch && (
                <SearchContainer>
                    <InputWrapper $searchSize={searchSize}>
                        <div className="search-icon">
                            <SearchIcon sx={{ color: "#999", mr: 1 }} />
                        </div>
                        <StyledInput
                            ref={searchInputRef}
                            $searchInputHeight={styles.searchInputHeight}
                            $searchInputFontSize={styles.searchInputFontSize}
                            $searchSize={searchSize}
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            spellCheck={false}
                            autoFocus={searchAutoFocus}
                        />
                        {searchValue && (
                            <div
                                className="clear-icon"
                                onClick={() => {
                                    setSearchValue("");
                                    searchInputRef.current?.focus();
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </div>
                        )}
                    </InputWrapper>
                </SearchContainer>
            )}

            <TreeContainer
                $backgroundColor={styles.backgroundColor}
                $border={styles.border}
                $borderRadius={styles.borderRadius}
                $padding={styles.padding}
                $height={typeof styles.height === "number" ? `${styles.height}px` : styles.height}
                $maxHeight={typeof styles.maxHeight === "number" ? `${styles.maxHeight}px` : styles.maxHeight}
            >
                <OverlayScrollbar className="tree-content">
                    <TreeItemContainer
                        $selectionColor={styles.selectionColor}
                        $hoverColor={styles.hoverColor}
                        $showHover={showHover}
                        $itemStyles={itemStyles}
                        $iconColor={styles.iconColor}
                        $padding={styles.padding}
                        $collapsible={collapsible}
                        $itemSpacing={styles.itemSpacing}
                        $checkboxSpacing={styles.checkboxSpacing}
                        $showEndIconOnHover={showEndIconOnHover}
                        $showTreeLines={showTreeLines}
                        $treeLineColor={styles.treeLineColor}
                    >
                        {filteredTreeNodes.length > 0 ? (
                            filteredTreeNodes.map((node, index) =>
                                renderTreeItem(node, 0, index === filteredTreeNodes.length - 1)
                            )
                        ) : (
                            <EmptyMessage>
                                {debouncedSearchValue ? "검색 결과가 없습니다." : "표시할 항목이 없습니다."}
                            </EmptyMessage>
                        )}
                    </TreeItemContainer>
                </OverlayScrollbar>
            </TreeContainer>
        </div>
    );
};
