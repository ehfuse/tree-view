import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";
import styled from "styled-components";
import { sampleData } from "../data/sampleData";
import { NodeContextMenu } from "../components/NodeContextMenu";

const Container = styled.div`
    h2 {
        margin-bottom: 1rem;
        color: #333;
    }

    .description {
        margin-bottom: 1.5rem;
        color: #666;
        line-height: 1.6;
    }

    .log {
        margin-top: 1rem;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: 4px;
        font-family: monospace;
        font-size: 13px;
        min-height: 1.5rem;
    }

    /* 요청 3 검증: 높이를 제한해 전체 펼침 시 스크롤이 생기는지 확인 */
    .tree-box {
        height: 320px;
        display: flex;
    }
`;

interface MenuState {
    left: number;
    top: number;
    node: TreeItem;
}

export default function ContextMenuTest() {
    const [menu, setMenu] = useState<MenuState | null>(null);
    const [log, setLog] = useState("우클릭 / 클릭 / renderLabel 동작을 확인하세요.");

    // 요청 2 검증: 첫 루트에 커스텀 renderLabel을 주입 (콜백 없이도 onContextMenu 부착 가능)
    const items: TreeItem[] = sampleData.map((root, i) =>
        i === 0
            ? {
                  ...root,
                  renderLabel: (
                      <span
                          style={{ fontWeight: 700, color: "#c0392b" }}
                          onContextMenu={(e) => {
                              e.preventDefault();
                              setLog(`renderLabel 직접 onContextMenu: ${root.id}`);
                          }}
                      >
                          ★ {root.label} (renderLabel)
                      </span>
                  ),
              }
            : root
    );

    return (
        <Container>
            <h2>Context Menu / renderLabel / flex Test</h2>
            <p className="description">
                · 노드 행 <b>우클릭</b> → props로 구성한 커스텀 메뉴(요청 1)
                <br />· 첫 번째 루트는 <b>renderLabel</b>로 렌더(요청 2)
                <br />· 트리 높이 320px 제한 → 전체 펼침 시 <b>스크롤</b>(요청 3)
            </p>

            <div className="tree-box">
                <TreeView
                    items={items}
                    checkbox={false}
                    defaultExpanded
                    onNodeClick={(item) => setLog(`onNodeClick: ${item.id} / ${item.label}`)}
                    onNodeContextMenu={(item, e) => {
                        e.preventDefault();
                        setMenu({ left: e.clientX, top: e.clientY, node: item });
                        setLog(`onNodeContextMenu: ${item.id} / ${item.label}`);
                    }}
                />
            </div>

            <div className="log">{log}</div>

            {/* 메뉴 스타일/항목을 전부 props로 제어 — title/items/menuStyle 등 */}
            <NodeContextMenu
                anchorPos={menu ? { left: menu.left, top: menu.top } : null}
                onClose={() => setMenu(null)}
                title={
                    menu && (
                        <>
                            {menu.node.label}{" "}
                            <span style={{ color: "#bbb" }}>#{menu.node.id}</span>
                        </>
                    )
                }
                menuStyle={{ minWidth: 200 }}
                items={
                    menu
                        ? [
                              {
                                  label: "하위 추가",
                                  onClick: () => setLog(`하위 추가: ${menu.node.id}`),
                              },
                              {
                                  label: "수정",
                                  onClick: () => setLog(`수정: ${menu.node.id}`),
                              },
                              {
                                  label: "삭제",
                                  danger: true,
                                  onClick: () => setLog(`삭제: ${menu.node.id}`),
                              },
                          ]
                        : []
                }
            />
        </Container>
    );
}
