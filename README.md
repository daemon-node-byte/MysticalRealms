# Mystical Realms (monorepo)

This is a monorepo for the Mystical Realms project, which includes multiple packages and applications. The structure is designed to facilitate development and collaboration across different components of the project.

## Technologies Used

- **TypeScript**: For type safety and modern JavaScript features.
- **Next.js**: For building server-rendered React applications.
- **Babylon.js**: For building interactive 3D experiences.
- **Radix UI**: For building user interfaces with a set of accessible and customizable components.
- **Tailwind CSS**: For utility-first CSS styling.
- **Supabase** (postgres): For backend services including authentication and database management.
- **pnpm**: For package management and monorepo support.
- **Python FastApi**: For building APIs and handling backend logic.
- **Docker**: For containerization development and deployment.

---

## Usage

The best way to get started use Mystical Realms is to visit the [Mystical Realms website](https://mysticalrealms.com) and explore the features. You can also clone the repository and run the applications locally.

### Prerequisites for running on local machine

- Docker & Docker Compose
- Node.js (v18 or later)
- pnpm (for package management)
- Python (v3.8 or later)
- This repository should be cloned to your local machine.

1. Clone the repository:

```bash
git clone
```

#### Development mode

2. Start supabase services (database, auth, storage):

You'll need the fake environment variables for Supabase if you don't have them. You can create a `.env` file in the `packages/supabase` directory by copying the example file:

```bash
cp packages/supabase/.env.example packages/supabase/.env
```

```bash
docker compose -f packages/supabase/docker-compose.yml up -d
```

3. Start the frontend and backend services:

```bash
docker compose -f compose.dev.yml up -d --build
```

#### Alterinatively, you can run the shell script to start the development environment:

```bash
bash scripts/start_dev.sh
```
