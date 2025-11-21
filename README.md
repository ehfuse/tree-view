# @ehfuse/tree-view

React 기반의 커스터마이징 가능한 트리뷰 컴포넌트입니다.

## 특징

-   ✅ 완전한 TypeScript 지원
-   🎨 Styled Components 기반 스타일링
-   📦 체크박스 다중/단일 선택
-   🔍 실시간 검색 기능
-   🌳 계층 구조 시각화
-   ⚡ 가볍고 빠른 성능
-   🎯 접근성 고려

## 설치

```bash
npm install @ehfuse/tree-view @ehfuse/overlay-scrollbar@1.5.10
```

## 기본 사용법

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "root",
        label: "루트",
        children: [
            { id: "child1", label: "자식 1", parentId: "root" },
            { id: "child2", label: "자식 2", parentId: "root" },
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
        />
    );
}
```

## 시그니처

```typescript
interface TreeViewProps {
    onChange?: (selectedItemLabels: string[]) => void;
    initialSelections?: string[];
    resetTrigger?: number;
    defaultExpanded?: boolean;
    excludeItems?: string[];
    items: TreeItem[];
    showSearch?: boolean;
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

## 문서

-   [시작하기](./docs/ko/getting-started.md)
-   [API 문서](./docs/ko/api.md)
-   [예제](./docs/ko/examples.md)

## 라이선스

MIT © 김영진 (ehfuse@gmail.com)
