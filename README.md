# CMS Page Studio Prototype

This project is a Next.js application designed to load, edit, and publish landing pages via Contentful.It leverages `shadcn/ui` for components and integrates directly with the Contentful Content Delivery API.

## Architecture Overview

The system is built on Next.js App Router with the following core components:

### 1. Schema-Driven Renderer
- **Implementation**: We use a `SectionRenderer` component that dynamically imports and renders section components (`Hero`, `CTA`) based on the `type` field from the API response.
- **Validation**: All data fetched from Contentful is validated at runtime using Zod schemas (`src/lib/schemas.ts`). This ensures type safety and prevents rendering errors from malformed data.
- **Components**: Section components are isolated in `src/components/sections/` and use Tailwind CSS for styling.

### 2. Contentful Integration
- **Client**: A robust Contentful client (`src/lib/contentfulClient.ts`) handles fetching entries.
- **Mapping**: Contentful's internal content types (e.g., `heroSection`) are mapped to our internal schema types (`hero`) during the transformation layer.
- **Robustness**: The integration includes deep error handling (e.g., handling array vs single object references) and fallback strategies for missing content.

## Completed Features

- [x] **Schema-driven renderer + registry**: `SectionRenderer` dynamically loads components based on Contentful data.
- [x] **Contentful integration**: `contentfulClient` fetches and transforms data, handling edge cases.
- [x] **Component Library**: Created `Hero`, `CTA` components with responsive styling.
- [x] **Homepage Integration**: The root route (`/`) fetches and renders the "home" page from Contentful.

## Incomplete Features & Limitations

Due to strictly limited engineering time, the following features from the brief were not prioritized for this prototype:

### 1. Studio Editor & Redux State
- **Status**: **Incomplete**
- **Reason**: **Time Limitation.**
- **Details**: While a prototype editor page (`src/app/studio/[slug]/page.tsx`) was partially scaffolded, the full Redux state management (`src/store`), WYSIWYG editing capabilities, and drag-and-drop section reordering were not implemented. The project currently focuses on the correct rendering of content.

### 2. Role-Based Access Control (RBAC)
- **Status**: **Incomplete**
- **Reason**: **Time Limitation.**
- **Details**: The authentication layer (originally planned with NextAuth.js) and server-side role enforcement middleware were removed to ensure the core rendering loop was stable within the time constraints. Routes are currently public.

### 3. Publish Flow & Semantic Versioning
- **Status**: **Incomplete**
- **Reason**: **Time Limitation.**
- **Details**: The logic for freezing drafts into immutable JSON releases, calculating Semantic Versioning (SemVer) increments based on property diffs, and the idempotent publish endpoint were not implemented.

### 4. Quality Gates (CI/CD & Accessibility Testing)
- **Status**: **Incomplete**
- **Reason**: **Time Limitation.**
- **Details**: Automated accessibility checks (using `axe-core` via Playwright) and GitHub Actions CI workflows for verifying builds and tests were not set up.

### 5. WCAG 2.2 AAA Compliance
- **Status**: **Partial**
- **Reason**: **Time Limitation.**
- **Details**: While basic semantic HTML is used, a comprehensive audit against WCAG 2.2 AAA standards (keyboard navigation, focus management, contrast ratios) was not performed.

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd cms-eshkon
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file with your Contentful credentials:
    ```env
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN=your_preview_token
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) to view the homepage rendering content dynamically from Contentful.
