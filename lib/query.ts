import { Chain } from './types/chain.ts'
import * as schemas from './schemas/mod.ts'
export async function query(chainId:number):Promise<Error|Chain> {
  return await fetch(`https://cdn.jsdelivr.net/gh/ethereum-lists/chains/_data/chains/eip155-${chainId}.json`)
    .then(response => response.json())
    .then(schemas.chain.parseAsync)
    .catch(reason => new Error(reason))
}