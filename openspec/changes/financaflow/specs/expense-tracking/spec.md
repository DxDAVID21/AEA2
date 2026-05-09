## ADDED Requirements

### Requirement: Add Expense
The system SHALL allow users to add expenses with amount, description, category, and date.

#### Scenario: Add expense with all fields
- **WHEN** user fills amount, description, category, and date
- **THEN** system saves expense and updates category spent total

#### Scenario: Add expense with minimal fields
- **WHEN** user fills only amount and selects category
- **THEN** system uses current date and empty description
- **AND** saves expense successfully

#### Scenario: Add expense to uncategorized
- **WHEN** user adds expense without selecting category
- **THEN** system assigns expense to "Uncategorized" category

---

### Requirement: View Expense List
The system SHALL display all expenses with filtering and sorting capabilities.

#### Scenario: View expenses sorted by date
- **WHEN** user opens expense list
- **THEN** system displays expenses in descending date order (newest first)

#### Scenario: Filter expenses by category
- **WHEN** user selects category filter
- **THEN** system shows only expenses from selected category

#### Scenario: Filter expenses by date range
- **WHEN** user specifies start and end dates
- **THEN** system shows only expenses within range

#### Scenario: Search expenses by description
- **WHEN** user enters search term
- **THEN** system filters expenses matching description (case-insensitive)

---

### Requirement: Edit Expense
The system SHALL allow users to modify existing expense details.

#### Scenario: Edit expense amount
- **WHEN** user changes expense amount
- **THEN** system updates amount and recalculates category total

#### Scenario: Change expense category
- **WHEN** user reassigns expense to different category
- **THEN** system removes from old category total
- **AND** adds to new category total

#### Scenario: Edit expense date
- **WHEN** user changes expense date
- **THEN** system updates date and sorts accordingly

---

### Requirement: Delete Expense
The system SHALL allow users to delete individual expenses.

#### Scenario: Delete single expense
- **WHEN** user clicks delete on expense
- **THEN** system removes expense
- **AND** updates category spent total

#### Scenario: Bulk delete expenses
- **WHEN** user selects multiple expenses and clicks delete
- **THEN** system removes all selected
- **AND** updates all affected category totals

---

### Requirement: Quick Add Expense
The system SHALL provide a quick-add form for rapid expense entry.

#### Scenario: Quick add with keyboard
- **WHEN** user presses keyboard shortcut (Ctrl+N)
- **THEN** quick-add modal opens with focus on amount field

#### Scenario: Quick add defaults
- **WHEN** quick-add modal opens
- **THEN** date field defaults to today
- **AND** category defaults to last used category

#### Scenario: Quick add success
- **WHEN** user enters amount and presses Enter
- **THEN** expense is saved
- **AND** modal closes or stays open for next entry