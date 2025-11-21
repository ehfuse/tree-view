import { useEffect, useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";
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

    .examples-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .example-box {
        h3 {
            font-size: 1rem;
            margin-bottom: 1rem;
            color: #555;
        }
    }
`;

const styledData: TreeItem[] = [
    {
        id: "1",
        label: "Important",
        styles: { color: "#d32f2f", fontSize: 16 },
        children: [
            {
                id: "1-1",
                label: "Critical Task",
                parentId: "1",
                styles: { color: "#d32f2f" },
            },
            {
                id: "1-2",
                label: "Urgent",
                parentId: "1",
                styles: { color: "#f57c00" },
            },
        ],
    },
    {
        id: "2",
        label: "Normal Priority",
        styles: { color: "#1976d2" },
        children: [
            { id: "2-1", label: "Task A", parentId: "2" },
            { id: "2-2", label: "Task B", parentId: "2" },
        ],
    },
    {
        id: "3",
        label: "Completed",
        styles: { color: "#388e3c" },
        disabled: true,
    },
];

function CustomStyleExample() {
    const [selected1, setSelected1] = useState<string[]>([]);
    const [selected2, setSelected2] = useState<string[]>([]);
    const [selected3, setSelected3] = useState<string[]>([]);

    useEffect(() => {
        console.log("Selected Items:", selected1, selected2, selected3);
    }, [selected1, selected2, selected3]);

    return (
        <Container>
            <h2>Custom Style Example</h2>
            <p className="description">
                아이템별 커스텀 스타일, 비활성화, 제외 옵션 등을 적용한 고급
                예제입니다. 각 트리 항목에 색상, 폰트 크기 등을 개별적으로
                지정할 수 있습니다.
            </p>

            <div className="examples-grid">
                <div className="example-box">
                    <h3>다크 테마</h3>
                    <TreeView
                        items={sampleData}
                        onChange={setSelected1}
                        checkbox={true}
                        styles={{
                            backgroundColor: "#2c2c2c",
                            selectionColor: "#424242",
                            border: "1px solid #424242",
                            borderRadius: "8px",
                            padding: "1.5rem",
                            iconColor: "#e0e0e0",
                            maxHeight: "500px",
                        }}
                        itemStyles={{
                            color: "#e0e0e0",
                        }}
                    />
                </div>

                <div className="example-box">
                    <h3>컬러풀 테마</h3>
                    <TreeView
                        items={sampleData}
                        onChange={setSelected2}
                        checkbox={true}
                        styles={{
                            backgroundColor: "#fff3e0",
                            selectionColor: "#ffe0b2",
                            border: "2px solid #ff9800",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            maxHeight: "500px",
                        }}
                        itemStyles={{
                            color: "#e65100",
                            fontSize: 14,
                        }}
                    />
                </div>

                <div className="example-box">
                    <h3>개별 아이템 스타일 (우선순위 표시)</h3>
                    <TreeView
                        items={styledData}
                        onChange={setSelected3}
                        checkbox={true}
                        defaultExpanded={true}
                        showSearch={false}
                        styles={{
                            backgroundColor: "#fafafa",
                            selectionColor: "#e8eaf6",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "1.5rem",
                            maxHeight: "500px",
                        }}
                    />
                </div>
            </div>
        </Container>
    );
}

export default CustomStyleExample;
