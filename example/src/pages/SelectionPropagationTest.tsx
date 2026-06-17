import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";
import styled from "styled-components";

const Container = styled.div`
    h2 {
        margin-bottom: 0.5rem;
        color: #333;
    }
    .description {
        margin-bottom: 1.5rem;
        color: #666;
        line-height: 1.6;
    }
    .grid {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }
    .col {
        flex: 1;
        min-width: 320px;
    }
    .col h3 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }
    .tree-box {
        height: 360px;
        display: flex;
    }
    .out {
        margin-top: 0.75rem;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        white-space: pre-wrap;
        min-height: 2rem;
    }
`;

// 버그 트리거 형태: 평면(parentId) 데이터인데 중간 노드(매출관리/지출관리)에
// children: [] 가 들어있다. 수정 전엔 빈 배열이 truthy 라 손자(L3)가 빌드에서
// 누락되어 렌더/선택이 안 됐고, 수정 후엔 parentId 폴백으로 정상 빌드된다.
const flatWithEmptyChildren: TreeItem[] = [
    { id: "1", label: "회계관리" },
    { id: "2", label: "매출관리", parentId: "1", children: [] },
    { id: "3", label: "지출관리", parentId: "1", children: [] },
    { id: "2-1", label: "매출 조회", parentId: "2" },
    { id: "2-2", label: "매출 입력", parentId: "2" },
    { id: "2-3", label: "매출 수정", parentId: "2" },
    { id: "3-1", label: "지출 조회", parentId: "3" },
    { id: "3-2", label: "지출 입력", parentId: "3" },
];

// 정상 중첩 데이터 (비교용)
const nested: TreeItem[] = [
    {
        id: "1",
        label: "회계관리",
        children: [
            {
                id: "2",
                label: "매출관리",
                children: [
                    { id: "2-1", label: "매출 조회" },
                    { id: "2-2", label: "매출 입력" },
                    { id: "2-3", label: "매출 수정" },
                ],
            },
            {
                id: "3",
                label: "지출관리",
                children: [
                    { id: "3-1", label: "지출 조회" },
                    { id: "3-2", label: "지출 입력" },
                ],
            },
        ],
    },
];

function TreeColumn({ title, items }: { title: string; items: TreeItem[] }) {
    const [selected, setSelected] = useState<string[]>([]);
    return (
        <div className="col">
            <h3>{title}</h3>
            <div className="tree-box">
                <TreeView
                    items={items}
                    onChange={setSelected}
                    defaultExpanded
                    checkbox
                    multiSelect
                    selectionMode="child"
                    showSearch={false}
                />
            </div>
            <div className="out">
                onChange (child, {selected.length}개):{"\n"}
                {selected.join(", ") || "(없음)"}
            </div>
        </div>
    );
}

export default function SelectionPropagationTest() {
    return (
        <Container>
            <h2>Selection Propagation Test (selectionMode="child")</h2>
            <p className="description">
                각 트리 최상위 <b>회계관리</b> 체크박스를 클릭하세요.
                <br />
                기대: 서브트리 전체가 선택되어 <b>회계관리가 완전 체크(V)</b>로 표시되고,
                onChange에 <b>모든 leaf(L3)</b>가 나와야 합니다 (indeterminate 아님).
                <br />
                왼쪽 트리는 중간 노드에 <code>children: []</code>가 들어간{" "}
                <b>버그 트리거 형태</b>입니다 — 이번 수정으로 손자까지 정상 빌드·선택되는지 확인하세요.
            </p>
            <div className="grid">
                <TreeColumn
                    title="① 평면 + 중간 노드 children:[] (버그 트리거)"
                    items={flatWithEmptyChildren}
                />
                <TreeColumn title="② 정상 중첩 (비교용)" items={nested} />
            </div>
        </Container>
    );
}
