// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { ledgerRouter } from "./hyperledger_router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("hyperledger.", ledgerRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
