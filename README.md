# UNISA Nexus Hub – Student Resource Portal

A role-based student resource management portal built for UNISA (University of South Africa) students and team administrators. The hub centralises secure file storage, meeting scheduling, team coordination, ad management, and activity auditing — all within a polished, accessible web interface.

---

## Features

- **Secure Vault** – Upload, encrypt/decrypt, and manage shared study files and resources.
- **Meetings** – Schedule, view, and manage team or study-group meetings.
- **Team Sharing** – Admins can manage team members, assign roles, and coordinate collaborative workspaces.
- **Ad Manager** – Create, update, and delete promotional or announcement ads (Admin & Marketing Manager roles).
- **Audit Log** – Full activity trail of user actions with timestamps, severity levels, and event details.
- **Hybrid Sync** – Queue and track large file transfers with auto-sync support.
- **Role-Based Access Control** – Views and tabs are conditionally rendered based on user roles: `Owner/Admin`, `Sync Manager`, `Marketing Manager`, and standard users.
- **Authentication** – Login, logout, and sign-up flows with session state managed via React Context.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build Tool | [Vite 5](https://vitejs.dev/) |
| Component Library | [Shadcn UI](https://ui.shadcn.com/) |
| Primitive Components | [Radix UI](https://www.radix-ui.com/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Routing | [React Router DOM v6](https://reactrouter.com/) |
| Data Fetching | [TanStack React Query v5](https://tanstack.com/query) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |

---

## Project Structure

```
unisa-nexus-hub-main/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── common/          # Shared components (Header, NavLink, etc.)
│   │   └── ui/              # Shadcn UI component library
│   ├── contexts/
│   │   └── AppContext.jsx   # Global state: auth, vault, meetings, ads, teams, sync
│   ├── data/                # Initial seed data
│   ├── hooks/               # Custom React hooks (use-mobile, use-toast)
│   ├── lib/                 # Utility helpers
│   ├── pages/
│   │   ├── Index.tsx        # Entry page
│   │   └── NotFound.tsx     # 404 fallback
│   ├── styles/              # Global styles
│   ├── views/
│   │   ├── Dashboard.jsx    # Main tabbed dashboard
│   │   ├── features/
│   │   │   ├── Vault.jsx    # Secure file vault
│   │   │   └── Meetings.jsx # Meeting scheduler
│   │   └── admin/
│   │       ├── AdManager.jsx   # Advertisement management
│   │       ├── AuditLog.jsx    # Activity audit trail
│   │       └── TeamSharing.jsx # Team & role management
│   ├── App.tsx              # Root component & router
│   └── main.tsx             # Application entry point
├── components.json          # Shadcn UI configuration
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later (or [bun](https://bun.sh/))

### Installation

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd unisa-nexus-hub-main

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:8080` (or the port Vite selects).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server with HMR |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the project |

---

## Related Projects

This project lives alongside two sibling projects within the `uds-vault` workspace:

- **`uds-vault/`** – Core vault source module
- **`uds-vaultd/`** – Standalone vault daemon / standalone HTML build

These are separate applications that complement the Nexus Hub.

---

## User Roles

| Role | Vault | Meetings | Team Sharing | Audit Log | Ad Manager |
|---|:---:|:---:|:---:|:---:|:---:|
| Owner/Admin | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sync Manager | ✅ | ✅ | ❌ | ❌ | ❌ |
| Marketing Manager | ✅ | ✅ | ❌ | ❌ | ✅ |
| Student (default) | ✅ | ✅ | ❌ | ❌ | ❌ |

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2024 UNISA Nexus Hub Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
