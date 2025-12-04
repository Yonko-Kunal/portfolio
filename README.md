# Portfolio Project

A modern, responsive, and interactive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project showcases a clean design with smooth animations and a focus on user experience.

## Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router) and React 18.
- **Type Safety**: Fully typed with TypeScript for robust code.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Animations**: Smooth transitions and effects using Framer Motion and GSAP.
- **Theming**: Dark/Light mode support via `next-themes`.
- **UI Components**: polished UI elements using Radix UI and Lucide React icons.
- **Performance**: Optimized with Next.js best practices.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://greensock.com/gsap/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Utilities**: `clsx`, `tailwind-merge`, `date-fns`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18.17.0 or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Yonko-Kunal/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root directory if needed (refer to `.env.example` if available, or check the source code for required variables).

### Running the Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

A brief overview of the project's structure:

```
portfolio/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── app/         # Next.js App Router pages and layouts
│   ├── components/  # Reusable React components
│   ├── config/      # Configuration files
│   ├── lib/         # Utility functions and libraries
│   └── styles/      # Global styles
├── .env.local       # Local environment variables
├── next.config.ts   # Next.js configuration
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## License

This project is open source and available under the [MIT License](LICENSE).
