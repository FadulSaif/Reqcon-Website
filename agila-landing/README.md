# Agil Arbetskraft - Landing Page Prototype

This is a modern, high-conversion landing page prototype built for Agil Arbetskraft. It features dynamic routing, high-fidelity responsive components, scroll-linked animations, and a cohesive "Dusty Mauve" brand design system.

## Tech Stack
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Vanilla CSS via `styled-jsx`
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Prerequisites
- **Node.js**: v18.17 or later
- **npm** (comes installed with Node.js)

## How to Run the Prototype Locally

1. **Install Dependencies**
   Navigate to the project root directory in your terminal and install the required NPM packages:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   Once the dependencies are installed, start the local Next.js development server:
   ```bash
   npm run dev
   ```

3. **View the Prototype**
   Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Key Features & Structure
- **Global Styles:** Defined in `src/app/globals.css`. This file contains all brand variables, typography resets, and utility classes (`btn`, `btn-primary`, `hover-lift`, etc.).
- **Dynamic Routing:** The Articles section uses Next.js dynamic routing (`src/app/articles/[slug]/page.tsx`). It also correctly unwraps the Next.js 15 async `params` Promise.
- **Interactive Forms:** The "Request this service" buttons on the `/services` page will dynamically route the user to the home page's contact form, passing URL parameters (`/?service=...`) to pre-fill the form text area.
- **3D Animations:** Features complex 3D CSS transforms (e.g., the Contact Info map flip-card) built directly into the React components without requiring heavy 3D libraries.

## Building for Production
If you need to generate a production-ready optimized build:
```bash
npm run build
npm run start
```
