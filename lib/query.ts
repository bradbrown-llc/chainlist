import { Chain } from './types/chain.ts'
import { Snail } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/snail@0.0.3/mod.ts";
import { Toad } from "https://cdn.jsdelivr.net/gh/bradbrown-llc/toad@0.0.10/mod.ts";
import * as schemas from './schemas/mod.ts'
export async function query(toad:Toad, chainId:number, { signal }:{ signal?:AbortSignal }={}):Promise<Error|Chain> {
  const lazy = async () => await fetch(
    `https://cdn.jsdelivr.net/gh/ethereum-lists/chains/_data/chains/eip155-${chainId}.json`,
    { signal }
  )
    .then(response => response.json())
    .then(schemas.chain.parseAsync)
    .catch(reason => new Error(reason))
  const snail = new Snail({ lazy, signal })
  snail.died.catch(r => r)
  return await toad.feed(snail).catch(r => r)
}