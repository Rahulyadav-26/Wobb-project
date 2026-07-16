# Wobb Creator Search Platform - Assignment Submission

🌍 **Live Demo:** [https://wobb-project-drab.vercel.app/](https://wobb-project-drab.vercel.app/)

A modern, high-performance React application designed for discovering, filtering, and managing influencer profiles across YouTube, Instagram, and TikTok.

Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Zustand**, this project emphasizes fluid animations, robust state management, responsive UI design, and rigorous performance optimizations.

---

## 📋 Assignment Requirements & Overview

### What You Changed

- **Dynamic Profile Generation:** Implemented a robust fallback system (`profileLoader.ts`) that intercepts routing for creators who lack dedicated detailed JSON files. It extracts their existing search data, injects authentic biographies (via a built-in dictionary), and dynamically generates a full profile page on-the-fly, completely eliminating "Profile Not Found" errors.
- **Performance Optimizations:**
  - Integrated React 18's `useDeferredValue` in `SearchPage.tsx` to debounce the heavy array filtering, keeping search inputs instantly responsive (60fps) during typing.
  - Refactored `ProfileCard` to utilize atomic Zustand selectors (`useListStore(state => state.isProfileSaved(...))`), preventing cascading re-renders across the entire list when a single card is saved.
  - Wrapped list and card components in `React.memo()` and used `useCallback` for click handlers.
  - Added lazy loading (`React.lazy` and `Suspense`) for below-the-fold components like `MarketerPainPoints`.
- **UI & Routing Fixes:** Replaced `location.state` with URL search parameters (`useSearchParams`) to persist the active platform tab across navigations. Clicking "Back" from a profile page now correctly returns the user to the exact platform tab they were previously viewing (e.g., returning to YouTube instead of defaulting to Instagram).
- **Asset Fixes:** Diagnosed broken Google/external image URLs returning 404s, downloaded the assets locally, and wrote Node scripts to mass-update the JSON data to point to local `/images/profiles/` paths.
- **Dark Mode:** Implemented a persistent, system-aware global Dark Mode using Tailwind and Zustand.
- **Responsiveness:** Performed a deep styling pass to ensure grid layouts, segmented tab controls, and typography scale flawlessly on ultra-narrow mobile devices (e.g., iPhone SE).

### Libraries You Added

- **Zustand:** Lightweight global state management (used for the "Saved List" and Dark Mode theme toggling). Chosen over Redux for its simplicity, zero boilerplate, and native `persist` middleware.
- **Vitest & jsdom:** The fastest, Vite-native testing framework. Replaces legacy tools like Jest.
- **@testing-library/react & @testing-library/jest-dom:** Industry standard for UI component testing and DOM assertions.

### Assumptions Made

- **Mock Data Scarcity:** I assumed the provided `tseries.json`, `MrBeast6000.json`, etc., were the _only_ detailed data files available. Because generating 24 missing mock files manually is tedious, I assumed a dynamic code-driven fallback generator utilizing the existing search data was the most scalable and elegant solution.
- **Local Asset Hosting:** I assumed that external URLs throwing 404s (like `yt3.googleusercontent.com`) were permanently broken due to CORS or deleted resources, leading me to assume hosting them locally in the `public` folder was the safest long-term fix.

### Trade-offs

- **Client-Side Filtering vs Server-Side:** Currently, filtering thousands of creators happens on the client side using JavaScript `Array.filter`. While this is extremely fast for our mock data size, in a real-world scenario with millions of creators, this would require server-side pagination and database queries. I traded server complexity for client-side speed.
- **Dynamic Fallbacks vs Hardcoded Files:** Generating mock profiles on-the-fly saves file space and manual effort, but the trade-off is that these dynamically generated profiles lack deeply nested, unique data (like specific recent post arrays), so they use generic/fallback recent post data.

### Any Remaining Improvements

- **Virtualization:** If the search data JSON files grew to contain 10,000+ creators, rendering all those `<ProfileCard>` DOM nodes simultaneously would crash the browser. Implementing a virtualized list (e.g., `@tanstack/react-virtual`) would only render the cards currently visible on the screen.
- **E2E Testing:** While robust unit and integration tests (Vitest) exist, adding End-to-End tests via **Playwright** or **Cypress** to physically click through the app in a headless browser would further guarantee production stability.
- **Image Optimization:** Currently serving raw downloaded images. Integrating Vite image optimization plugins or serving WebP assets dynamically would decrease initial load bandwidth.

---

## 🛠️ Tech Stack & Getting Started

- **Core:** React, TypeScript, Vite
- **Styling:** Tailwind CSS (v4), GSAP
- **State:** Zustand
- **Testing:** Vitest, React Testing Library

### Setup

```bash
# Clone the repository
git clone https://github.com/Rahulyadav-26/Wobb-project.git

# Install dependencies
npm install

# Run the dev server
npm run dev

# Run the automated test suite
npm run test
```

## ⚡ Verification Checklist

✅ `npm run build` completes successfully.
✅ The application runs without errors.
✅ The repository is public.
✅ Testing infrastructure is fully operational with zero failing tests.

## PR Sample

I've added a small sample component and test to serve as a lightweight PR for review:

- `src/components/PRSample.tsx` — a tiny counter component.
- `src/components/PRSample.test.tsx` — a Vitest + React Testing Library test verifying increment behavior.

- `src/components/PRSampleToggle.tsx` — a simple toggle component to demo boolean state.
- `src/components/PRSampleToggle.test.tsx` — test verifying toggle behavior.
- `src/components/PRSampleBroken.tsx` — an intentionally broken sample component for PR review.

### Additional Utilities

- `src/utils/stringUtils.ts` — `truncateText(text, maxLength, ellipsis?)` helper and associated tests. Useful for truncating long labels in compact UI elements.

You can run the test suite with `npm run test` to see the new test pass locally.
