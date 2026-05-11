## ADDED Requirements

### Requirement: Export Expenses to CSV
The system SHALL allow users to export their expense data in CSV format.

#### Scenario: Export all expenses
- **WHEN** user clicks "Export to CSV" button
- **THEN** system generates CSV with all expenses
- **AND** triggers browser download with filename "financaflow-expenses-[date].csv"

#### Scenario: CSV format
- **WHEN** CSV is generated
- **THEN** columns are: Date, Description, Category, Amount
- **AND** amounts are formatted with 2 decimal places
- **AND** UTF-8 BOM is included for Excel compatibility

#### Scenario: Export with expenses
- **WHEN** user exports but no expenses exist
- **THEN** system shows message "No expenses to export"

---

### Requirement: Export filtered expenses
The system SHALL allow users to export filtered expense selections.

#### Scenario: Export filtered by category
- **WHEN** user filters by category and clicks export
- **THEN** CSV contains only expenses from selected category

#### Scenario: Export filtered by date range
- **WHEN** user selects date range and clicks export
- **THEN** CSV contains only expenses within range

---

### Requirement: Export accessibility
The system SHALL provide easy access to export functionality.

#### Scenario: Export button location
- **WHEN** user is on expenses page
- **THEN** export button is visible in page header

#### Scenario: Export button disabled state
- **WHEN** no expenses exist
- **THEN** export button is disabled with tooltip "No data to export"