import { describe, it } from 'vitest'
import * as fc from 'fast-check'

// Placeholder PBT for the Redactor module.
// Real properties live here once redactor.ts is implemented.
describe('Redactor PBT — invariants', () => {
  it('placeholder: strings passed through are still strings', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        return typeof s === 'string'
      }),
    )
  })
})
