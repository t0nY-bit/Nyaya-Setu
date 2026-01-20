NYAYA SETU (MVP) — Step-by-Step Build Plan (Task Breakdown + Dependencies)

Format: Each task has an ID, dependencies, and a checklist of subtasks.
No orphan tasks: every task is connected via dependencies.

⸻

0) Planning & Setup

✅ Task 0.1 — Repo + tooling foundation

Depends on: None
	•	Create Git repository + main branch protection rules
	•	Add .editorconfig, .gitignore, README.md (project + local run steps)
	•	Configure formatting + linting:
	•	ESLint + Prettier setup
	•	TypeScript strict mode enabled
	•	Add basic folder structure:
	•	/src/app (routes)
	•	/src/components
	•	/src/lib
	•	/src/styles

⸻

✅ Task 0.2 — Define MVP constants & core types

Depends on: 0.1
	•	Create src/lib/constants.ts for:
	•	Max file size = 10MB
	•	Allowed types = PDF, JPG, PNG
	•	Supported languages list (8)
	•	Max stored documents = 3
	•	Legal categories list (5 + Other)
	•	Create src/lib/types.ts for:
	•	LanguageCode
	•	DocumentTypeLabel
	•	UrgencyLevel = "Low" | "Medium" | "High"
	•	DecodedResult schema (summary, keyPoints, fields, etc.)
	•	StoredDoc schema (id, title, createdAt, rawFileRef, decodedResult, etc.)

⸻

1) App Skeleton (Forward-Only Flow)

✅ Task 1.1 — Next.js app routing + screen scaffolds

Depends on: 0.2
	•	Create routes (pages):
	•	/login
	•	/home
	•	/upload
	•	/preview
	•	/language
	•	/confirm
	•	/loading
	•	/result/:id
	•	Add placeholder UI per page with headings + action buttons
	•	Add shared layout shell (minimal):
	•	App name: NYAYA SETU
	•	Tagline on homepage: “Legal clarity for everyone.”

⸻

✅ Task 1.2 — Forward-only navigation enforcement

Depends on: 1.1
	•	Define a “flow state machine” concept in src/lib/flow.ts
	•	Allowed transitions (Login → Home → Upload → Preview → Language → Confirm → Loading → Result)
	•	Block direct route access if prerequisites missing:
	•	If no auth → redirect to /login
	•	If upload not selected → block /preview
	•	If no preview confirmation → block /language
	•	If language not selected → block /confirm
	•	Implement consistent redirect behavior (no back buttons in UI)

⸻

2) Authentication (Phone OTP)

✅ Task 2.1 — Firebase project + env wiring

Depends on: 1.1
	•	Create Firebase project
	•	Enable Phone Authentication
	•	Add Firebase config to .env.local
	•	Implement Firebase init in src/lib/firebase.ts
	•	Add safe env validation helper

⸻

✅ Task 2.2 — Login screen (Phone → OTP → Verify)

Depends on: 2.1
	•	Build /login UI:
	•	Phone number input
	•	“Send OTP” button
	•	OTP input (6-digit)
	•	“Verify OTP” button
	•	Implement OTP send flow
	•	Implement OTP verify flow
	•	On success → redirect to /home

⸻

✅ Task 2.3 — Auth guarding + 30-day session behavior

Depends on: 2.2, 1.2
	•	Create useAuth() hook:
	•	currentUser state
	•	loading state
	•	Add route protection:
	•	redirect unauthenticated users → /login
	•	Ensure session persistence aligns with “~30 days” goal:
	•	Use Firebase persistence settings
	•	Add Logout function

⸻

3) Local Storage Layer (Only Latest 3 Docs)

✅ Task 3.1 — IndexedDB storage using Dexie

Depends on: 0.2
	•	Install Dexie
	•	Create src/lib/db.ts:
	•	docs table
	•	schema indexed by createdAt
	•	Implement DB helpers:
	•	saveDoc()
	•	listRecentDocs(limit=3)
	•	getDocById(id)
	•	deleteDoc(id)

⸻

✅ Task 3.2 — Enforce “keep only latest 3” policy

Depends on: 3.1
	•	Implement enforceMaxDocs(3):
	•	After each new insert, count docs
	•	If >3, delete oldest docs
	•	Add unit-level verification logic (simple local test harness)

⸻

4) Homepage (Minimal + Recent Docs)

✅ Task 4.1 — Build homepage UI + CTA + logout

Depends on: 2.3
	•	/home UI contains:
	•	NYAYA SETU title
	•	Tagline “Legal clarity for everyone.”
	•	CTA button “Scan & Decode” → /upload
	•	Logout menu (header)
	•	Ensure minimal design (Apple-like, uncluttered)

