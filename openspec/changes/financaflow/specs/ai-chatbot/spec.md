## ADDED Requirements

### Requirement: Chat Interface Access
The system SHALL provide access to the chatbot through multiple interfaces.

#### Scenario: Access chat via floating widget
- **WHEN** user clicks floating chat button (bottom-right)
- **THEN** chat widget expands to show chat interface

#### Scenario: Access chat via navigation
- **WHEN** user clicks Chat in navigation menu
- **THEN** system navigates to full chat page

#### Scenario: Chat widget state persistence
- **WHEN** chat widget is open and user navigates pages
- **THEN** widget remains open in corner position

---

### Requirement: Chat Message Handling
The system SHALL allow users to send messages and receive AI responses.

#### Scenario: Send text message
- **WHEN** user types message and presses Enter or clicks Send
- **THEN** system adds message to chat history
- **AND** sends request to Ollama API
- **AND** displays AI response when received

#### Scenario: Loading state during response
- **WHEN** message is sent
- **THEN** system shows typing indicator
- **AND** disables send button until response received

#### Scenario: Chat history persistence
- **WHEN** user returns to chat after closing app
- **THEN** previous messages are displayed

---

### Requirement: AI Context Provision
The system SHALL provide AI with relevant financial context for informed responses.

#### Scenario: Include budget summary in context
- **WHEN** user starts new conversation
- **THEN** system includes current month's budget status in system prompt

#### Scenario: Include recent expenses in context
- **WHEN** conversation requires expense knowledge
- **THEN** system provides last 10 expenses as context

#### Scenario: Include goals in context
- **WHEN** user asks about savings
- **THEN** system includes goals progress in context

---

### Requirement: Proactive AI Insights
The system SHALL generate and display proactive insights on the dashboard.

#### Scenario: Generate insight on page load
- **WHEN** dashboard loads
- **THEN** system checks for cached insight less than 6 hours old
- **AND** displays cached insight if available

#### Scenario: Background insight generation
- **WHEN** dashboard loads and no fresh cache exists
- **THEN** system triggers background insight generation
- **AND** updates UI when new insight arrives

#### Scenario: Insight display
- **WHEN** insight is available
- **THEN** system displays insight card with icon and content
- **AND** card animates in when new insight arrives

#### Scenario: No insight possible
- **WHEN** insufficient data for insight (no budget, no expenses)
- **THEN** system displays generic prompt "Add some expenses to get personalized insights"

---

### Requirement: Suggestion Chips
The system SHALL provide quick suggestion buttons in chat.

#### Scenario: Display suggested questions
- **WHEN** chat is empty or after AI response
- **THEN** system shows 3 suggestion chips with common questions

#### Scenario: Use suggestion chip
- **WHEN** user clicks suggestion chip
- **THEN** system sends corresponding message

---

### Requirement: Chat Error Handling
The system SHALL gracefully handle AI errors.

#### Scenario: Ollama not available
- **WHEN** Ollama service is unreachable
- **THEN** system shows error message "AI assistant is temporarily unavailable"
- **AND** offers retry button

#### Scenario: Slow response
- **WHEN** AI response takes longer than 10 seconds
- **THEN** system shows timeout message
- **AND** suggests trying again

#### Scenario: Invalid response
- **WHEN** AI returns malformed response
- **THEN** system shows fallback message
- **AND** logs error for debugging