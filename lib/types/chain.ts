import z from "https://deno.land/x/zod@v3.22.4/index.ts";
import * as schemas from '../schemas/mod.ts'

export type Chain = z.infer<typeof schemas['chain']>