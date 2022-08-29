import { createRouter } from "./context";
import { z } from "zod";
import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetHistory,
  InitLedger,
  readAsset,
  updateAsset,
} from "../../utils/ledgerfunctions";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `HELLO DUMBUCK ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getallassets", {
    async resolve() {
      const assets = await getAllAssets();
      return {
        assets,
      };
    },
  })
  .query("getasset", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const asset = await readAsset(input.id);
      return {
        asset,
      };
    },
  })
  .query("getassethistory", {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const history = await getAssetHistory(input.id);
      return {
        history,
      };
    },
  })
  .mutation("createAsset", {
    input: z.object({
      ID: z.string(),
      Color: z.string(),
      Size: z.string(),
      Owner: z.string(),
      AppraisedValue: z.string(),
    }),
    async resolve({ input }) {
      const id = await createAsset(input);
      return {
        id,
      };
    },
  })
  .mutation("updateAsset", {
    input: z.object({
      ID: z.string(),
      Color: z.string(),
      Size: z.string(),
      Owner: z.string(),
      AppraisedValue: z.string(),
    }),
    async resolve({ input }) {
      await updateAsset(input);
      return {
        success: true,
      };
    },
  })
  .mutation("deleteAsset", {
    input: z.object({ ID: z.string() }),
    async resolve({ input }) {
      try {
        await deleteAsset(input.ID);
      } catch (error) {
        return {
          success: false,
        };
      }
      return {
        success: true,
      };
    },
  })
  .query("initLedger", {
    async resolve() {
      try {
        await InitLedger();
      } catch (error) {
        return {
          error: error,
        };
      }
      return {
        success: true,
      };
    },
  });
