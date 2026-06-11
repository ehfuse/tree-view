import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";
import styled from "styled-components";

/**
 * ResetCheckTest
 *
 * resetTrigger 초기화 이후(특히 검색을 거친 뒤)에도 새 체크가 즉시 반영·유지되는지
 * 검증하는 테스트 페이지. (selectionMode="child" + showSearch + resetTrigger 조합)
 */
const Container = styled.div`
    max-width: 520px;

    h2 {
        margin-bottom: 0.5rem;
        color: #333;
    }

    .description {
        margin-bottom: 1.5rem;
        color: #666;
        line-height: 1.6;
    }

    .toolbar {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        button {
            padding: 8px 14px;
            border: 1px solid #1976d2;
            background: #1976d2;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    .selected {
        margin-top: 1.5rem;
        padding: 1rem;
        background: #f9f9f9;
        border-radius: 4px;
        font-size: 0.9rem;

        pre {
            margin: 0.5rem 0 0;
            white-space: pre-wrap;
        }
    }

    ol {
        color: #555;
        line-height: 1.8;
    }
`;

const items: TreeItem[] = [
    {
        id: "1",
        label: "인건비",
        children: [
            {
                id: "1-1",
                label: "급여",
                parentId: "1",
                children: [
                    { id: "1-1-1", label: "직원급여", parentId: "1-1" },
                    { id: "1-1-2", label: "상여금", parentId: "1-1" },
                ],
            },
            {
                id: "1-2",
                label: "복리후생",
                parentId: "1",
                children: [
                    { id: "1-2-1", label: "복리후생비", parentId: "1-2" },
                    { id: "1-2-2", label: "식대", parentId: "1-2" },
                ],
            },
        ],
    },
    {
        id: "2",
        label: "운영비",
        children: [
            {
                id: "2-1",
                label: "사무용품",
                parentId: "2",
                children: [
                    { id: "2-1-1", label: "소모품비", parentId: "2-1" },
                    { id: "2-1-2", label: "비품구입", parentId: "2-1" },
                ],
            },
        ],
    },
];

function ResetCheckTest() {
    const [selected, setSelected] = useState<string[]>([]);
    const [resetTrigger, setResetTrigger] = useState(0);

    return (
        <Container>
            <h2>Reset + Search 체크 유지 테스트</h2>
            <p className="description">
                resetTrigger 초기화 이후, 그리고 검색어를 바꿔가며 체크해도 매번
                정상적으로 체크 표시되고 onChange로 선택 라벨이 전달되는지
                검증합니다.
            </p>

            <div className="toolbar">
                <button onClick={() => setResetTrigger((v) => v + 1)}>
                    선택 초기화
                </button>
                <span>resetTrigger = {resetTrigger}</span>
            </div>

            <TreeView
                items={items}
                checkbox
                multiSelect
                selectionMode="child"
                showSearch
                defaultExpanded={false}
                resetTrigger={resetTrigger}
                onChange={(labels) => setSelected(labels)}
                styles={{ maxHeight: "400px" }}
            />

            <div className="selected">
                <strong>선택 ({selected.length}개)</strong>
                <pre>{JSON.stringify(selected)}</pre>
            </div>

            <ol>
                <li>검색창에 "복리" 입력 → 복리후생비 체크 (정상 동작 확인)</li>
                <li>"선택 초기화" 클릭 (resetTrigger 증가, 선택 비워짐)</li>
                <li>검색어를 지우고 "급여" 입력</li>
                <li>직원급여 체크 → 체크 표시 + 선택에 반영되면 정상</li>
            </ol>
        </Container>
    );
}

export default ResetCheckTest;
