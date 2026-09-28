# Mona Lisa Smile Indigents Foundation: Website

The official website of the **Mona Lisa Smile Indigents Foundation (MLSI)**, a Nigerian NGO based in Abuja. MLSI empowers indigent children and disadvantaged communities through education, welfare relief and community care programmes.

## Features

- **Programmes and campaigns:** the foundation's programmes, plus fundraising campaigns with live progress bars
- **Donations:** give by bank transfer, and record the donation so the team can confirm it
- **Events:** upcoming events and outreach activities
- **Gallery:** photos from the foundation's work
- **Get involved:** volunteer sign-up and membership
- **Accounts:** supporters register and sign in to see their dashboard and notifications
- **Admin dashboard:** manage campaigns, events, donations, volunteers, members and notifications
- An animated, responsive design with impact counters and testimonials

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React and TypeScript
- Firebase Authentication and Cloud Firestore
- Tailwind CSS and Framer Motion
- react-hook-form and Zod for form validation

## Getting started

```bash
git clone https://github.com/justHarryCodes/Monalisa-NGO.git
cd Monalisa-NGO
npm install
# create .env.local with the Firebase variables below
npm run dev          # http://localhost:3000
```

## Environment variables

These come from your Firebase project's web app configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

Firestore collections: `campaigns`, `donations`, `events`, `members`, `notifications`, `users`, `volunteers`.

## Project structure

```
app/
├── about/  programs/  campaigns/  events/  gallery/     # Public content
├── donate/  volunteer/  get-involved/  contact/         # Ways to help
├── auth/  dashboard/                                    # Supporter accounts
└── admin/                                               # Admin dashboard
components/   # Navbar, Footer, CampaignCard, EventCard, ImpactCounter, …
context/      # Auth context
lib/          # Firebase setup and Firestore helpers
```

## Deployment

The site deploys to [Vercel](https://vercel.com). Add the Firebase variables in the project settings.
