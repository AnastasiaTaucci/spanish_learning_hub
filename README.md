# Spanish Learning Hub

## Overview

Spanish Learning Hub is a React Native mobile app built with Expo to help users organize Spanish learning resources in one place. Users can browse resources, search by keyword, save favorites, open resource links, and add, edit, or delete custom resources.

This project was developed as part of a mobile app development course to practice building cross-platform apps with React Native, Expo Router, reusable components, shared app state, backend integration, local caching, testing, and code quality tools.

## Features

- Browse Spanish learning resources stored in Supabase
- Search resources by title, category, or description
- View resource details and open external links
- Add new learning resources
- Edit existing resources
- Delete resources
- Save and remove favorite resources
- View favorite resources in a separate tab
- Cache recent resources and favorites locally with AsyncStorage
- Use React Query to refresh resource and favorite data after changes
- Navigate between tabs, detail screens, and forms using Expo Router
- Validate add/edit resource forms with Formik and Yup

## Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- Supabase
- React Query / TanStack Query
- AsyncStorage
- React Context
- Formik
- Yup
- Gluestack UI
- React Native Paper
- Jest
- ESLint
- Husky

## Data Management

The app uses Supabase as the backend database for resources and favorites.

React Query is used to fetch data, manage loading states, run create/update/delete mutations, and refresh cached queries after changes. React Context is used to expose shared resource and favorite data/actions across the app, so screens can access them without prop drilling.

AsyncStorage is used to cache a limited set of recent resources and favorite data locally, allowing the app to display saved data quickly when it starts.

## Testing and Code Quality

- Used Jest to test selected app logic and support more reliable behavior during development.
- Used ESLint to catch code issues and keep the codebase more consistent.
- Used Husky to run development checks before commits.

## Supabase Tables

### `resources`

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Unique resource ID |
| `title` | Text | Resource title |
| `group` | Text | Resource category |
| `description` | Text | Short resource description |
| `link` | Text | External resource link |

### `favorites`

| Column | Type | Description |
|---|---|---|
| `id` | UUID | Unique favorite record ID |
| `resource_id` | UUID | References the saved resource |

## Project Structure

```bash
/app              # App routes and screens
/context          # Resources and favorites context providers
/hooks            # Custom React Query hooks
/components       # Shared UI components
/utils            # Supabase and jest setup and helper utilities
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- Expo Go app on a mobile device, or an emulator/simulator
- Expo tooling through `npx expo`

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AnastasiaTaucci/spanish_learning_hub.git
cd spanish_learning_hub
```

2. Install dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Open the app:

- Scan the QR code with Expo Go on your phone, or
- Run the app in an emulator/simulator.

## Configuration Note

This project uses Supabase for backend data.

To run it with your own backend, create a Supabase project, add the required `resources` and `favorites` tables, and update the Supabase configuration in the project.

The current version was built as a course/demo project and uses a development Supabase setup.

## Skills Demonstrated

- React Native mobile development
- Expo Router navigation
- TypeScript
- Supabase backend integration
- CRUD functionality
- React Query / TanStack Query
- React Context for shared app state
- AsyncStorage local caching
- Form handling with Formik
- Validation with Yup
- Search and filtering
- Tab and stack navigation
- Reusable component structure
- Unit testing with Jest
- Code quality checks with ESLint
- Git workflow automation with Husky