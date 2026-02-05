# Carbon Design System Components Integration Guide

## Overview
Your Sage Task Manager design has the following Code Connect components from the Carbon Design System that are now mapped to your HTML:

---

## Components & Properties

### 1. **SimpleButton** (Add Task Button)
**Figma Node ID:** `I1:1986;114517:10944`
**Location:** Input section, right side of input field

**Component Properties:**
```javascript
{
  hasLeftIcon: true,
  leftIcon: "PlusLarge",     // Plus icon for adding tasks
  importance: "subtle",
  size: "L",                  // Large size
  labelIcon: "icon only"      // Only shows icon, no text
}
```

**HTML Implementation:**
```html
<button
  type="submit"
  class="add-button"
  data-component="SimpleButton"
  data-has-left-icon="true"
  data-left-icon="PlusLarge"
  data-importance="subtle"
  data-size="L"
>
  <span class="plus-icon">+</span>
</button>
```

**Styling Applied:**
- Width: 48px × 48px (circular)
- Border-radius: 999px
- Background: Black (#000000) - light mode
- Color: White
- Icon: PlusLarge SVG (e967)

---

### 2. **DividerHr** (Vertical Divider)
**Figma Node ID:** `I1:1986;114517:10943`
**Location:** Input section, between input field and add button

**Component Properties:**
```javascript
{
  type: "vertical",
  variant: "typical"
}
```

**HTML Implementation:**
```html
<div 
  class="input-divider"
  data-component="DividerHr"
  data-type="vertical"
  data-variant="typical"
></div>
```

**Styling Applied:**
- Height: 20px
- Width: 1px
- Background: Border color (#505050)
- Margins: 0.5rem on each side

---

### 3. **SimpleButton** (Clear Completed)
**Figma Node ID:** `1:2594`
**Location:** Bottom of task list

**Component Properties:**
```javascript
{
  labelText: "Clear Completed",
  importance: "secondary",
  size: "M",
  hasLeftIcon: false,
  hasRightIcon: false
}
```

**HTML Implementation:**
```html
<button
  id="clearCompletedBtn"
  class="secondary-button"
  data-component="SimpleButton"
  data-label-text="Clear Completed"
  data-importance="secondary"
  data-size="M"
>
  Clear Completed
</button>
```

**Styling Applied:**
- Height: 40px
- Background: rgba(0, 129, 32, 0.03) - light green background
- Border: 2px solid rgba(0, 129, 32, 0.8) - green border
- Border-radius: 20px (pill shape)
- Color: rgba(0, 0, 0, 0.9)

---

### 4. **Checkbox** (Task Item Checkbox)
**Figma Node ID:** `1:2647` (AssetsMContentCheckbox)
**Location:** Left side of each task item

**Component Properties:**
```javascript
{
  state: "unselected" | "selected" | "indeterminate",
  disabled: false,
  focus: false
}
```

**HTML Implementation:**
```html
<input 
  type="checkbox"
  class="task-checkbox"
  data-component="Checkbox"
  data-state="unselected"
/>
```

**Styling Applied:**
- Width: 24px × 24px
- Border: 1px solid #75838f
- Background: White
- Border-radius: 4px
- Accent color: Text primary (#000000)

---

### 5. **SimpleButton - Destructive** (Delete Button)
**Figma Node ID:** `I1:2674`, `I1:2955`, `I1:2964`, `I1:2990`, `I1:3001`
**Location:** Right side of each task item
**Icon:** Cross (e91d)

**Component Properties:**
```javascript
{
  icon: "Cross",
  importance: "primary",
  variant: "destructive",
  size: "S",
  labelIcon: "icon only"
}
```

**HTML Implementation:**
```html
<button 
  type="button"
  class="delete-button"
  data-component="SimpleButton"
  data-variant="destructive"
  data-icon="Cross"
>
  ×
</button>
```

**Styling Applied:**
- Width: 32px × 32px (circular)
- Background: #db004e (magenta/danger color)
- Color: White
- Border-radius: 999px
- Icon: Cross SVG (e91d)

---

## Integration Steps

### Step 1: Update HTML
✅ **Already Done** - All HTML elements now include:
- `data-component` attributes identifying which Carbon component each element represents
- `data-node-id` attributes matching the Figma node IDs
- Component-specific properties as `data-*` attributes

### Step 2: Update CSS (Partial)
✅ **Partially Done** - Added styling for `.input-divider` component

### Step 3: React/TypeScript Implementation (Optional)
If you want to migrate to React and use actual Carbon components, replace elements with:

```typescript
import { Button, Divider, Icon } from '@carbon/react';
import { Add20, Close20 } from '@carbon/icons-react';

// Add Task Button
<Button
  size="lg"
  renderIcon={Add20}
  iconDescription="Add task"
  hasIconOnly
  onClick={handleAddTask}
/>

// Divider
<Divider orientation="vertical" />

// Clear Completed Button
<Button kind="secondary" onClick={handleClearCompleted}>
  Clear Completed
</Button>

// Delete Button
<Button
  kind="danger--tertiary"
  size="sm"
  renderIcon={Close20}
  onClick={() => handleDelete(taskId)}
/>
```

### Step 4: Dark Mode Support
All components automatically adapt to dark mode through CSS variables:
- Background colors use `--color-background`
- Border colors use `--color-border`
- Text colors use `--color-text-primary`

---

## Mapped Components Summary

| Component | Usage | Properties | Node ID |
|-----------|-------|-----------|---------|
| **SimpleButton** | Add task, Clear completed | size, importance, hasLeftIcon | 1:1986, 1:2594 |
| **DividerHr** | Vertical separator in input | type, variant | 1:1986 |
| **Checkbox** | Task completion toggle | state, disabled | 1:2647 |
| **SimpleButton - Destructive** | Delete task | variant, icon | Multiple |

---

## Carbon Library Reference
- **Repository:** https://github.com/sageanwarbolat/carbon
- **Components Path:** `packages/react/src/components/`
- **Icon Library:** Carbon Icons React
- **Documentation:** https://zeroheight.com/35ee2cc26/

---

## Next Steps

1. **Review Component Implementation:**
   - Verify all buttons match their Figma counterparts visually
   - Test component interactions (click, hover, focus states)

2. **Consider React Migration:**
   - Current vanilla JS implementation works well with Carbon components
   - If team standardizes on React, migrate to actual Carbon React components

3. **Sync Design Tokens:**
   - Map existing CSS variables to Carbon design tokens
   - Ensure color, spacing, and typography match Carbon specs

4. **Update Code Connect:**
   - Once CLI issues are resolved, publish these mappings to Figma
   - Team can then view code directly in Figma Dev Mode
