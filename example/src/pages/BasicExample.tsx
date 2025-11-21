import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import styled from "styled-components";
import { sampleData } from "../data/sampleData";

const Container = styled.div`
    h2 {
        margin-bottom: 1.5rem;
        color: #333;
    }

    .description {
        margin-bottom: 2rem;
        color: #666;
        line-height: 1.6;
    }

    .controls {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;

            input[type="checkbox"] {
                cursor: pointer;
            }
        }
    }

    .selected-items {
        margin-top: 2rem;
        padding: 1rem;
        background-color: #f9f9f9;
        border-radius: 4px;

        h3 {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }

        ul {
            list-style: none;
            padding: 0;

            li {
                padding: 0.25rem 0;
            }
        }
    }
`;

function BasicExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showSearch, setShowSearch] = useState(true);
    const [showSelection, setShowSelection] = useState(false);
    const [showHover, setShowHover] = useState(true);
    const [checkbox, setCheckbox] = useState(true);
    const [multiSelect, setMultiSelect] = useState(true);
    const [selectable, setSelectable] = useState(true);
    const [collapsible, setCollapsible] = useState(true);
    const [defaultExpanded, setDefaultExpanded] = useState(true);
    const [itemSpacing, setItemSpacing] = useState(2);
    const [indentSize, setIndentSize] = useState(20);
    const [showEndIcon, setShowEndIcon] = useState(false);
    const [showEndIconOnHover, setShowEndIconOnHover] = useState(false);
    const [showTreeLines, setShowTreeLines] = useState(false);
    const [selectionMode, setSelectionMode] = useState<
        "all" | "parent" | "child"
    >("parent");

    // endIcon을 추가한 데이터
    const dataWithIcons = showEndIcon
        ? sampleData.map((item, index) => ({
              ...item,
              endIcon: (
                  <span
                      style={{
                          fontSize: "12px",
                          color: "#999",
                          marginLeft: "8px",
                      }}
                  >
                      ℹ️
                  </span>
              ),
              alwaysShowEndIcon: index === 0, // 첫 번째 항목은 항상 표시
              children: item.children?.map((child, childIndex) => ({
                  ...child,
                  endIcon: (
                      <span
                          style={{
                              fontSize: "12px",
                              color: "#999",
                              marginLeft: "8px",
                          }}
                      >
                          📝
                      </span>
                  ),
                  alwaysShowEndIcon: index === 0 && childIndex === 0, // 첫 번째 항목의 첫 번째 자식도 항상 표시
                  children: child.children?.map((subChild) => ({
                      ...subChild,
                      endIcon: (
                          <button
                              style={{
                                  padding: "2px 8px",
                                  fontSize: "11px",
                                  border: "1px solid #ddd",
                                  borderRadius: "3px",
                                  backgroundColor: "#fff",
                                  cursor: "pointer",
                              }}
                              onClick={(e) => {
                                  e.stopPropagation();
                                  alert(`"${subChild.label}" 버튼 클릭!`);
                              }}
                          >
                              실행
                          </button>
                      ),
                  })),
              })),
          }))
        : sampleData;

    return (
        <Container>
            <h2>Basic Example</h2>
            <p className="description">
                가장 기본적인 TreeView 사용 예제입니다. 아래 옵션을 변경하여
                다양한 설정을 테스트해볼 수 있습니다.
            </p>

            <div className="controls" style={{ userSelect: "none" }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showSearch}
                        onChange={(e) => setShowSearch(e.target.checked)}
                    />
                    검색창 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showSelection}
                        onChange={(e) => setShowSelection(e.target.checked)}
                    />
                    선택 배경색 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showHover}
                        onChange={(e) => setShowHover(e.target.checked)}
                    />
                    호버 배경색 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox}
                        onChange={(e) => setCheckbox(e.target.checked)}
                    />
                    체크박스 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={multiSelect}
                        onChange={(e) => setMultiSelect(e.target.checked)}
                    />
                    다중 선택
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectable}
                        onChange={(e) => setSelectable(e.target.checked)}
                    />
                    선택 가능
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={collapsible}
                        onChange={(e) => setCollapsible(e.target.checked)}
                    />
                    접기/펼치기 가능
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showTreeLines}
                        onChange={(e) => setShowTreeLines(e.target.checked)}
                        disabled={!collapsible}
                    />
                    트리 라인 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={defaultExpanded}
                        onChange={(e) => setDefaultExpanded(e.target.checked)}
                    />
                    기본 확장
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showEndIcon}
                        onChange={(e) => setShowEndIcon(e.target.checked)}
                    />
                    아이콘 표시
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showEndIconOnHover}
                        onChange={(e) =>
                            setShowEndIconOnHover(e.target.checked)
                        }
                        disabled={!showEndIcon}
                    />
                    아이콘 호버 시에만 표시
                </label>
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    셀 간격: {itemSpacing}px
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={itemSpacing}
                        onChange={(e) => setItemSpacing(Number(e.target.value))}
                        style={{ width: "100px" }}
                    />
                </label>
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    들여쓰기: {indentSize}px
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={indentSize}
                        onChange={(e) => setIndentSize(Number(e.target.value))}
                        style={{ width: "100px" }}
                    />
                </label>
                <div style={{ width: "100%", marginTop: "0.5rem" }}>
                    <div style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
                        선택 모드:
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <label>
                            <input
                                type="radio"
                                name="selectionMode"
                                value="parent"
                                checked={selectionMode === "parent"}
                                onChange={(e) =>
                                    setSelectionMode(e.target.value as "parent")
                                }
                            />
                            부모만
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="selectionMode"
                                value="child"
                                checked={selectionMode === "child"}
                                onChange={(e) =>
                                    setSelectionMode(e.target.value as "child")
                                }
                            />
                            자식만
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="selectionMode"
                                value="all"
                                checked={selectionMode === "all"}
                                onChange={(e) =>
                                    setSelectionMode(e.target.value as "all")
                                }
                            />
                            모두
                        </label>
                    </div>
                </div>
            </div>

            <TreeView
                items={dataWithIcons}
                onChange={setSelectedItems}
                showSearch={showSearch}
                showSelection={showSelection}
                showHover={showHover}
                showEndIconOnHover={showEndIconOnHover}
                checkbox={checkbox}
                multiSelect={multiSelect}
                selectable={selectable}
                collapsible={collapsible}
                showTreeLines={showTreeLines}
                defaultExpanded={defaultExpanded}
                selectionMode={selectionMode}
                styles={{
                    maxHeight: "600px",
                    itemSpacing: `${itemSpacing}px`,
                    indentSize: indentSize,
                }}
            />

            <div className="selected-items">
                <h3>선택된 항목 ({selectedItems.length}개)</h3>
                <ul>
                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <li key={index}>• {item}</li>
                        ))
                    ) : (
                        <li>선택된 항목이 없습니다.</li>
                    )}
                </ul>
            </div>
        </Container>
    );
}

export default BasicExample;
