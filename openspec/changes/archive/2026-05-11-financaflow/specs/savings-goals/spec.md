## ADDED Requirements

### Requirement: Create Savings Goal
The system SHALL allow users to create savings goals with target amount, name, optional target date, and visual customization.

#### Scenario: Create goal with all fields
- **WHEN** user provides name, target amount, target date, icon, and color
- **THEN** system creates goal with current amount of 0
- **AND** displays goal in goals list

#### Scenario: Create goal without target date
- **WHEN** user creates goal without specifying target date
- **THEN** system creates goal with null target date
- **AND** shows "No deadline" in UI

#### Scenario: Create goal without icon/color
- **WHEN** user creates goal with only name and amount
- **THEN** system assigns default icon (🎯) and color

---

### Requirement: Track Goal Progress
The system SHALL track current amount saved toward each goal and display progress.

#### Scenario: Display progress percentage
- **WHEN** goal exists
- **THEN** system calculates and displays percentage (currentAmount / targetAmount * 100)

#### Scenario: Display estimated completion date
- **WHEN** goal has target date OR user has savings history
- **THEN** system calculates estimated completion based on average monthly savings

#### Scenario: Progress bar visualization
- **WHEN** goal has progress
- **THEN** system displays filled progress bar
- **AND** shows current / target amounts

---

### Requirement: Add Savings to Goal
The system SHALL allow users to add saved amounts to a goal.

#### Scenario: Add savings to goal
- **WHEN** user enters amount to add to goal
- **THEN** system increases current amount
- **AND** updates progress percentage

#### Scenario: Withdraw from goal
- **WHEN** user enters negative amount (withdraw)
- **THEN** system decreases current amount
- **AND** ensures current amount never goes below 0

#### Scenario: Goal completed
- **WHEN** current amount reaches or exceeds target
- **THEN** system shows celebration indicator
- **AND** marks goal as completed

---

### Requirement: Edit Goal
The system SHALL allow users to modify goal details.

#### Scenario: Update target amount
- **WHEN** user changes target amount
- **THEN** system recalculates percentage

#### Scenario: Update target date
- **WHEN** user changes target date
- **THEN** system updates estimated completion calculation

#### Scenario: Rename goal
- **WHEN** user changes goal name
- **THEN** system updates name across all views

---

### Requirement: Delete Goal
The system SHALL allow users to delete goals.

#### Scenario: Delete goal with savings history
- **WHEN** user confirms goal deletion
- **THEN** system deletes goal and all associated milestones
- **AND** removes from all views

#### Scenario: Delete completed goal
- **WHEN** user deletes completed goal
- **THEN** system shows confirmation "This goal is complete. Are you sure?"
- **AND** proceeds with deletion if confirmed

---

### Requirement: Goal Milestones
The system SHALL track milestone achievements for goals.

#### Scenario: Automatic milestone creation
- **WHEN** user adds savings that crosses 25%, 50%, 75%
- **THEN** system creates milestone record with amount and timestamp

#### Scenario: View milestone history
- **WHEN** user views goal details
- **THEN** system shows list of achieved milestones with dates

#### Scenario: Manual milestone notes
- **WHEN** user adds contribution with note
- **THEN** system stores note with milestone