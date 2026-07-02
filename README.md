# Wobb Creator Search Platform

A modern, high-performance React application designed for discovering, filtering, and managing influencer profiles across YouTube, Instagram, and TikTok. 

Built with **React 18/19**, **Vite**, **Tailwind CSS v4**, and **Zustand**, this project emphasizes fluid animations, robust state management, responsive UI design, and rigorous performance optimizations.

---

## 🚀 Key Features

* **Multi-Platform Search:** Seamlessly filter through hundreds of creators across YouTube, TikTok, and Instagram using an intuitive, beautifully animated segmented control tab.
* **Instant Filtering & Pagination:** Leverages React 18's `useDeferredValue` for non-blocking, asynchronous search filtering, ensuring the UI remains buttery-smooth at 60fps even during heavy keystrokes.
* **Dynamic Mock Generation:** Automatically generates gorgeous, full-page creator profiles on-the-fly for creators lacking dedicated detailed data files, utilizing intelligent fallback data mapping and authentic biographical dictionaries.
* **Persistent "My List" Management:** Bookmark your favorite creators. Powered by **Zustand** and `localStorage` persistence, your saved list remains intact across browser sessions.
* **Granular State Optimizations:** Utilizes atomic Zustand selectors and `React.memo()` to eliminate unnecessary cascading re-renders across lists and cards.
* **Dark Mode & Theming:** Full system-aware and user-toggleable persistent Dark Mode, meticulously crafted using CSS variables and Tailwind utilities.
* **Responsive Layout:** A mobile-first, scalable grid architecture that perfectly adapts to screens ranging from ultra-wide 4K monitors down to 320px mobile devices.
* **Comprehensive Testing:** Rock-solid automated unit and integration tests powered by **Vitest** and **React Testing Library**.

---

## 🛠️ Tech Stack

* **Core:** React, TypeScript, Vite
* **Styling:** Tailwind CSS (v4), GSAP (for micro-interactions and scroll animations)
* **State Management:** Zustand (with persist middleware)
* **Routing:** React Router v7
* **Testing:** Vitest, jsdom, React Testing Library, Jest DOM

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+ recommended) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rahulyadav-26/Wobb-project.git
   cd Wobb-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Application

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### Building for Production

To compile TypeScript and bundle the application for production:
```bash
npm run build
```
The optimized assets will be generated in the `dist/` directory. You can preview the production build locally using:
```bash
npm run preview
```

### Running Tests

The project uses Vitest for lightning-fast unit and integration testing.

To run the test suite once:
```bash
npm run test
```

---

## 📁 Project Structure

```text
src/
├── assets/         # Static assets and mock JSON data for creators
├── components/     # Reusable UI components (ProfileCard, PlatformFilter, Layout, etc.)
├── pages/          # Route-level page components (SearchPage, ProfileDetailPage, ListPage)
├── store/          # Zustand global state management (useListStore, useThemeStore)
├── types/          # Global TypeScript interfaces and type definitions
├── utils/          # Helper functions (formatters, data extraction, dynamic generation)
├── index.css       # Global CSS variables, Tailwind directives, and keyframes
├── App.tsx         # Root component and Router configuration
└── setupTests.ts   # Vitest and Jest DOM configuration
```

---

## ⚡ Performance Optimizations

1. **React 18 Concurrency:** `useDeferredValue` is used on the primary search input. This prevents the heavy array-filtering logic from blocking the main thread, keeping typing instant and responsive.
2. **Lazy Loading & Suspense:** Below-the-fold components (like `MarketerPainPoints`) are wrapped in `React.lazy()` to reduce the initial JavaScript bundle size and improve TTI (Time to Interactive).
3. **Atomic State Selection:** The UI avoids pulling the entire Zustand store. Components select only the primitive booleans or arrays they need, ensuring elements like `ProfileCard` only re-render when their specific saved status changes.
