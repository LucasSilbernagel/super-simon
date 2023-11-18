# Super Simon

The classic memory game Simon, with a twist! How long of a sequence can you remember? Super Simon is a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) that can be played on the web, installed on your device, and even played offline!

![super-simon](https://github.com/LucasSilbernagel/super-simon/assets/57023164/d9372004-4360-43b7-af8c-78add4c8c35f)

## Live Link

[https://super-simon-kappa.vercel.app/](https://super-simon-kappa.vercel.app/)

## Tech Stack

### Front End

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [next-pwa](https://www.npmjs.com/package/next-pwa)
- [howler](https://howlerjs.com/)
- [react-icons](https://www.npmjs.com/package/react-icons)
- [framer-motion](https://www.framer.com/motion/)

### Data storage (for the leaderboard)

- [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore)

### Linting & Formatting

- [eslint-config-lucas-silbernagel](https://www.npmjs.com/package/eslint-config-lucas-silbernagel)

## Run Locally

### Prerequisites

In order to run this application locally, you must have node installed on your computer. To check if you already have it installed, enter `node -v` in your terminal. If you do not have node, you can install it here: https://nodejs.org/en/

### Clone the repository

Once you have confirmed that node is installed, `cd` into a folder on your computer and run the following command to clone the repository:

`git clone https://github.com/LucasSilbernagel/super-simon.git`

Then `cd` into the project folder and open it in your code editor. For Visual Studio Code:

`cd super-simon`
`code .`

### Environment variables

- Create a [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore).
- Create a `.env` file in the root of the `super-simon` project and save your Firebase credentials there as below:

```
NEXT_PUBLIC_FIREBASE_API_KEY=********************
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=*******************
NEXT_PUBLIC_FIREBASE_PROJECT_ID=*********************
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=***********************
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=*************************
NEXT_PUBLIC_FIREBASE_APP_ID=**************************
```

### Install dependencies

To install all of the required dependencies, run `npm install`.

### Start up the app

- To start up the app locally, run `npm run dev` in your terminal. Your terminal should indicate a `localhost` URL at which you can view the app in your browser, most likely http://localhost:3000/.

## Testing

### Unit Tests

Unit tests are written with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

Use `npm run test-unit` to run all unit tests, or use `npm run test-unit SomeFileToRun` to run a specific test file.

### E2E Tests

E2E tests are written with [Playwright](https://playwright.dev/).

Use `npm run test-e2e` to run all E2E tests.
