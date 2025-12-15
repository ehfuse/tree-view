# Examples

Various usage examples for `@ehfuse/tree-view`.

## Table of Contents

-   [Basic Tree View](#basic-tree-view)
-   [Checkboxes and Multi-Select](#checkboxes-and-multi-select)
-   [Search Functionality](#search-functionality)
-   [Initial Selection State](#initial-selection-state)
-   [Reset Selection](#reset-selection)
-   [Style Customization](#style-customization)
-   [Tree Lines](#tree-lines)
-   [Individual Item Styling](#individual-item-styling)
-   [Using endIcon](#using-endicon)
-   [Read-Only Tree](#read-only-tree)
-   [Selection Modes](#selection-modes)
-   [Excluding Items](#excluding-items)
-   [Disabled Items](#disabled-items)
-   [Large Data Sets](#large-data-sets)

---

## Basic Tree View

The simplest form of tree view.

```tsx
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const data: TreeItem[] = [
    {
        id: "documents",
        label: "Documents",
        children: [
            { id: "doc1", label: "Document1.txt", parentId: "documents" },
            { id: "doc2", label: "Document2.txt", parentId: "documents" },
        ],
    },
    {
        id: "images",
        label: "Images",
        children: [
            { id: "img1", label: "Photo1.jpg", parentId: "images" },
            { id: "img2", label: "Photo2.png", parentId: "images" },
        ],
    },
];

function BasicExample() {
    return <TreeView items={data} />;
}
```

---

## Checkboxes and Multi-Select

Select items with checkboxes and track selected items.

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
                <h3>Selected Items ({selectedItems.length})</h3>
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

**Single Selection Mode:**

```tsx
<TreeView
    items={data}
    onChange={setSelectedItems}
    checkbox={true}
    multiSelect={false} // Single selection only
/>
```

---

## Search Functionality

Filter tree items with real-time search.

```tsx
function SearchExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            showSearch={true}
            searchPlaceholder="Search files or folders..."
            checkbox={true}
            defaultExpanded={true}
        />
    );
}
```

**Note**: Search has 300ms debouncing, so the search executes after input stops.

---

## Initial Selection State

Display specific items as selected when the component mounts.

```tsx
function InitialSelectionExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    return (
        <TreeView
            items={data}
            onChange={setSelectedItems}
            initialSelections={["Document1.txt", "Photo1.jpg"]} // Specify by label
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

---

## Reset Selection

Clear all selections with a button click.

```tsx
function ResetExample() {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [resetCount, setResetCount] = useState(0);

    return (
        <div>
            <button onClick={() => setResetCount((prev) => prev + 1)}>
                Clear Selection
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

## Style Customization

Customize the appearance of the tree view.

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

## Tree Lines

Add lines to visually represent the hierarchical structure.

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

## Individual Item Styling

Apply styles to specific items only.

```tsx
const styledData: TreeItem[] = [
    {
        id: "important",
        label: "Important Documents",
        styles: {
            color: "#d32f2f",
            fontSize: "16px",
            backgroundColor: "#ffebee",
        },
        children: [
            {
                id: "doc1",
                label: "Urgent File",
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
        label: "Normal Documents",
        children: [{ id: "doc2", label: "Regular File", parentId: "normal" }],
    },
];

function ItemStyleExample() {
    return (
        <TreeView
            items={styledData}
            itemStyles={{
                // Default styles for all items
                color: "#666",
                fontSize: "14px",
            }}
        />
    );
}
```

---

## Using endIcon

Add icons or buttons to the right of each item.

```tsx
const dataWithIcons: TreeItem[] = [
    {
        id: "folder1",
        label: "Project",
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
                            alert("Open file!");
                        }}
                    >
                        Open
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
            showEndIconOnHover={true} // Show only on hover
        />
    );
}
```

**Always visible endIcon:**

```tsx
const data: TreeItem[] = [
    {
        id: "item1",
        label: "Item",
        endIcon: <span>⭐</span>,
        alwaysShowEndIcon: true, // Always visible
    },
];
```

---

## Read-Only Tree

Display tree structure without selection functionality.

```tsx
function ReadOnlyExample() {
    return (
        <TreeView
            items={data}
            selectable={false} // No selection
            checkbox={false} // Hide checkboxes
            showSearch={true}
            collapsible={true}
        />
    );
}
```

---

## Selection Modes

Control how selected items are returned.

### Return Parent Only (parent)

Returns only parent when all children are selected.

```tsx
function ParentModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // Data: Folder > File1, File2, File3
    // When all files are selected, onChange returns ['Folder'] only

    return (
        <TreeView
            items={data}
            onChange={setSelected}
            selectionMode="parent" // Default
            checkbox={true}
            multiSelect={true}
        />
    );
}
```

### Return Children Only (child)

Returns only children, excluding parent.

```tsx
function ChildModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // When folder is selected, onChange returns ['File1', 'File2', 'File3']

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

### Return All (all)

Returns all selected items.

```tsx
function AllModeExample() {
    const [selected, setSelected] = useState<string[]>([]);

    // When folder is selected, onChange returns ['Folder', 'File1', 'File2', 'File3']

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

## Excluding Items

Exclude specific items from the tree.

```tsx
function ExcludeExample() {
    return (
        <TreeView
            items={data}
            excludeItems={["Temp Files", "Trash"]} // Specify by label
            checkbox={true}
        />
    );
}
```

**Note**: Child items of excluded items are also excluded.

---

## Disabled Items

Make specific items unselectable.

```tsx
const dataWithDisabled: TreeItem[] = [
    {
        id: "folder1",
        label: "Read-Only Folder",
        disabled: true, // Disabled
        children: [
            { id: "file1", label: "File1", parentId: "folder1" },
            {
                id: "file2",
                label: "File2",
                parentId: "folder1",
                disabled: true,
            },
        ],
    },
    {
        id: "folder2",
        label: "Normal Folder",
        children: [{ id: "file3", label: "File3", parentId: "folder2" }],
    },
];

function DisabledExample() {
    return (
        <TreeView items={dataWithDisabled} checkbox={true} multiSelect={true} />
    );
}
```

---

## Large Data Sets

Efficiently handle many items.

```tsx
const largeData: TreeItem[] = [
    {
        id: "root",
        label: "Root",
        children: Array.from({ length: 100 }, (_, i) => ({
            id: `parent-${i}`,
            label: `Category ${i + 1}`,
            parentId: "root",
            children: Array.from({ length: 50 }, (_, j) => ({
                id: `child-${i}-${j}`,
                label: `Item ${i + 1}-${j + 1}`,
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
                showSearch={true} // Search is essential
                defaultExpanded={false} // Start collapsed
                checkbox={true}
                multiSelect={true}
                styles={{
                    maxHeight: "600px", // Limit scroll area
                }}
            />

            <div>Selected items: {selected.length}</div>
        </div>
    );
}
```

---

## Using remark

Add additional descriptions to items.

```tsx
const dataWithRemark: TreeItem[] = [
    {
        id: "folder1",
        label: "Important Documents",
        remark: "read-only", // Displays as 'Important Documents (read-only)'
        children: [
            {
                id: "file1",
                label: "Contract",
                parentId: "folder1",
                remark: "2025-01-15", // Displays as 'Contract (2025-01-15)'
            },
        ],
    },
];

function RemarkExample() {
    return <TreeView items={dataWithRemark} />;
}
```

---

## Complete Example

A complete example using all features.

```tsx
import { useState } from "react";
import { TreeView } from "@ehfuse/tree-view";
import type { TreeItem } from "@ehfuse/tree-view";

const fullData: TreeItem[] = [
    {
        id: "projects",
        label: "Projects",
        remark: "active",
        endIcon: <span>📁</span>,
        children: [
            {
                id: "project1",
                label: "Website",
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
                                            alert("Open file");
                                        }}
                                    >
                                        Open
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
        label: "Archive",
        disabled: true,
        remark: "read-only",
    },
];

function CompleteExample() {
    const [selected, setSelected] = useState<string[]>([]);
    const [resetCount, setResetCount] = useState(0);

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => setResetCount((prev) => prev + 1)}>
                    Clear Selection
                </button>
            </div>

            <TreeView
                items={fullData}
                onChange={setSelected}
                initialSelections={["index.tsx"]}
                resetTrigger={resetCount}
                showSearch={true}
                searchPlaceholder="Search files..."
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
                <h3>Selected Items ({selected.length})</h3>
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

## Related Documentation

-   [Getting Started](./getting-started.md)
-   [API Documentation](./api.md)
