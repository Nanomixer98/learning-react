# Teslo Shop - React E-Commerce

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)

A modern, fast, and responsive e-commerce storefront built with React 19 and Tailwind CSS 4. This project serves as a frontend for the Teslo Shop ecosystem, featuring user authentication, product management, and a seamless shopping experience.

---

## 🚀 Features

- **Storefront**: Browse products by categories (Men, Women, Kid).
- **Product Details**: Comprehensive product information and images.
- **Authentication**: secure login and registration system.
- **Admin Dashboard**: manage inventory, products, and site statistics.
- **Responsive Design**: Built with Tailwind CSS 4 for a perfect experience on all devices.
- **Efficient State Management**: Powered by TanStack React Query 5 for caching and synchronization.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Data Fetching**: [TanStack React Query 5](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Hugeicons](https://hugeicons.com/)

---

## ⚙️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Teslo API Backend**: Ensure the backend server ([teslo-shop-nest](https://github.com/Klerith/teslo-shop-nest)) is running.

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd 06-teslo-shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Copy the template environment file and update the variables:
   ```bash
   cp .env.template .env
   ```
   Edit `.env` and set your `VITE_API_URL` (e.g., `http://localhost:3000/api`).

4. **Launch the development server**:
   ```bash
   npm run dev
   ```

---

## 📦 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles the application for production. |
| `npm run preview` | Locally previews the production build. |
| `npm run lint` | Runs ESLint to find and fix code style issues. |

---

## 📂 Project Structure

- `src/admin`: Admin-specific pages and layouts.
- `src/auth`: Authentication modules (login, register).
- `src/shop`: Core storefront components and pages.
- `src/api`: Axios instances and API configurations.
- `src/components`: Shared UI components.
- `src/app.router.tsx`: Routing configuration.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` (if available) for more information.

