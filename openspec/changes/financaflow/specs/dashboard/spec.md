## ADDED Requirements

### Requirement: Dashboard Home View
The system SHALL display a clean, visual dashboard as the home page.

#### Scenario: Dashboard loads immediately
- **WHEN** user navigates to dashboard
- **THEN** system displays UI without waiting for AI insights
- **AND** shows loading skeleton for insight card

#### Scenario: Budget overview displayed
- **WHEN** current month has budget
- **THEN** system shows main budget progress circle with total spent/limit

#### Scenario: Days remaining indicator
- **WHEN** viewing current month budget
- **THEN** system shows "X days remaining" in month

---

### Requirement: Recent Expenses Display
The system SHALL show recent expenses on the dashboard.

#### Scenario: Display last 5 expenses
- **WHEN** dashboard loads
- **THEN** system shows 5 most recent expenses with date, description, amount, category

#### Scenario: Quick-add from dashboard
- **WHEN** user clicks "+ Add Expense" on dashboard
- **THEN** system opens add expense modal

---

### Requirement: Goals Progress Display
The system SHALL display savings goals progress on the dashboard.

#### Scenario: Display active goals
- **WHEN** goals exist
- **THEN** system shows goal cards with progress bars

#### Scenario: Goal card shows details
- **WHEN** goal card is displayed
- **THEN** shows icon, name, current/target amount, progress bar

#### Scenario: No goals message
- **WHEN** no goals exist
- **THEN** system shows prompt "Create your first savings goal"

---

### Requirement: Navigation Structure
The system SHALL provide clear navigation between app sections.

#### Scenario: Navigation bar displayed
- **WHEN** user is on any page
- **THEN** bottom navigation shows: Dashboard, Budgets, Expenses, Goals, Chat

#### Scenario: Active page indicator
- **WHEN** user is on page
- **THEN** corresponding nav item is highlighted/active

#### Scenario: Navigation responsive behavior
- **WHEN** app is viewed on desktop
- **THEN** navigation is horizontal at top
- **WHEN** app is viewed on mobile
- **THEN** navigation is bottom fixed bar

---

### Requirement: Theme Toggle
The system SHALL allow users to switch between light and dark themes.

#### Scenario: Toggle theme
- **WHEN** user clicks theme toggle button
- **THEN** system switches between light and dark themes
- **AND** persists preference to localStorage

#### Scenario: Theme persists on reload
- **WHEN** user returns to app
- **THEN** system applies saved theme preference

#### Scenario: System theme detection
- **WHEN** user has no saved preference
- **THEN** system uses system preference (prefers-color-scheme)

---

### Requirement: Web Notifications
The system SHALL display in-app notifications for budget alerts.

#### Scenario: Budget warning notification
- **WHEN** category reaches 80% of limit
- **THEN** system shows notification "Heads up: [Category] is at 80%"

#### Scenario: Budget exceeded notification
- **WHEN** category exceeds limit
- **THEN** system shows alert notification "[Category] has exceeded its limit by €X"

#### Scenario: Notification dismissal
- **WHEN** notification appears
- **THEN** user can click X to dismiss
- **AND** notification auto-dismisses after 5 seconds