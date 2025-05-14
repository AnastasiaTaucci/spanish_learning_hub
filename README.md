# Spanish Learning Hub 📚🇪🇸

## Overview  
Spanish Learning Hub is a full-stack mobile app built with React Native (Expo), designed to help users track and manage learning resources such as grammar guides, vocabulary tools, YouTube channels, and more.

This project was developed as part of a mobile app development course to practice building cross-platform apps with React Native, including fundamentals like routing, component design, data handling, and backend integration using Supabase, React Query, and AsyncStorage.

## 🔧 Tech Stack
- React Native + Expo Router (mobile app & navigation)

- Supabase (cloud database and authentication)

- React Query (data fetching & caching)

- AsyncStorage (local storage for offline access)

- Formik + Yup (form validation)

- Gluestack UI – for consistent component styling in parts of the UI

## ✨ Features

- Browse learning resources (stored in Supabase)

- Add, edit, and delete custom resources

- Mark favorites with a heart icon toggle

- Filter/search resources by keyword

- Offline caching using AsyncStorage

- Mobile-optimized, cross-platform layout


## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js

- Expo CLI

🔐 A Supabase account is not required to run this project.
The app uses a public Supabase project and test user credentials embedded in the code for demo purposes.
You can optionally create your own Supabase account and replace the keys and login credentials (in RootLayout) if you prefer a private setup.


## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/AnastasiaTaucci/spanish_learning_hub.git
   cd spanish-learn-hub

2. Install dependencies:

   ```bash
   npm install

3. Start the Expo app:

   ```bash
   npx expo start
   
## 🛠 Supabase Configuration & Table Setup

A single test user is automatically signed in on app launch (test@example.com). Supabase is used as the cloud backend to store resources and favorites.

### Tables

#### 1. `resources`

| Column       | Type           | Description            |
|--------------|----------------|------------------------|
| `id`         | UUID (PK)      | Unique resource ID     |
| `title`      | Text           | Resource title         |
| `group`      | Text           | Category or group name |
| `description`| Text           | Brief description      |
| `link`       | Text           | Resource link          |

---

#### 2. `favorites`

| Column        | Type           | Description                              |
|---------------|----------------|------------------------------------------|
| `id`          | UUID (PK)      | Unique favorite record ID                |
| `resource_id` | UUID (FK)      | References `resources.id` (the resource) |


#### RLS Policies

Row-level security (RLS) is enabled. Policies are currently permissive for development and testing purposes: USING (true)

## ⚙️ React Query is used to:

- Fetch resource and favorite data from Supabase

- Handle loading and error states automatically

- Invalidate and refetch data on add, edit, or delete

- Provide optimistic UI updates when managing favorites


## 📦 AsyncStorage is used for offline support:

- A limited set of resources (e.g., the last 5 added) and full favorite items are cached locally using AsyncStorage.

- On app startup, cached data is loaded first for instant display

- When new data is fetched from Supabase, it overwrites the cache

This makes the app usable even without a network connection.


## 📁 Project Structure Highlights

   ```bash
   /app              → App routes & screens
   /context          → Favorites and Resources context providers
   /hooks            → Custom React Query hooks
   /components       → Shared UI components (cards, inputs, icons)

