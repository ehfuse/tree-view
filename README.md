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
}

interface TreeItem {
    id: string;
    label: string;
    remark?: string;
    parentId?: string;
    disabled?: boolean;
    styles?: TreeItemStyles;
    children?: TreeItem[];
    endIcon?: React.ReactNode;
    alwaysShowEndIcon?: boolean;
}
```

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
