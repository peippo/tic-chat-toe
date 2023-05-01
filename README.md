<img src="https://tic-chat-toe.vercel.app/banner.png" alt="Banner image">

A tic-tac-toe game built for [Twoday](https://www.twoday.fi/) coding challenge. Opponent moves and comments are prompted from ChatGPT.

Other features include viewing other players' ongoing games live & past games turn-by-turn, player statistics and ability to delete your own games.

Turns out ChatGPT-3.5 is a pretty bad tic-tac-toe player, and the real challenge is to actually lose a game! Still waiting for my GPT-4 API access, interesting to see if it can play better.

### <a href="https://tic-chat-toe.vercel.app/">Open the project</a>

## Tech

- [TypeScript](https://typescriptlang.org)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Jotai](https://jotai.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [LangChain](https://js.langchain.com/docs/)
- [Vitest](https://vitest.dev/)
- [Playwright](https://playwright.dev/)
- [Mock Service Worker](https://mswjs.io/)
- [NextAuth.js](https://next-auth.js.org/)

## Running locally

### App

[Register for a ChatGPT API key](https://platform.openai.com/) at OpenAI & add the key to `.env`. Generate the `NEXTAUTH_SECRET` as instructed in `.env-example` and add the OAuth details for at least one of the [providers](https://next-auth.js.org/configuration/providers/oauth#built-in-providers). Remove the rest at `.env`, `src/env.mjs` & `src/server/auth.ts`.

```bash
cp .env-example .env
yarn install
yarn dev
```

### DB

Start a Postgres database, synchronize the Prisma schema and optionally seed it with data for a few games.

```bash
docker-compose up
npx prisma db push
npx prisma db seed
```

### Tests

Run Vitest & Playwright tests with or without a browser interface.
Next needs to run with dev:test to enable MSW API mocking.

```bash
yarn dev:test
yarn test:ui
yarn test
```

## To-do

- Connect the console buttons to the UI
- Figure out if ChatGPT's moves can be improved with different prompting
- Tests for content behind authentication

## Acknowledgements

- Project bootstrapped with [create-t3-app](https://github.com/t3-oss/create-t3-app)
