# @ehfuse/tree-view

React 기반의 커스터마이징 가능한 트리뷰 컴포넌트입니다.

A customizable tree view component for React.

## 특징 / Features

-   ✅ 완전한 TypeScript 지원 / Full TypeScript support
-   🎨 Styled Components 기반 스타일링 / Styled Components based styling
-   📦 체크박스 다중/단일 선택 / Multi/Single selection with checkboxes
-   🔍 실시간 검색 기능 / Real-time search functionality
-   🌳 계층 구조 시각화 / Hierarchical structure visualization
-   ⚡ 가볍고 빠른 성능 / Lightweight and fast performance
-   🎯 접근성 고려 / Accessibility considered
-   🎨 MUI 테마 지원 / MUI theme support

## 설치 / Installation

```bash
npm install @ehfuse/tree-view @ehfuse/overlay-scrollbar@^1.5.16
```

## 기본 사용법 / Basic Usage

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "root",
        label: "Root",
        children: [
            { id: "child1", label: "Child 1", parentId: "root" },
            { id: "child2", label: "Child 2", parentId: "root" },
        ],
    },
];

function App() {
    const [selected, setSelected] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelected}
            checkbox={true}
            multiSelect={true}
            showSearch={true}
            searchSize="medium"
        />
    );
}
```

## 시그니처 / Signature

```typescript
interface TreeViewProps {
    onChange?: (selectedItemLabels: string[]) => void;
    onNodeClick?: (item: TreeItem, event: React.MouseEvent) => void;
    onNodeContextMenu?: (item: TreeItem, event: React.MouseEvent) => void;
    initialSelections?: string[];
    resetTrigger?: number;
    defaultExpanded?: boolean;
    excludeItems?: string[];
    items: TreeItem[];
    showSearch?: boolean;
    searchSize?: "small" | "medium" | "large";
    searchPlaceholder?: string;
    showSelection?: boolean;
    showHover?: boolean;
    showEndIconOnHover?: boolean;
    checkbox?: boolean;
    multiSelect?: boolean;
    selectable?: boolean;
    collapsible?: boolean;
    showTreeLines?: boolean;
    selectionMode?: "all" | "parent" | "child";
    itemStyles?: TreeItemStyles;
    styles?: TreeViewStyles;
    className?: string;
    style?: React.CSSProperties;
    highlightTerm?: string;
    highlightColor?: string;
    toggleCheckOnLabelClick?: boolean;
}

interface TreeItem {
    id: string;
    label: string;
    remark?: string;
    parentId?: string;        // 평면 구조: 부모 id 로 계층 구성 / flat: build hierarchy by parent id
    disabled?: boolean;
    styles?: TreeItemStyles;
    children?: TreeItem[];     // 중첩 구조: 자식 배열 / nested: child array
    endIcon?: React.ReactNode;
    alwaysShowEndIcon?: boolean;
    renderLabel?: React.ReactNode;
}
```

> 계층은 중첩(`children`) 또는 평면(`parentId`) 중 하나로 구성합니다. 빈 배열
> `children: []`은 "자식 없음"으로 처리되어 `parentId` 기반 자식 해석으로 폴백하므로,
> 모든 노드에 `children: []`를 붙여 내려주는 평면 데이터도 손자까지 정상 구성됩니다.
>
> Build the hierarchy with either nested `children` or flat `parentId`. An empty
> `children: []` is treated as "no nested children" and falls back to `parentId`
> resolution, so flat data that carries `children: []` on every node still builds
> the full descendant tree.

## 노드 우클릭 / 클릭 콜백 / Node context-menu & click callbacks

노드 행에서 우클릭(또는 클릭) 시 해당 `TreeItem`을 받아 메뉴를 띄울 수 있습니다.
`preventDefault()`는 내부에서 호출하지 않으므로 소비자가 직접 처리합니다.

The node row passes the original `TreeItem` to your handler on context-menu / click.
`preventDefault()` is **not** called internally — handle it yourself.

```tsx
<TreeView
    items={items}
    onNodeContextMenu={(item, e) => {
        e.preventDefault();
        setMenu({ anchorPos: { left: e.clientX, top: e.clientY }, node: item });
    }}
/>
```

`renderLabel`을 지정하면 `label` 텍스트 대신 커스텀 ReactNode가 렌더되어,
콜백 없이도 행에 직접 `onContextMenu`를 붙일 수 있습니다. (지정 시 `highlightTerm` 강조는 미적용)

Set `renderLabel` on a `TreeItem` to render a custom ReactNode instead of the `label`
text, letting you attach `onContextMenu` directly without the callback.

## 문서 / Documentation

### 한국어

-   [시작하기](./docs/ko/getting-started.md)
-   [API 문서](./docs/ko/api.md)
-   [예제](./docs/ko/examples.md)

### English

-   [Getting Started](./docs/en/getting-started.md)
-   [API Documentation](./docs/en/api.md)
-   [Examples](./docs/en/examples.md)

## 라이선스 / License

MIT © 김영진 (ehfuse@gmail.com)
