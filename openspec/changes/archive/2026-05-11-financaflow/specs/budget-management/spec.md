## ADDED Requirements

### Requirement: Create Monthly Budget
The system SHALL allow users to create a monthly budget specifying month, year, and categories with spending limits.

#### Scenario: Create budget for current month
- **WHEN** user clicks "Create Budget" and fills month, year, and at least one category with limit
- **THEN** system creates budget and displays success message

#### Scenario: Create budget with custom categories
- **WHEN** user creates budget and adds custom category names with icons and colors
- **THEN** categories are saved and available for expense assignment

#### Scenario: Budget for existing month exists
- **WHEN** user attempts to create budget for month/year that already has a budget
- **THEN** system shows error "Budget already exists for this period"

---

### Requirement: View Budget Overview
The system SHALL display budget status showing allocated amount, spent amount, and remaining balance for each category.

#### Scenario: Display budget progress
- **WHEN** user views budget page
- **THEN** system shows each category with progress bar, spent/limit amounts, and percentage

#### Scenario: Budget approaching limit
- **WHEN** category spending exceeds 80% of limit
- **THEN** system displays warning indicator (yellow)

#### Scenario: Budget exceeded
- **WHEN** category spending exceeds limit
- **THEN** system displays alert indicator (red) and exceeds amount

---

### Requirement: Edit Budget
The system SHALL allow users to modify existing budget categories, limits, and settings.

#### Scenario: Update category limit
- **WHEN** user edits category limit
- **THEN** system updates limit and recalculates percentages

#### Scenario: Add category to existing budget
- **WHEN** user adds new category to budget
- **THEN** system includes category with zero spent amount

#### Scenario: Remove category from budget
- **WHEN** user removes category
- **THEN** category is deleted and expenses reassigned to "Uncategorized"

---

### Requirement: Delete Budget
The system SHALL allow users to delete budgets along with their categories and expenses.

#### Scenario: Delete budget with expenses
- **WHEN** user confirms budget deletion
- **THEN** system deletes budget, categories, and all associated expenses
- **AND** system redirects to budget list

#### Scenario: Cancel deletion
- **WHEN** user confirms deletion but then cancels
- **THEN** system returns to budget view without changes

---

### Requirement: Clone Previous Budget
The system SHALL allow users to clone a previous month's budget to quickly create a new one.

#### Scenario: Clone budget from previous month
- **WHEN** user clicks "Clone from Previous Month"
- **THEN** system copies all categories with same limits to current month

#### Scenario: Clone when previous month has no budget
- **WHEN** user attempts to clone but no previous budget exists
- **THEN** system shows "No budget to clone from"

---

### Requirement: Switch Budget Month
The system SHALL allow users to navigate between different budget periods.

#### Scenario: Navigate to different month
- **WHEN** user selects month/year from dropdown or navigation arrows
- **THEN** system loads corresponding budget data

#### Scenario: View future months
- **WHEN** user navigates to future month without budget
- **THEN** system prompts to create new budget or clone from current