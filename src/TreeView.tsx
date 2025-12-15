/**
 * TreeView.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from "react";
import { OverlayScrollbar } from "@ehfuse/overlay-scrollbar";

import { TreeViewProps, TreeItem, TreeNode } from "./types";
import {
    ExpandMoreIcon,
    ChevronRightIcon,
    SearchIcon,
    CloseIcon,
    CheckboxIcon,
} from "./icons";
import {
    TreeContainer,
    TreeItemContainer,
    SearchContainer,
    StyledInput,
    InputWrapper,
    Collapse,
    EmptyMessage,
} from "./styles";

export const TreeView: React.FC<TreeViewProps> = ({
    onChange,
    initialSelections = [],
    resetTrigger,
    defaultExpanded = true,
    excludeItems = [],
    items = [],
    showSearch = true,
    searchSize = "medium",
    searchPlaceholder = "검색어를 입력하세요",
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
    styles = {
        backgroundColor: "#ffffff",
        selectionColor: "#e3f2fd",
        hoverColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        indentSize: 20,
        padding: "1rem",
    },
    className,
    style,
}) => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [isAnimationEnabled, setIsAnimationEnabled] = useState(false);

    const onChangeRef = useRef(onChange);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

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
            const filtered = sourceItems.filter(
                (item) =>
                    item.parentId === parentId && !excludedIds?.has(item.id)
            );

            return filtered.map((item) => ({
                id: `node-${counter.current++}`,
                itemId: item.id,
                label: item.remark
                    ? `${item.label} (${item.remark})`
                    : item.label,
                remark: item.remark,
                disabled: item.disabled,
                styles: item.styles,
                endIcon: item.endIcon,
                children: item.children
                    ? item.children.map((child) =>
                          buildSingleNode(child, excludedIds, counter)
                      )
                    : buildTreeNodes(
                          sourceItems,
                          item.id,
                          excludedIds,
                          counter
                      ),
            }));
        },
        []
    );

    const buildSingleNode = useCallback(
        (
            item: TreeItem,
            excludedIds?: Set<string>,
            counter?: { current: number }
        ): TreeNode => {
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
                label: item.remark
                    ? `${item.label} (${item.remark})`
                    : item.label,
                remark: item.remark,
                disabled: item.disabled,
                styles: item.styles,
                endIcon: item.endIcon,
                children: item.children
                    ? item.children.map((child) =>
                          buildSingleNode(child, excludedIds, cnt)
                      )
                    : [],
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
    const filterTreeBySearch = useCallback(
        (nodes: TreeNode[], searchTerm: string): TreeNode[] => {
            if (!searchTerm) return nodes;

            const term = searchTerm.toLowerCase();
            const filtered: TreeNode[] = [];

            for (const node of nodes) {
                const matchesSearch = node.label.toLowerCase().includes(term);
                const filteredChildren = filterTreeBySearch(
                    node.children,
                    searchTerm
                );

                if (matchesSearch || filteredChildren.length > 0) {
                    filtered.push({
                        ...node,
                        children: filteredChildren,
                    });
                }
            }

            return filtered;
        },
        []
    );

    const filteredTreeNodes = useMemo(() => {
        return filterTreeBySearch(allTreeNodes, debouncedSearchValue);
    }, [allTreeNodes, debouncedSearchValue, filterTreeBySearch]);

    // 기본 확장 설정 (초기 마운트 시에만 실행)
    const isInitialMount = useRef(true);
    const prevDefaultExpanded = useRef(defaultExpanded);
    const prevCollapsible = useRef(collapsible);

    useEffect(() => {
        // 초기 마운트이거나 defaultExpanded 또는 collapsible 값이 변경된 경우에만 실행
        if (
            !isInitialMount.current &&
            prevDefaultExpanded.current === defaultExpanded &&
            prevCollapsible.current === collapsible
        ) {
            return;
        }

        const wasInitialMount = isInitialMount.current;
        isInitialMount.current = false;
        prevDefaultExpanded.current = defaultExpanded;
        prevCollapsible.current = collapsible;

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
        } else {
            setExpandedItems(new Set());
        }

        // 초기 마운트 후 애니메이션 활성화
        if (wasInitialMount) {
            requestAnimationFrame(() => {
                setIsAnimationEnabled(true);
            });
        }
    }, [defaultExpanded, collapsible, allTreeNodes]);

    // 초기 선택 설정
    const isInitialSelectionSet = useRef(false);
    useEffect(() => {
        if (initialSelections.length === 0 || isInitialSelectionSet.current)
            return;
        isInitialSelectionSet.current = true;

        const selectedIds = new Set<string>();
        const findNodesByLabels = (nodes: TreeNode[]) => {
            nodes.forEach((node) => {
                const originalLabel = flattenedItems.find(
                    (item) => item.id === node.itemId
                )?.label;
                if (
                    originalLabel &&
                    initialSelections.includes(originalLabel)
                ) {
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
        setSelectedItems(selectedIds);
    }, [initialSelections, items, allTreeNodes]);

    // 리셋 트리거
    useEffect(() => {
        if (resetTrigger && resetTrigger > 0) {
            setSelectedItems(new Set());
        }
    }, [resetTrigger]);

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
    const findNodeById = useCallback(
        (id: string, nodes: TreeNode[]): TreeNode | null => {
            for (const node of nodes) {
                if (node.id === id) return node;
                if (node.children.length > 0) {
                    const found = findNodeById(id, node.children);
                    if (found) return found;
                }
            }
            return null;
        },
        []
    );

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

    // 하위 항목 모두 선택
    const addAllChildren = (
        nodeId: string,
        selectedSet: Set<string>,
        nodes: TreeNode[]
    ) => {
        const node = findNodeById(nodeId, nodes);
        if (!node) return;

        const childIds = getAllChildrenIds(node);
        childIds.forEach((id) => {
            selectedSet.add(id);
            // 동일한 itemId를 가진 모든 노드도 함께 선택
            const childNode = findNodeById(id, nodes);
            if (childNode?.itemId) {
                findAllNodesWithItemId(childNode.itemId, nodes).forEach(
                    (matchingId) => selectedSet.add(matchingId)
                );
            }
        });
    };

    // 하위 항목 모두 해제
    const removeAllChildren = (
        nodeId: string,
        selectedSet: Set<string>,
        nodes: TreeNode[]
    ) => {
        const node = findNodeById(nodeId, nodes);
        if (!node) return;

        const childIds = getAllChildrenIds(node);
        childIds.forEach((id) => {
            selectedSet.delete(id);
            // 동일한 itemId를 가진 모든 노드도 함께 해제
            const childNode = findNodeById(id, nodes);
            if (childNode?.itemId) {
                findAllNodesWithItemId(childNode.itemId, nodes).forEach(
                    (matchingId) => selectedSet.delete(matchingId)
                );
            }
        });
    };

    // 특정 itemId를 가진 모든 노드 찾기
    const findAllNodesWithItemId = (
        itemId: string,
        nodes: TreeNode[]
    ): string[] => {
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
    const updateParentStates = (
        nodeId: string,
        selectedSet: Set<string>,
        nodes: TreeNode[]
    ) => {
        const node = findNodeById(nodeId, nodes);
        if (!node || !node.itemId) return;

        const parentItem = items.find(
            (item) =>
                item.children?.some((child) => child.id === node.itemId) ||
                item.id === items.find((i) => i.id === node.itemId)?.parentId
        );

        if (!parentItem) return;

        const parentNode = findNodeById(parentItem.id, nodes);
        if (!parentNode) return;

        // 모든 자식이 선택되었는지 확인
        const allChildrenSelected = parentNode.children.every((child) =>
            selectedSet.has(child.id)
        );

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
        const childrenIds = getAllChildrenIds(node);
        const checkedChildren = childrenIds.filter((id) =>
            selectedItems.has(id)
        );

        if (childrenIds.length === 0) {
            return { checked: isChecked, indeterminate: false };
        }

        const allChildrenChecked =
            childrenIds.length > 0 &&
            checkedChildren.length === childrenIds.length;
        const someChildrenChecked =
            checkedChildren.length > 0 &&
            checkedChildren.length < childrenIds.length;

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

        const allMatchingNodeIds = node.itemId
            ? findAllNodesWithItemId(node.itemId, allTreeNodes)
            : [nodeId];

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
                // 모든 동일한 아이템과 그 하위 항목 해제
                allMatchingNodeIds.forEach((id) => {
                    newSelected.delete(id);
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
                        const childrenIds = getAllChildrenIds(node);
                        const allChildrenSelected =
                            childrenIds.length > 0 &&
                            childrenIds.every((id) => newSelected.has(id));

                        if (isDirectlySelected || allChildrenSelected) {
                            const item = flattenedItems.find(
                                (i) => i.id === node.itemId
                            );
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
                        const parent = flattenedItems.find(
                            (i) => i.id === item.parentId
                        );
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
                    const childLabels = item.children.map(
                        (child) => child.label
                    );
                    const hasSelectedChild = childLabels.some((childLabel) =>
                        selectedLabels.includes(childLabel)
                    );
                    return !hasSelectedChild;
                });
            }
            // selectionMode === "all"이면 filteredLabels = selectedLabels 그대로

            onChangeRef.current(filteredLabels);
        }
    };

    // 확장/축소 토글
    const toggleExpand = (nodeId: string) => {
        if (!collapsible) return;

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

    // 트리 아이템 렌더링
    const renderTreeItem = (
        node: TreeNode,
        level: number = 0,
        isLastChild: boolean = false
    ): React.ReactNode => {
        const hasChildren = node.children && node.children.length > 0;
        const isExpanded = expandedItems.has(node.id);
        const { checked, indeterminate } = getCheckboxState(node);
        const isSelected = selectedItems.has(node.id);

        return (
            <div key={node.id} className="tree-node" data-level={level}>
                <div
                    className={`tree-item ${
                        hasChildren ? "has-children" : ""
                    } ${isSelected && showSelection ? "selected" : ""} ${
                        isLastChild ? "last-child" : ""
                    } ${isExpanded ? "expanded" : ""}`}
                    onClick={() => hasChildren && toggleExpand(node.id)}
                    style={{
                        marginLeft: `${level * (styles.indentSize || 20)}px`,
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
                            <div
                                className="checkbox-container"
                                onClick={handleCheckboxClick}
                            >
                                <div
                                    style={{
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                    onClick={(e) => {
                                        if (node.disabled) return;
                                        e.stopPropagation();
                                        handleItemCheck(node.id, !checked);
                                    }}
                                >
                                    <CheckboxIcon
                                        checked={checked}
                                        indeterminate={indeterminate}
                                        disabled={node.disabled}
                                        checkboxColor={styles.checkboxColor}
                                        checkboxBorderColor={
                                            styles.checkboxBorderColor
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        <div className="tree-item-label">
                            <span>{node.label}</span>
                        </div>

                        {node.endIcon && (
                            <div
                                className="end-icon-container"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    visibility: node.alwaysShowEndIcon
                                        ? "visible"
                                        : undefined,
                                }}
                            >
                                {node.endIcon}
                            </div>
                        )}
                    </div>
                </div>

                {hasChildren && (
                    <Collapse
                        $isOpen={isExpanded}
                        $shouldAnimate={isAnimationEnabled}
                    >
                        <div
                            className="tree-children"
                            style={
                                {
                                    ...(showTreeLines
                                        ? {
                                              "--tree-line-left": `${
                                                  level *
                                                      (styles.indentSize ||
                                                          20) +
                                                  13
                                              }px`,
                                          }
                                        : {}),
                                } as React.CSSProperties
                            }
                        >
                            {node.children.map((child, index) =>
                                renderTreeItem(
                                    child,
                                    level + 1,
                                    index === node.children.length - 1
                                )
                            )}
                        </div>
                    </Collapse>
                )}
            </div>
        );
    };

    return (
        <div className={`ehfuse-tree-view ${className || ""}`} style={style}>
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
                $maxHeight={styles.maxHeight}
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
                                renderTreeItem(
                                    node,
                                    0,
                                    index === filteredTreeNodes.length - 1
                                )
                            )
                        ) : (
                            <EmptyMessage>
                                {debouncedSearchValue
                                    ? "검색 결과가 없습니다."
                                    : "표시할 항목이 없습니다."}
                            </EmptyMessage>
                        )}
                    </TreeItemContainer>
                </OverlayScrollbar>
            </TreeContainer>
        </div>
    );
};