⸻

✅ Task 4.2 — Recent docs list (max 3)

Depends on: 3.2, 4.1
	•	Fetch recent docs from IndexedDB
	•	Show 3 recent doc cards:
	•	title
	•	detected doc type label (if available)
	•	created date/time
	•	Click card → open /result/:id

⸻

✅ Task 4.3 — Dark mode toggle (homepage only)

Depends on: 4.1
	•	Add dark mode toggle UI on homepage
	•	Store preference in local storage
	•	Apply Tailwind dark mode classes globally
	•	Do not show toggle on other screens

⸻

5) Upload Screen (PDF / Images)

✅ Task 5.1 — Upload screen UI + file validation

Depends on: 1.2, 4.1
	•	/upload UI:
	•	Button: Upload PDF
	•	Button: Upload Images (multi-select)
	•	Validate:
	•	file type must be PDF/JPG/PNG
	•	file size <= 10MB total
	•	Show validation errors via toast/message

⸻

✅ Task 5.2 — Persist selected upload in flow state

Depends on: 5.1
	•	Create flow context/store useFlowStore():
	•	selected files
	•	upload type (pdf/images)
	•	preview edits
	•	chosen language
	•	On upload success:
	•	store in flow state
	•	forward to /preview

⸻

6) Preview + Crop/Rotate

✅ Task 6.1 — Preview screen for PDF/images

Depends on: 5.2
	•	Build /preview UI:
	•	Show preview (first page only)
	•	Show file name + type
	•	For images:
	•	show first image preview
	•	For PDFs:
	•	render first page preview (lightweight)

⸻

✅ Task 6.2 — Crop + rotate tooling

Depends on: 6.1
	•	Implement crop tool (image-based)
	•	Implement rotate tool
	•	Save edits back to flow state
	•	Add “Continue” button → /language

Note: Keep this MVP-simple and stable (no heavy preprocessing).

⸻

7) Language Selection (Every Time)

✅ Task 7.1 — Language selection UI (8 languages)

Depends on: 6.2
	•	/language page:
	•	dropdown select with 8 languages
	•	continue button
	•	Store selected language in flow state
	•	Proceed → /confirm

⸻

8) Upload Confirmation + Warning (Latest 3 Only)

✅ Task 8.1 — Confirm screen with warning and proceed

Depends on: 7.1
	•	/confirm screen:
	•	Minimal summary (file name + chosen language)
	•	Show warning text:
	•	“Only your latest 3 documents are kept.”
	•	“Proceed to Decode” button
	•	On proceed → /loading

⸻

9) OCR + AI Decode Pipeline

✅ Task 9.1 — OCR service wrapper (always OCR everything)

Depends on: 8.1
	•	Create src/lib/ocr.ts:
	•	input: PDF or image(s)
	•	output: extracted plain text
	•	Ensure OCR runs even for PDFs:
	•	convert PDF first page(s) to images (or OCR PDF directly if supported)
	•	Return combined extracted text string

⸻

✅ Task 9.2 — LLM decode service wrapper (structured output)

Depends on: 9.1
	•	Create src/lib/decoder.ts:
	•	input: OCR text + selected language
	•	output: DecodedResult object
	•	Enforce strict shape:
	•	detectedDocTypeLabel
	•	categoryTag
	•	urgencyLevel
	•	extracted fields: sender, receiver, date, deadline, subject, demands
	•	summary (5–7 lines)
	•	keyPoints (6–10 bullets)
	•	actionPlan = “Consult a lawyer.”
	•	Implement server-side endpoint:
	•	/api/decode calls OCR + LLM securely

⸻

✅ Task 9.3 — Loading screen triggers decode workflow

Depends on: 9.2
	•	/loading screen shows:
	•	spinner + “Decoding…”
	•	On mount:
	•	call /api/decode
	•	handle success → save results
	•	handle failure → show fail UI + retry path

⸻

10) Save Decoded Result (Last 3 Only)

✅ Task 10.1 — Save document to IndexedDB and enforce limit

Depends on: 9.3, 3.2
	•	Create doc record:
	•	generated id
	•	default title (editable later)
	•	createdAt
	•	detected doc type
	•	decoded result payload
	•	store original file reference (locally)
	•	Save to IndexedDB
	•	Run “keep only last 3” cleanup immediately
	•	Redirect to /result/:id

⸻

11) Results Screen (Core Output)

✅ Task 11.1 — Results screen base layout

Depends on: 10.1
	•	/result/:id loads document by ID
	•	Render top warning banner:
	•	“This may be inaccurate.”
	•	Render type label + category tag
	•	Render extracted details card:
	•	sender, receiver, date, deadline, subject, demands
	•	Render deadline display:
	•	“Reply by: ”
	•	urgency badge Low/Medium/High

