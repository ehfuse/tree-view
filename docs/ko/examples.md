# 예제

`@ehfuse/tree-view`의 다양한 사용 예제입니다.

## 목차

-   [기본 트리뷰](#기본-트리뷰)
-   [체크박스와 다중 선택](#체크박스와-다중-선택)
-   [검색 기능](#검색-기능)
-   [초기 선택 상태](#초기-선택-상태)
-   [선택 초기화](#선택-초기화)
-   [스타일 커스터마이징](#스타일-커스터마이징)
-   [트리 라인 표시](#트리-라인-표시)
-   [개별 아이템 스타일링](#개별-아이템-스타일링)
-   [endIcon 사용](#endicon-사용)
-   [읽기 전용 트리](#읽기-전용-트리)
-   [선택 모드](#선택-모드)
-   [항목 제외](#항목-제외)
-   [비활성화된 항목](#비활성화된-항목)
-   [대용량 데이터](#대용량-데이터)

---

## 기본 트리뷰

가장 간단한 형태의 트리뷰입니다.

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "documents",
        label: "문서",
        children: [
            { id: "doc1", label: "문서1.txt", parentId: "documents" },
            { id: "doc2", label: "문서2.txt", parentId: "documents" },
        ],
    },
    {
        id: "images",
        label: "이미지",
        children: [
            { id: "img1", label: "사진1.jpg", parentId: "images" },
            { id: "img2", label: "사진2.png", parentId: "images" },
        ],
    },
];

function BasicExample() {
    return <TreeView items={data} />;
}
```

---

## 체크박스와 다중 선택

체크박스로 항목을 선택하고 선택된 항목을 추적합니다.

```tsx
import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";

function CheckboxExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <div>
            <TreeView
                items={data}
                onChange={setSelectedItems}
                checkbox={true}
                multiSelect={true}
            />

            <div style={{ marginTop: "20px" }}>
                <h3>선택된 항목 ({selectedItems.length}개)</h3>
                <ul>
                    {selectedItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
```

**단일 선택 모드:**

```tsx
<TreeView
    items={data}
    onChange={setSelectedItems}
    checkbox={true}
    multiSelect={false} // 단일 선택만 허용
/>
```

---

## 검색 기능

실시간 검색으로 트리 항목을 필터링합니다.

```tsx
function SearchExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            showSearch={true}
            searchPlaceholder="파일이나 폴더를 검색하세요..."
            checkbox={true}
            defaultExpanded={true}
        />
    );
}
```

**참고**: 검색은 300ms 디바운싱이 적용되어 입력이 멈춘 후 검색이 실행됩니다.

---

## 초기 선택 상태

컴포넌트가 마운트될 때 특정 항목을 선택된 상태로 표시합니다.

```tsx
function InitialSelectionExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            initialSelections={["문서1.txt", "사진1.jpg"]} // label로 지정
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

---

## 선택 초기화

버튼 클릭으로 모든 선택을 초기화합니다.

```tsx
function ResetExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [resetCount, setResetCount] = useState(0);

    return (
        <div>
            <button onClick={() => setResetCount((prev) => prev + 1)}>
                선택 초기화
            </button>

            <TreeView
                items={data}
                onChange={setSelectedItems}
                resetTrigger={resetCount}
                checkbox={true}
                multiSelect={true}
            />
        </div>
    );
}
```

---

## 스타일 커스터마이징

트리뷰의 외관을 커스터마이징합니다.

```tsx
function StyledExample() {
    return (
        <TreeView
            items={data}
            styles={{
                backgroundColor: "#f9f9f9",
                selectionColor: "#e3f2fd",
                hoverColor: "#f5f5f5",
                border: "2px solid #1976d2",
                borderRadius: "12px",
                padding: "20px",
                maxHeight: "500px",
                iconColor: "#1976d2",
                checkboxColor: "#4caf50",
                checkboxBorderColor: "#4caf50",
                itemSpacing: "8px",
                indentSize: 30,
            }}
            showHover={true}
            showSelection={true}
        />
    );
}
```

---

## 트리 라인 표시

계층 구조를 시각적으로 표현하는 라인을 추가합니다.

```tsx
function TreeLinesExample() {
    return (
        <TreeView
            items={data}
            showTreeLines={true}
            collapsible={true}
            defaultExpanded={true}
            styles={{
                treeLineColor: "#d1d1d1",
                indentSize: 25,
            }}
        />
    );
}
```

---

## 개별 아이템 스타일링

특정 아이템에만 스타일을 적용합니다.

```tsx
const styledData: TreeItem[] = [
    {
        id: "important",
        label: "중요 문서",
        styles: {
            color: "#d32f2f",
            fontSize: "16px",
            backgroundColor: "#ffebee",
        },
        children: [
            {
                id: "doc1",
                label: "긴급 파일",
                parentId: "important",
                styles: {
                    color: "#f57c00",
                    fontSize: "14px",
                },
            },
        ],
    },
    {
        id: "normal",
        label: "일반 문서",
        children: [{ id: "doc2", label: "일반 파일", parentId: "normal" }],
    },
];

function ItemStyleExample() {
    return (
        <TreeView
            items={styledData}
            itemStyles={{
                // 전체 아이템의 기본 스타일
                color: "#666",
                fontSize: "14px",
            }}
        />
    );
}
```

---

## endIcon 사용

각 아이템 우측에 아이콘이나 버튼을 추가합니다.

```tsx
const dataWithIcons: TreeItem[] = [
    {
        id: "folder1",
        label: "프로젝트",
        endIcon: <span style={{ fontSize: "12px", color: "#999" }}>📁</span>,
        children: [
            {
                id: "file1",
                label: "index.tsx",
                parentId: "folder1",
                endIcon: (
                    <button
                        style={{
                            padding: "2px 8px",
                            fontSize: "11px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            cursor: "pointer",
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("파일 열기!");
                        }}
                    >
                        열기
                    </button>
                ),
            },
        ],
    },
];

function EndIconExample() {
    return (
        <TreeView
            items={dataWithIcons}
            showEndIconOnHover={true} // 호버 시에만 표시
        />
    );
}
```

**항상 표시되는 endIcon:**

```tsx
const data: TreeItem[] = [
    {
        id: "item1",
        label: "항목",
        endIcon: <span>⭐</span>,
        alwaysShowEndIcon: true, // 항상 표시
    },
];
```

---

## 읽기 전용 트리

선택 기능 없이 트리 구조만 표시합니다.

```tsx
function ReadOnlyExample() {
    return (
        <TreeView
            items={data}
            selectable={false} // 선택 불가
            checkbox={false} // 체크박스 숨김
            showSearch={true}
            collapsible={true}
        />
    );
}
```

---

## 선택 모드

선택된 항목을 반환하는 방식을 제어합니다.

### 부모만 반환 (parent)

자식이 모두 선택된 경우 부모만 반환합니다.

```tsx
function ParentModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // 데이터: 폴더 > 파일1, 파일2, 파일3
    // 모든 파일을 선택하면 onChange에서 ['폴더']만 반환

    return (
        <TreeView
            items={data}
            onChange={setSelected}
            selectionMode="parent" // 기본값
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

### 자식만 반환 (child)

부모는 제외하고 자식만 반환합니다.

```tsx
function ChildModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // 폴더를 선택하면 onChange에서 ['파일1', '파일2', '파일3'] 반환

    return (
        <TreeView
            items={data}
            onChange={setSelected}
            selectionMode="child"
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

### 모두 반환 (all)

선택된 모든 항목을 반환합니다.

```tsx
function AllModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // 폴더를 선택하면 onChange에서 ['폴더', '파일1', '파일2', '파일3'] 모두 반환

    return (
        <TreeView
            items={data}
            onChange={setSelected}
            selectionMode="all"
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

---

## 항목 제외

특정 항목을 트리에서 제외합니다.

```tsx
function ExcludeExample() {
    return (
        <TreeView
            items={data}
            excludeItems={["임시 파일", "휴지통"]} // label로 지정
            checkbox={true}
        />
    );
}
```

**참고**: 제외된 항목의 하위 항목도 모두 제외됩니다.

---

## 비활성화된 항목

특정 항목을 선택할 수 없도록 비활성화합니다.

```tsx
const dataWithDisabled: TreeItem[] = [
    {
        id: "folder1",
        label: "읽기 전용 폴더",
        disabled: true, // 비활성화
        children: [
            { id: "file1", label: "파일1", parentId: "folder1" },
            {
                id: "file2",
                label: "파일2",
                parentId: "folder1",
                disabled: true,
            },
        ],
    },
    {
        id: "folder2",
        label: "일반 폴더",
        children: [{ id: "file3", label: "파일3", parentId: "folder2" }],
    },
];

function DisabledExample() {
    return (
        <TreeView items={dataWithDisabled} checkbox={true} multiSelect={true} />
    );
}
```

---

## 대용량 데이터

많은 항목을 효율적으로 처리합니다.

```tsx
const largeData: TreeItem[] = [
    {
        id: "root",
        label: "루트",
        children: Array.from({ length: 100 }, (_, i) => ({
            id: `parent-${i}`,
            label: `카테고리 ${i + 1}`,
            parentId: "root",
            children: Array.from({ length: 50 }, (_, j) => ({
                id: `child-${i}-${j}`,
                label: `항목 ${i + 1}-${j + 1}`,
                parentId: `parent-${i}`,
            })),
        })),
    },
];

function LargeDataExample() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <div>
            <TreeView
                items={largeData}
                onChange={setSelected}
                showSearch={true} // 검색 필수
                defaultExpanded={false} // 초기에는 접힌 상태
                checkbox={true}
                multiSelect={true}
                styles={{
                    maxHeight: "600px", // 스크롤 영역 제한
                }}
            />

            <div>선택된 항목: {selected.length}개</div>
        </div>
    );
}
```

---

## remark 사용

항목에 부가 설명을 추가합니다.

```tsx
const dataWithRemark: TreeItem[] = [
    {
        id: "folder1",
        label: "중요 문서",
        remark: "읽기 전용", // '중요 문서 (읽기 전용)'으로 표시됨
        children: [
            {
                id: "file1",
                label: "계약서",
                parentId: "folder1",
                remark: "2025-01-15", // '계약서 (2025-01-15)'로 표시됨
            },
        ],
    },
];

function RemarkExample() {
    return <TreeView items={dataWithRemark} />;
}
```

---

## 완전한 예제

모든 기능을 사용하는 완전한 예제입니다.

```tsx
import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const fullData: TreeItem[] = [
    {
        id: "projects",
        label: "프로젝트",
        remark: "활성",
        endIcon: <span>📁</span>,
        children: [
            {
                id: "project1",
                label: "웹사이트",
                parentId: "projects",
                styles: {
                    color: "#1976d2",
                    fontSize: "15px",
                },
                children: [
                    {
                        id: "src",
                        label: "src",
                        parentId: "project1",
                        endIcon: <span>📂</span>,
                        children: [
                            {
                                id: "index",
                                label: "index.tsx",
                                parentId: "src",
                                endIcon: (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert("파일 열기");
                                        }}
                                    >
                                        열기
                                    </button>
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "archive",
        label: "보관함",
        disabled: true,
        remark: "읽기 전용",
    },
];

function CompleteExample() {
    const [selected, setSelected] = useState<string[]>([]);
    const [resetCount, setResetCount] = useState(0);

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => setResetCount((prev) => prev + 1)}>
                    선택 초기화
                </button>
            </div>

            <TreeView
                items={fullData}
                onChange={setSelected}
                initialSelections={["index.tsx"]}
                resetTrigger={resetCount}
                showSearch={true}
                searchPlaceholder="파일 검색..."
                showSelection={true}
                showHover={true}
                showEndIconOnHover={true}
                checkbox={true}
                multiSelect={true}
                selectable={true}
                collapsible={true}
                showTreeLines={true}
                defaultExpanded={true}
                selectionMode="parent"
                styles={{
                    backgroundColor: "#fafafa",
                    selectionColor: "#e3f2fd",
                    hoverColor: "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    maxHeight: "500px",
                    checkboxColor: "#1976d2",
                    treeLineColor: "#d1d1d1",
                    indentSize: 25,
                }}
            />

            <div style={{ marginTop: "20px" }}>
                <h3>선택된 항목 ({selected.length}개)</h3>
                <ul>
                    {selected.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
```

---

## 관련 문서

-   [시작하기](./getting-started.md)
-   [API 문서](./api.md)
