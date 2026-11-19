# ZENTRIX – Complete Implementation Plan

## Goal Description
Build the full‑stack ZENTRIX application with all listed modules:
- Timetable page UI & conflict detection
- Assignments management (CRUD, overdue, reminders)
- Activities / Projects management
- Digital Notebook (rich text, files)
- Student Groups messaging (real‑time chat)
- Reminder notifications (FCM, Cloud Functions)
- Unit & integration tests
- Deployment scripts & documentation

The app must be responsive, premium‑looking, and fully functional with Firebase backend.

## User Review Required
> [!IMPORTANT]
> This plan outlines a large set of features. Please confirm that you want us to proceed with the full implementation as described. If you need any adjustments (e.g., priority ordering, omission of a module), let us know now.

## Open Questions
> [!WARNING]
> - Do you have any specific design language (fonts, color palette) beyond the current Tailwind theme?
> - Should groups messaging be limited to text only, or include file attachments?
> - Do you prefer daily email reminders, push notifications, or both?
> - Any limits on the number of concurrent users / data size for Firestore?

## Proposed Changes
---
### 1️⃣ Core Layout & Routing
- **[NEW]** `src/routes/Dashboard.tsx` – already created with sidebar navigation.
- **[MODIFY]** `src/App.tsx` – ensure routes for all sub‑pages under `/dashboard/*`.
- **[NEW]** `src/routes/timetable/TimetablePage.tsx` – weekly calendar UI, event list, add/edit modal.
- **[NEW]** `src/routes/assignments/AssignmentsPage.tsx` – assignment list, CRUD modals.
- **[NEW]** `src/routes/activities/ActivitiesPage.tsx` – projects and activities overview.
- **[NEW]** `src/routes/notebook/NotebookPage.tsx` – rich‑text editor, file upload.
- **[NEW]** `src/routes/groups/GroupsPage.tsx` – list of groups, chat view.
- **[NEW]** `src/routes/profile/ProfilePage.tsx` – user profile, theme toggle.

---
### 2️⃣ Timetable Module
- **[NEW]** Calendar component (day/week tabs, drag‑and‑drop).
- **[NEW]** `src/components/TimetableCard.tsx` – event rendering (already exists, will enhance UI).
- **[NEW]** Conflict detection using `utils/timeOverlap.ts` (already present).
- **[NEW]** Cloud Function `scheduleReminders` to trigger push notifications before class start.
- **[NEW]** Firestore rules & indexes for `timetable_events`.

---
### 3️⃣ Assignments Module
- **[NEW]** Firestore collection `assignments` (fields: title, dueDate, status, course, notes).
- **[NEW]** CRUD UI with modal forms.
- **[NEW]** Overdue detection (client side & Cloud Function).
- **[NEW]** Reminder Cloud Function for upcoming deadlines.

---
### 4️⃣ Activities / Projects Module
- **[NEW]** Firestore collection `activities` (type, description, dueDate, status).
- **[NEW]** Kanban‑style board UI (list / grid view).

---
### 5️⃣ Digital Notebook
- **[NEW]** Integration of a lightweight rich‑text editor (e.g., Slate.js).
- **[NEW]** File storage via Firebase Storage, metadata in Firestore.
- **[NEW]** Search capability across notes.

---
### 6️⃣ Student Groups Messaging
- **[NEW]** Firestore collection `groups` and sub‑collection `messages`.
- **[NEW]** Real‑time chat UI using `onSnapshot`.
- **[NEW]** Optional file attachment upload.

---
### 7️⃣ Reminder Notifications & Cloud Functions
- **[NEW]** `functions/src/reminderScheduler.ts` – schedule push notifications for events, assignments, activities.
- **[NEW]** FCM token handling in `NotificationContext` (already present, will expand).
- **[NEW]** Cloud Function to send daily summary digest.

---
### 8️⃣ Testing
- **[NEW]** Jest + React Testing Library unit tests for components.
- **[NEW]** Integration tests for Firestore services using the Firebase emulator.
- **[NEW]** CI script in `package.json` (`npm test`).

---
### 9️⃣ Deployment & Documentation
- **[MODIFY]** `README.md` – detailed setup, environment variables, deployment steps.
- **[NEW]** Firebase Hosting configuration (`firebase.json`).
- **[NEW]** GitHub Actions workflow for CI/CD.

## Verification Plan
### Automated Tests
- Run `npm test` after each module is added.
- Use Firebase emulator suite to verify Firestore rules & functions.

### Manual Verification
- Deploy to Firebase Hosting (staging) and manually test UI flows.
- Verify push notifications on a test device.
- Check real‑time updates for timetable, assignments, and group chat.

Once you approve this plan, I will start implementing the modules in the order listed.
