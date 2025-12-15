# API 문서

`@ehfuse/tree-view` 컴포넌트의 전체 API 레퍼런스입니다.

## 목차

-   [TreeViewProps](#treeviewprops)
-   [TreeItem](#treeitem)
-   [TreeViewStyles](#treeviewstyles)
-   [TreeItemStyles](#treeitemstyles)
-   [Props 상세](#props-상세)
    -   [기본 Props](#기본-props)
    -   [선택 관련 Props](#선택-관련-props)
    -   [UI 관련 Props](#ui-관련-props)
    -   [스타일 Props](#스타일-props)

## Props 요약표

| Prop                                      | 타입                             | 기본값                  | 필수 | 설명                        |
| ----------------------------------------- | -------------------------------- | ----------------------- | ---- | --------------------------- |
| [`items`](#items)                         | `TreeItem[]`                     | -                       | ✅   | 트리 데이터 배열            |
| [`onChange`](#onchange)                   | `(labels: string[]) => void`     | -                       | ❌   | 선택 변경 콜백              |
| [`initialSelections`](#initialselections) | `string[]`                       | `[]`                    | ❌   | 초기 선택 항목 (label 배열) |
| [`resetTrigger`](#resettrigger)           | `number`                         | -                       | ❌   | 선택 초기화 트리거          |
| [`defaultExpanded`](#defaultexpanded)     | `boolean`                        | `true`                  | ❌   | 초기 확장 상태              |
| [`excludeItems`](#excludeitems)           | `string[]`                       | `[]`                    | ❌   | 제외할 항목 (label 배열)    |
| [`showSearch`](#showsearch)               | `boolean`                        | `true`                  | ❌   | 검색창 표시 여부            |
| [`searchSize`](#searchsize)               | `"small" \| "medium" \| "large"` | `"medium"`              | ❌   | 검색창 크기 (MUI 기준)      |
| [`searchPlaceholder`](#searchplaceholder) | `string`                         | `"검색어를 입력하세요"` | ❌   | 검색창 placeholder          |
| [`showSelection`](#showselection)         | `boolean`                        | `false`                 | ❌   | 선택 배경색 표시            |
| [`showHover`](#showhover)                 | `boolean`                        | `true`                  | ❌   | 호버 배경색 표시            |
| [`showEndIconOnHover`](#showendiconhover) | `boolean`                        | `false`                 | ❌   | endIcon 호버 시에만 표시    |
| [`checkbox`](#checkbox)                   | `boolean`                        | `true`                  | ❌   | 체크박스 표시 여부          |
| [`multiSelect`](#multiselect)             | `boolean`                        | `true`                  | ❌   | 다중 선택 허용              |
| [`selectable`](#selectable)               | `boolean`                        | `true`                  | ❌   | 선택 가능 여부              |
| [`collapsible`](#collapsible)             | `boolean`                        | `true`                  | ❌   | 접기/펼치기 가능            |
| [`showTreeLines`](#showtreelines)         | `boolean`                        | `false`                 | ❌   | 트리 라인 표시              |
| [`selectionMode`](#selectionmode)         | `"all" \| "parent" \| "child"`   | `"parent"`              | ❌   | 선택 항목 반환 방식         |
| [`itemStyles`](#itemstyles)               | `TreeItemStyles`                 | -                       | ❌   | 전체 아이템 기본 스타일     |
| [`styles`](#styles)                       | `TreeViewStyles`                 | -                       | ❌   | 컨테이너 스타일             |
| [`className`](#classname)                 | `string`                         | -                       | ❌   | CSS 클래스명                |
| [`style`](#style)                         | `React.CSSProperties`            | -                       | ❌   | 인라인 스타일               |

---

## TreeViewProps

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
```

## TreeItem

```typescript
interface TreeItem {
    id: string; // 고유 식별자 (필수)
    label: string; // 표시될 텍스트 (필수)
    remark?: string; // 부가 설명 (label 뒤 괄호로 표시)
    parentId?: string; // 부모 아이템 ID
    disabled?: boolean; // 비활성화 여부
    styles?: TreeItemStyles; // 개별 스타일
    children?: TreeItem[]; // 자식 아이템 배열
    endIcon?: React.ReactNode; // 우측 끝 아이콘
    alwaysShowEndIcon?: boolean; // endIcon 항상 표시
}
```

## TreeViewStyles

```typescript
interface TreeViewStyles {
    backgroundColor?: string; // 배경색
    selectionColor?: string; // 선택 배경색
    hoverColor?: string; // 호버 배경색
    border?: string; // 테두리
    borderRadius?: string; // 테두리 둥글기
    padding?: string; // 안쪽 여백
    iconColor?: string; // 아이콘 색상
    maxHeight?: string | number; // 최대 높이 (number 입력 시 px 단위)
    checkboxColor?: string; // 체크박스 색상
    checkboxBorderColor?: string; // 체크박스 테두리 색상
    checkboxSpacing?: string; // 체크박스 간격
    itemSpacing?: string; // 아이템 간격
    searchInputHeight?: string; // 검색창 높이
    searchInputFontSize?: string; // 검색창 폰트 크기
    treeLineColor?: string; // 트리 라인 색상
    indentSize?: number; // 들여쓰기 크기 (px)
}
```

## TreeItemStyles

```typescript
interface TreeItemStyles {
    color?: string; // 텍스트 색상
    fontSize?: string | number; // 폰트 크기
    backgroundColor?: string; // 배경색
}
```

---

## Props 상세

### 기본 Props

#### items

-   **타입**: `TreeItem[]`
-   **필수**: ✅
-   **설명**: 트리에 표시할 데이터 배열입니다.

```tsx
const items: TreeItem[] = [
    {
        id: "root",
        label: "루트",
        children: [{ id: "child", label: "자식", parentId: "root" }],
    },
];

<TreeView items={items} />;
```

#### onChange

-   **타입**: `(selectedItemLabels: string[]) => void`
-   **기본값**: `undefined`
-   **설명**: 선택이 변경될 때 호출되는 콜백 함수입니다. 선택된 항목의 **label** 배열을 인자로 받습니다.

```tsx
<TreeView
    items={items}
    onChange={(labels) => {
        console.log("선택된 항목:", labels);
    }}
/>
```

#### initialSelections

-   **타입**: `string[]`
-   **기본값**: `[]`
-   **설명**: 초기 선택 상태를 설정합니다. **label** 배열로 지정합니다.

```tsx
<TreeView items={items} initialSelections={["자식 1", "자식 2"]} />
```

#### resetTrigger

-   **타입**: `number`
-   **기본값**: `undefined`
-   **설명**: 이 값이 변경되면 모든 선택이 초기화됩니다.

```tsx
const [resetCount, setResetCount] = useState(0);

<TreeView
  items={items}
  resetTrigger={resetCount}
/>
<button onClick={() => setResetCount(prev => prev + 1)}>
  선택 초기화
</button>
```

#### defaultExpanded

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 트리의 초기 확장 상태를 설정합니다.

```tsx
// 모든 노드가 펼쳐진 상태로 시작
<TreeView items={items} defaultExpanded={true} />

// 모든 노드가 접힌 상태로 시작
<TreeView items={items} defaultExpanded={false} />
```

#### excludeItems

-   **타입**: `string[]`
-   **기본값**: `[]`
-   **설명**: 트리에서 제외할 항목을 **label** 배열로 지정합니다. 해당 항목과 그 하위 항목이 모두 제외됩니다.

```tsx
<TreeView items={items} excludeItems={["임시 폴더", "삭제된 항목"]} />
```

### 선택 관련 Props

#### checkbox

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 체크박스 표시 여부를 설정합니다.

```tsx
// 체크박스 표시
<TreeView items={items} checkbox={true} />

// 체크박스 숨김
<TreeView items={items} checkbox={false} />
```

#### multiSelect

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 다중 선택 허용 여부를 설정합니다.

```tsx
// 다중 선택 가능
<TreeView items={items} multiSelect={true} />

// 단일 선택만 가능
<TreeView items={items} multiSelect={false} />
```

#### selectable

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 선택 가능 여부를 설정합니다. `false`로 설정하면 읽기 전용 트리가 됩니다.

```tsx
// 선택 가능
<TreeView items={items} selectable={true} />

// 읽기 전용
<TreeView items={items} selectable={false} />
```

#### selectionMode

-   **타입**: `"all" | "parent" | "child"`
-   **기본값**: `"parent"`
-   **설명**: `onChange` 콜백에서 반환할 항목을 결정합니다.
    -   `"all"`: 모든 선택된 항목 반환
    -   `"parent"`: 자식이 모두 선택된 경우 부모만 반환 (자식 제외)
    -   `"child"`: 자식만 반환 (부모 제외)

```tsx
// 부모만 반환 (권장)
<TreeView items={items} selectionMode="parent" />

// 모두 반환
<TreeView items={items} selectionMode="all" />

// 자식만 반환
<TreeView items={items} selectionMode="child" />
```

### UI 관련 Props

#### showSearch

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 검색창 표시 여부를 설정합니다. 검색은 300ms 디바운싱이 적용됩니다.

```tsx
<TreeView items={items} showSearch={true} />
```

#### searchSize

-   **타입**: `"small" | "medium" | "large"`
-   **기본값**: `"medium"`
-   **설명**: 검색창의 크기를 설정합니다. MUI TextField 기준으로 설계되었습니다.

| Size   | 높이 | 폰트 크기 |
| ------ | ---- | --------- |
| small  | 40px | 14px      |
| medium | 56px | 16px      |
| large  | 64px | 18px      |

```tsx
// 작은 검색창
<TreeView items={items} searchSize="small" />

// 기본 크기
<TreeView items={items} searchSize="medium" />

// 큰 검색창
<TreeView items={items} searchSize="large" />
```

#### searchPlaceholder

-   **타입**: `string`
-   **기본값**: `"검색어를 입력하세요"`
-   **설명**: 검색창의 placeholder 텍스트를 설정합니다.

```tsx
<TreeView
    items={items}
    showSearch={true}
    searchPlaceholder="파일 또는 폴더 검색..."
/>
```

#### showSelection

-   **타입**: `boolean`
-   **기본값**: `false`
-   **설명**: 선택된 항목에 배경색을 표시할지 설정합니다.

```tsx
<TreeView items={items} showSelection={true} />
```

#### showHover

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 마우스 호버 시 배경색을 표시할지 설정합니다.

```tsx
<TreeView items={items} showHover={true} />
```

#### showEndIconOnHover

-   **타입**: `boolean`
-   **기본값**: `false`
-   **설명**: `endIcon`을 호버 시에만 표시할지 설정합니다. 개별 아이템의 `alwaysShowEndIcon` 속성이 우선합니다.

```tsx
<TreeView items={items} showEndIconOnHover={true} />
```

#### collapsible

-   **타입**: `boolean`
-   **기본값**: `true`
-   **설명**: 접기/펼치기 가능 여부를 설정합니다. `false`로 설정하면 모든 노드가 항상 펼쳐진 상태로 유지됩니다.

```tsx
// 접기/펼치기 가능
<TreeView items={items} collapsible={true} />

// 항상 펼쳐진 상태
<TreeView items={items} collapsible={false} />
```

#### showTreeLines

-   **타입**: `boolean`
-   **기본값**: `false`
-   **설명**: 트리 구조를 시각화하는 라인을 표시할지 설정합니다.

```tsx
<TreeView items={items} showTreeLines={true} />
```

### 스타일 Props

#### itemStyles

-   **타입**: `TreeItemStyles`
-   **기본값**: `undefined`
-   **설명**: 모든 트리 아이템에 적용될 기본 스타일을 설정합니다. 개별 아이템의 `styles` 속성이 우선합니다.

```tsx
<TreeView
    items={items}
    itemStyles={{
        color: "#333",
        fontSize: "14px",
    }}
/>
```

#### styles

-   **타입**: `TreeViewStyles`
-   **기본값**: 기본 스타일 적용
-   **설명**: 트리뷰 컨테이너의 스타일을 설정합니다.

```tsx
<TreeView
    items={items}
    styles={{
        backgroundColor: "#ffffff",
        selectionColor: "#e3f2fd",
        hoverColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        maxHeight: "600px",
        iconColor: "#666",
        checkboxColor: "#1976d2",
        checkboxBorderColor: "#999",
        checkboxSpacing: "10px",
        itemSpacing: "4px",
        searchInputHeight: "40px",
        searchInputFontSize: "16px",
        treeLineColor: "#ddd",
        indentSize: 20,
    }}
/>
```

**스타일 속성 상세:**

| 속성                  | 타입     | 기본값             | 설명                     |
| --------------------- | -------- | ------------------ | ------------------------ |
| `backgroundColor`     | `string` | `"#ffffff"`        | 배경색                   |
| `selectionColor`      | `string` | `"#e3f2fd"`        | 선택된 항목 배경색       |
| `hoverColor`          | `string` | `"#f5f5f5"`        | 호버 배경색              |
| `border`              | `string` | `"1px solid #ddd"` | 테두리                   |
| `borderRadius`        | `string` | `"4px"`            | 테두리 둥글기            |
| `padding`             | `string` | `"1rem"`           | 안쪽 여백                |
| `iconColor`           | `string` | `inherit`          | 확장/축소 아이콘 색상    |
| `maxHeight`           | `string` | `"none"`           | 트리 영역 최대 높이      |
| `checkboxColor`       | `string` | `"#1976d2"`        | 체크박스 배경색 (체크됨) |
| `checkboxBorderColor` | `string` | `"#999"`           | 체크박스 테두리 색상     |
| `checkboxSpacing`     | `string` | `"10px"`           | 체크박스와 텍스트 간격   |
| `itemSpacing`         | `string` | `"2px"`            | 아이템 간 간격           |
| `searchInputHeight`   | `string` | `"40px"`           | 검색창 높이              |
| `searchInputFontSize` | `string` | `"16px"`           | 검색창 폰트 크기         |
| `treeLineColor`       | `string` | `"#d1d1d1"`        | 트리 라인 색상           |
| `indentSize`          | `number` | `20`               | 들여쓰기 크기 (px)       |

#### className

-   **타입**: `string`
-   **기본값**: `undefined`
-   **설명**: 최상위 컨테이너에 적용할 CSS 클래스명입니다.

```tsx
<TreeView items={items} className="my-tree" />
```

#### style

-   **타입**: `React.CSSProperties`
-   **기본값**: `undefined`
-   **설명**: 최상위 컨테이너에 적용할 인라인 스타일입니다.

```tsx
<TreeView
    items={items}
    style={{
        width: "100%",
        minHeight: "400px",
    }}
/>
```

---

## 관련 문서

-   [시작하기](./getting-started.md)
-   [예제](./examples.md)