⸻

✅ Task 11.2 — Tabs: Summary / Key Points / Action Plan

Depends on: 11.1
	•	Implement Tabs component:
	•	Summary tab: show 5–7 lines
	•	Key Points tab: show 6–10 bullets
	•	Action Plan tab: show only “Consult a lawyer.”

⸻

✅ Task 11.3 — Original document preview (first page only)

Depends on: 11.1
	•	Show small preview thumbnail
	•	On click open modal viewer
	•	Only display first page for MVP

⸻

✅ Task 11.4 — Collapsible “Original Extracted Text” section

Depends on: 11.2
	•	Add collapsible section below tabs
	•	Render OCR text as read-only
	•	Ensure no copy button exists

⸻

12) Rename + Delete + Undo (5 seconds)

✅ Task 12.1 — Rename document

Depends on: 11.1
	•	Add rename action on results screen
	•	Modal with title input + save button
	•	Persist updated title in IndexedDB
	•	Update UI immediately

⸻

✅ Task 12.2 — Delete document (confirm + undo toast)

Depends on: 12.1
	•	Add delete action
	•	Confirmation modal (required)
	•	On confirm:
	•	delete from IndexedDB
	•	show Undo toast (5 seconds)
	•	If Undo clicked:
	•	restore document entry (within 5s)
	•	After delete (no undo):
	•	redirect to /home

⸻

13) Export / Share as Single PDF

✅ Task 13.1 — PDF report generator

Depends on: 11.3, 11.2
	•	Implement export button on results screen
	•	Generate a single PDF containing:
	•	document title + date
	•	detected type + category + urgency
	•	extracted details fields
	•	Summary + Key Points + Action Plan
	•	original document first page (image)
	•	Ensure:
	•	no watermark
	•	no disclaimer in PDF
	•	normal PDF download

⸻

14) Error Handling & UX Polish

✅ Task 14.1 — Decode failure screen + scan tips

Depends on: 9.3
	•	If OCR/LLM fails:
	•	show failure state
	•	ask user to re-upload
	•	show scan tips:
	•	use good lighting
	•	avoid blur
	•	crop edges
	•	reduce shadows
	•	keep document flat

⸻

✅ Task 14.2 — Ensure “no copy buttons” anywhere

Depends on: 11.4, 13.1
	•	Verify no copy icons/buttons exist in UI
	•	Ensure extracted/original text is read-only only

⸻

✅ Task 14.3 — UI minimal polish pass

Depends on: 11.2, 4.3
	•	Typography cleanup (clear hierarchy)
	•	Spacing normalization
	•	Consistent buttons and cards
	•	Dark mode contrast check

⸻

15) Feedback / Rating Collection

✅ Task 15.1 — Post-result rating widget (1–5 + feedback)

Depends on: 11.2
	•	Add rating component on results screen:
	•	1–5 rating selection
	•	optional text feedback
	•	Store feedback locally or send to endpoint:
	•	(hackathon option) store locally in IndexedDB
	•	(optional) POST to /api/feedback

⸻

16) Deployment & Final Demo Readiness

✅ Task 16.1 — Deployment setup (Vercel)

Depends on: 14.3, 13.1, 15.1
	•	Configure env vars for:
	•	Firebase
	•	OCR provider
	•	LLM provider
	•	Deploy to Vercel
	•	Smoke test production build

⸻

✅ Task 16.2 — End-to-end QA checklist (demo-focused)

Depends on: 16.1
	•	Login flow works reliably
	•	Upload PDF → decode → results
	•	Upload image(s) → decode → results
	•	Language selection works for all 8
	•	Last-3-docs rule works (4th deletes oldest)
	•	Rename persists
	•	Delete + Undo works
	•	Export PDF works
	•	Failure state shows scan tips
	•	Dark mode toggle works on homepage only

⸻

Dependency Summary (Quick View)
	•	Foundation: 0.1 → 0.2
	•	Routing & flow: 1.1 → 1.2
	•	Auth: 2.1 → 2.2 → 2.3
	•	Storage: 3.1 → 3.2
	•	Home UI: 4.1 → 4.2 → 4.3
	•	Upload flow: 5.1 → 5.2 → 6.1 → 6.2 → 7.1 → 8.1
	•	Decode pipeline: 9.1 → 9.2 → 9.3 → 10.1
	•	Results: 11.1 → 11.2 → 11.3 → 11.4
	•	Actions: 12.1 → 12.2
	•	Export: 13.1
	•	Polish: 14.1 → 14.2 → 14.3
	•	Feedback: 15.1
	•	Ship: 16.1 → 16.2
