# Getting Started

`@ehfuse/tree-view` is a powerful and flexible tree view component for React.

## Installation

Install the package using npm:

```bash
npm install @ehfuse/tree-view @ehfuse/overlay-scrollbar@^1.5.16
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
    "react": "^18.0.0",
    "styled-components": "^5.0.0 || ^6.0.0",
    "@ehfuse/overlay-scrollbar": "^1.5.16"
}
```

> **Note**: `@ehfuse/overlay-scrollbar` is automatically installed with tree-view.

## Quick Start

### 1. Basic Tree View

The simplest form of tree view:

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "folder1",
        label: "Folder 1",
        children: [
            { id: "file1", label: "File 1.txt", parentId: "folder1" },
            { id: "file2", label: "File 2.txt", parentId: "folder1" },
        ],
    },
    {
        id: "folder2",
        label: "Folder 2",
        children: [{ id: "file3", label: "File 3.txt", parentId: "folder2" }],
    },
];

function App() {
    return <TreeView items={data} />;
}
```

### 2. Tree View with Checkboxes

Tree view with selection functionality:

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
                <h3>Selected Items:</h3>
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

### 3. Tree View with Search

Tree view with real-time search:

```tsx
function App() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            showSearch={true}
            searchPlaceholder="Search files/folders..."
            checkbox={true}
        />
    );
}
```

### 4. Style Customization

Customize the appearance of the tree view:

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

## Data Structure

The tree view accepts a `TreeItem[]` array. You can structure your data in two ways:

### Method 1: Using children property (Recommended)

```typescript
const data: TreeItem[] = [
    {
        id: "parent",
        label: "Parent",
        children: [
            { id: "child1", label: "Child 1", parentId: "parent" },
            { id: "child2", label: "Child 2", parentId: "parent" },
        ],
    },
];
```

### Method 2: Flat array with parentId

```typescript
const data: TreeItem[] = [
    { id: "parent", label: "Parent" },
    { id: "child1", label: "Child 1", parentId: "parent" },
    { id: "child2", label: "Child 2", parentId: "parent" },
];
```

## Main Props

| Prop              | Type                         | Default      | Description               |
| ----------------- | ---------------------------- | ------------ | ------------------------- |
| `items`           | `TreeItem[]`                 | **Required** | Tree data                 |
| `onChange`        | `(labels: string[]) => void` | -            | Selection change callback |
| `checkbox`        | `boolean`                    | `true`       | Show checkboxes           |
| `multiSelect`     | `boolean`                    | `true`       | Allow multiple selection  |
| `showSearch`      | `boolean`                    | `true`       | Show search input         |
| `defaultExpanded` | `boolean`                    | `true`       | Initial expanded state    |
| `collapsible`     | `boolean`                    | `true`       | Allow collapse/expand     |

For all props, see the [API Documentation](./api.md).

## Next Steps

-   [API Documentation](./api.md) - All props and type details
-   [Examples](./examples.md) - Various use cases

## Related Documentation

-   [API Documentation](./api.md)
-   [Examples](./examples.md)
