# 시작하기

`@ehfuse/tree-view`는 React 기반의 강력하고 유연한 트리뷰 컴포넌트입니다.

## 설치

npm을 사용하여 패키지를 설치합니다:

```bash
npm install @ehfuse/tree-view @ehfuse/overlay-scrollbar@1.5.10
```

## 필수 의존성

이 패키지는 다음 라이브러리들을 peer dependencies로 요구합니다:

```json
{
    "react": "^18.0.0",
    "styled-components": "^5.0.0 || ^6.0.0",
    "@ehfuse/overlay-scrollbar": "1.5.10"
}
```

> **참고**: `@ehfuse/overlay-scrollbar`는 tree-view와 함께 자동으로 설치됩니다.

## 빠른 시작

### 1. 기본 트리뷰

가장 간단한 형태의 트리뷰입니다:

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "folder1",
        label: "폴더 1",
        children: [
            { id: "file1", label: "파일 1.txt", parentId: "folder1" },
            { id: "file2", label: "파일 2.txt", parentId: "folder1" },
        ],
    },
    {
        id: "folder2",
        label: "폴더 2",
        children: [{ id: "file3", label: "파일 3.txt", parentId: "folder2" }],
    },
];

function App() {
    return <TreeView items={data} />;
}
```

### 2. 체크박스가 있는 트리뷰

선택 기능이 있는 트리뷰:

```tsx
import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";

function App() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <div>
            <TreeView
                items={data}
                onChange={setSelectedItems}
                checkbox={true}
                multiSelect={true}
            />

            <div>
                <h3>선택된 항목:</h3>
                <ul>
                    {selectedItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
```

### 3. 검색 기능이 있는 트리뷰

실시간 검색이 가능한 트리뷰:

```tsx
function App() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            showSearch={true}
            searchPlaceholder="파일/폴더 검색..."
            checkbox={true}
        />
    );
}
```

### 4. 스타일 커스터마이징

트리뷰의 외관을 커스터마이징:

```tsx
function App() {
    return (
        <TreeView
            items={data}
            styles={{
                backgroundColor: "#f9f9f9",
                selectionColor: "#e3f2fd",
                hoverColor: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                maxHeight: "500px",
                indentSize: 25,
            }}
            showHover={true}
            showSelection={true}
        />
    );
}
```

## 데이터 구조

트리뷰는 `TreeItem[]` 배열을 받습니다. 두 가지 방식으로 데이터를 구성할 수 있습니다:

### 방법 1: children 속성 사용 (권장)

```typescript
const data: TreeItem[] = [
    {
        id: "parent",
        label: "부모",
        children: [
            { id: "child1", label: "자식 1", parentId: "parent" },
            { id: "child2", label: "자식 2", parentId: "parent" },
        ],
    },
];
```

### 방법 2: parentId 기반 평탄화 배열

```typescript
const data: TreeItem[] = [
    { id: "parent", label: "부모" },
    { id: "child1", label: "자식 1", parentId: "parent" },
    { id: "child2", label: "자식 2", parentId: "parent" },
];
```

## 주요 Props

| Prop              | 타입                         | 기본값   | 설명             |
| ----------------- | ---------------------------- | -------- | ---------------- |
| `items`           | `TreeItem[]`                 | **필수** | 트리 데이터      |
| `onChange`        | `(labels: string[]) => void` | -        | 선택 변경 콜백   |
| `checkbox`        | `boolean`                    | `true`   | 체크박스 표시    |
| `multiSelect`     | `boolean`                    | `true`   | 다중 선택 허용   |
| `showSearch`      | `boolean`                    | `true`   | 검색창 표시      |
| `defaultExpanded` | `boolean`                    | `true`   | 기본 확장 상태   |
| `collapsible`     | `boolean`                    | `true`   | 접기/펼치기 가능 |

전체 Props는 [API 문서](./api.md)를 참조하세요.

## 다음 단계

-   [API 문서](./api.md) - 모든 Props와 타입 상세 정보
-   [예제](./examples.md) - 다양한 사용 사례

## 관련 문서

-   [API 문서](./api.md)
-   [예제](./examples.md)
