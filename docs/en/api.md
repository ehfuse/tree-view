# API Documentation

Complete API reference for the `@ehfuse/tree-view` component.

## Table of Contents

-   [TreeViewProps](#treeviewprops)
-   [TreeItem](#treeitem)
-   [TreeViewStyles](#treeviewstyles)
-   [TreeItemStyles](#treeitemstyles)
-   [Props Details](#props-details)
    -   [Basic Props](#basic-props)
    -   [Selection Props](#selection-props)
    -   [UI Props](#ui-props)
    -   [Style Props](#style-props)

## Props Summary

| Prop                                      | Type                             | Default               | Required | Description                   |
| ----------------------------------------- | -------------------------------- | --------------------- | -------- | ----------------------------- |
| [`items`](#items)                         | `TreeItem[]`                     | -                     | ✅       | Tree data array               |
| [`onChange`](#onchange)                   | `(labels: string[]) => void`     | -                     | ❌       | Selection change callback     |
| [`initialSelections`](#initialselections) | `string[]`                       | `[]`                  | ❌       | Initial selections (labels)   |
| [`resetTrigger`](#resettrigger)           | `number`                         | -                     | ❌       | Selection reset trigger       |
| [`defaultExpanded`](#defaultexpanded)     | `boolean`                        | `true`                | ❌       | Initial expanded state        |
| [`excludeItems`](#excludeitems)           | `string[]`                       | `[]`                  | ❌       | Items to exclude (labels)     |
| [`showSearch`](#showsearch)               | `boolean`                        | `true`                | ❌       | Show search input             |
| [`searchSize`](#searchsize)               | `"small" \| "medium" \| "large"` | `"medium"`            | ❌       | Search input size (MUI-based) |
| [`searchPlaceholder`](#searchplaceholder) | `string`                         | `"Enter search term"` | ❌       | Search placeholder text       |
| [`showSelection`](#showselection)         | `boolean`                        | `false`               | ❌       | Show selection background     |
| [`showHover`](#showhover)                 | `boolean`                        | `true`                | ❌       | Show hover background         |
| [`showEndIconOnHover`](#showendiconhover) | `boolean`                        | `false`               | ❌       | Show endIcon on hover only    |
| [`checkbox`](#checkbox)                   | `boolean`                        | `true`                | ❌       | Show checkboxes               |
| [`multiSelect`](#multiselect)             | `boolean`                        | `true`                | ❌       | Allow multiple selection      |
| [`selectable`](#selectable)               | `boolean`                        | `true`                | ❌       | Allow selection               |
| [`collapsible`](#collapsible)             | `boolean`                        | `true`                | ❌       | Allow collapse/expand         |
| [`showTreeLines`](#showtreelines)         | `boolean`                        | `false`               | ❌       | Show tree lines               |
| [`selectionMode`](#selectionmode)         | `"all" \| "parent" \| "child"`   | `"parent"`            | ❌       | Selection return mode         |
| [`itemStyles`](#itemstyles)               | `TreeItemStyles`                 | -                     | ❌       | Default item styles           |
| [`styles`](#styles)                       | `TreeViewStyles`                 | -                     | ❌       | Container styles              |
| [`className`](#classname)                 | `string`                         | -                     | ❌       | CSS class name                |
| [`style`](#style)                         | `React.CSSProperties`            | -                     | ❌       | Inline styles                 |

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
    id: string; // Unique identifier (required)
    label: string; // Display text (required)
    remark?: string; // Additional description (shown in parentheses after label)
    parentId?: string; // Parent item ID
    disabled?: boolean; // Disabled state
    styles?: TreeItemStyles; // Individual styles
    children?: TreeItem[]; // Child items array
    endIcon?: React.ReactNode; // Right-end icon
    alwaysShowEndIcon?: boolean; // Always show endIcon
}
```

## TreeViewStyles

```typescript
interface TreeViewStyles {
    backgroundColor?: string; // Background color
    selectionColor?: string; // Selection background color
    hoverColor?: string; // Hover background color
    border?: string; // Border
    borderRadius?: string; // Border radius
    padding?: string; // Padding
    iconColor?: string; // Icon color
    maxHeight?: string | number; // Max height (number converts to px)
    checkboxColor?: string; // Checkbox color
    checkboxBorderColor?: string; // Checkbox border color
    checkboxSpacing?: string; // Checkbox spacing
    itemSpacing?: string; // Item spacing
    searchInputHeight?: string; // Search input height
    searchInputFontSize?: string; // Search input font size
    treeLineColor?: string; // Tree line color
    indentSize?: number; // Indent size (px)
}
```

## TreeItemStyles

```typescript
interface TreeItemStyles {
    color?: string; // Text color
    fontSize?: string | number; // Font size
    backgroundColor?: string; // Background color
}
```

---

## Props Details

### Basic Props

#### items

-   **Type**: `TreeItem[]`
-   **Required**: ✅
-   **Description**: Array of data to display in the tree.

```tsx
const items: TreeItem[] = [
    {
        id: "root",
        label: "Root",
        children: [{ id: "child", label: "Child", parentId: "root" }],
    },
];

<TreeView items={items} />;
```

#### onChange

-   **Type**: `(selectedItemLabels: string[]) => void`
-   **Default**: `undefined`
-   **Description**: Callback function called when selection changes. Receives an array of selected item **labels**.

```tsx
<TreeView
    items={items}
    onChange={(labels) => {
        console.log("Selected items:", labels);
    }}
/>
```

#### initialSelections

-   **Type**: `string[]`
-   **Default**: `[]`
-   **Description**: Set initial selection state. Specify as an array of **labels**.

```tsx
<TreeView items={items} initialSelections={["Child 1", "Child 2"]} />
```

#### resetTrigger

-   **Type**: `number`
-   **Default**: `undefined`
-   **Description**: When this value changes, all selections are cleared.

```tsx
const [resetCount, setResetCount] = useState(0);

<TreeView
  items={items}
  resetTrigger={resetCount}
/>
<button onClick={() => setResetCount(prev => prev + 1)}>
  Clear Selection
</button>
```

#### defaultExpanded

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Set the initial expanded state of the tree.

```tsx
// Start with all nodes expanded
<TreeView items={items} defaultExpanded={true} />

// Start with all nodes collapsed
<TreeView items={items} defaultExpanded={false} />
```

#### excludeItems

-   **Type**: `string[]`
-   **Default**: `[]`
-   **Description**: Items to exclude from the tree, specified as an array of **labels**. The item and all its children will be excluded.

```tsx
<TreeView items={items} excludeItems={["Temp Folder", "Deleted Items"]} />
```

### Selection Props

#### checkbox

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether to show checkboxes.

```tsx
// Show checkboxes
<TreeView items={items} checkbox={true} />

// Hide checkboxes
<TreeView items={items} checkbox={false} />
```

#### multiSelect

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether to allow multiple selection.

```tsx
// Allow multiple selection
<TreeView items={items} multiSelect={true} />

// Single selection only
<TreeView items={items} multiSelect={false} />
```

#### selectable

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether selection is allowed. Set to `false` for a read-only tree.

```tsx
// Selectable
<TreeView items={items} selectable={true} />

// Read-only
<TreeView items={items} selectable={false} />
```

#### selectionMode

-   **Type**: `"all" | "parent" | "child"`
-   **Default**: `"parent"`
-   **Description**: Determines which items to return in the `onChange` callback.
    -   `"all"`: Return all selected items
    -   `"parent"`: Return only parent when all children are selected (exclude children)
    -   `"child"`: Return only children (exclude parent)

```tsx
// Return parent only (recommended)
<TreeView items={items} selectionMode="parent" />

// Return all
<TreeView items={items} selectionMode="all" />

// Return children only
<TreeView items={items} selectionMode="child" />
```

### UI Props

#### showSearch

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether to show the search input. Search has 300ms debouncing.

```tsx
<TreeView items={items} showSearch={true} />
```

#### searchSize

-   **Type**: `"small" | "medium" | "large"`
-   **Default**: `"medium"`
-   **Description**: Set the size of the search input. Designed based on MUI TextField.

| Size   | Height | Font Size |
| ------ | ------ | --------- |
| small  | 40px   | 14px      |
| medium | 56px   | 16px      |
| large  | 64px   | 18px      |

```tsx
// Small search input
<TreeView items={items} searchSize="small" />

// Default size
<TreeView items={items} searchSize="medium" />

// Large search input
<TreeView items={items} searchSize="large" />
```

#### searchPlaceholder

-   **Type**: `string`
-   **Default**: `"Enter search term"`
-   **Description**: Set the placeholder text for the search input.

```tsx
<TreeView
    items={items}
    showSearch={true}
    searchPlaceholder="Search files or folders..."
/>
```

#### showSelection

-   **Type**: `boolean`
-   **Default**: `false`
-   **Description**: Whether to show background color for selected items.

```tsx
<TreeView items={items} showSelection={true} />
```

#### showHover

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether to show background color on mouse hover.

```tsx
<TreeView items={items} showHover={true} />
```

#### showEndIconOnHover

-   **Type**: `boolean`
-   **Default**: `false`
-   **Description**: Whether to show `endIcon` only on hover. Individual item's `alwaysShowEndIcon` takes precedence.

```tsx
<TreeView items={items} showEndIconOnHover={true} />
```

#### collapsible

-   **Type**: `boolean`
-   **Default**: `true`
-   **Description**: Whether collapse/expand is allowed. Set to `false` to keep all nodes always expanded.

```tsx
// Allow collapse/expand
<TreeView items={items} collapsible={true} />

// Always expanded
<TreeView items={items} collapsible={false} />
```

#### showTreeLines

-   **Type**: `boolean`
-   **Default**: `false`
-   **Description**: Whether to show lines visualizing the tree structure.

```tsx
<TreeView items={items} showTreeLines={true} />
```

### Style Props

#### itemStyles

-   **Type**: `TreeItemStyles`
-   **Default**: `undefined`
-   **Description**: Default styles to apply to all tree items. Individual item's `styles` takes precedence.

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

-   **Type**: `TreeViewStyles`
-   **Default**: Default styles applied
-   **Description**: Styles for the tree view container.

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

**Style Properties Detail:**

| Property              | Type               | Default            | Description                        |
| --------------------- | ------------------ | ------------------ | ---------------------------------- |
| `backgroundColor`     | `string`           | `"#ffffff"`        | Background color                   |
| `selectionColor`      | `string`           | `"#e3f2fd"`        | Selected item background color     |
| `hoverColor`          | `string`           | `"#f5f5f5"`        | Hover background color             |
| `border`              | `string`           | `"1px solid #ddd"` | Border                             |
| `borderRadius`        | `string`           | `"4px"`            | Border radius                      |
| `padding`             | `string`           | `"1rem"`           | Padding                            |
| `iconColor`           | `string`           | `inherit`          | Expand/collapse icon color         |
| `maxHeight`           | `string \| number` | `"none"`           | Max height (number converts to px) |
| `checkboxColor`       | `string`           | `"#1976d2"`        | Checkbox background (checked)      |
| `checkboxBorderColor` | `string`           | `"#999"`           | Checkbox border color              |
| `checkboxSpacing`     | `string`           | `"10px"`           | Checkbox to text spacing           |
| `itemSpacing`         | `string`           | `"2px"`            | Spacing between items              |
| `searchInputHeight`   | `string`           | `"40px"`           | Search input height                |
| `searchInputFontSize` | `string`           | `"16px"`           | Search input font size             |
| `treeLineColor`       | `string`           | `"#d1d1d1"`        | Tree line color                    |
| `indentSize`          | `number`           | `20`               | Indent size (px)                   |

#### className

-   **Type**: `string`
-   **Default**: `undefined`
-   **Description**: CSS class name to apply to the root container.

```tsx
<TreeView items={items} className="my-tree" />
```

#### style

-   **Type**: `React.CSSProperties`
-   **Default**: `undefined`
-   **Description**: Inline styles to apply to the root container.

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

## MUI Theme Support

The search input focus border color automatically adapts to your MUI theme's primary color when using MUI v5+ CSS variable mode:

```tsx
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    cssVariables: true, // Enable CSS variable mode
    palette: {
        primary: { main: "#your-color" },
    },
});

// The tree view will automatically use your theme's primary color
<ThemeProvider theme={theme}>
    <TreeView items={items} />
</ThemeProvider>;
```

If not using MUI or CSS variable mode, the default color `#1976d2` is used.

---

## Related Documentation

-   [Getting Started](./getting-started.md)
-   [Examples](./examples.md)
