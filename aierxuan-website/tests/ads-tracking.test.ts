import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { trackLeadFormSubmit } from '../src/lib/ads-tracking'

test('trackLeadFormSubmit includes nominal conversion value for lead events', () => {
  const windowStub = {
    dataLayer: [] as Array<Record<string, unknown>>,
    location: { href: 'https://www.aierxuanlaptop.com/en/contact' },
  }

  Object.assign(globalThis, { window: windowStub })

  trackLeadFormSubmit({
    lang: 'en',
    productInterest: 'general',
    source: 'contact_modal',
  })

  assert.deepEqual(
    windowStub.dataLayer.map((event) => event.event),
    ['rfq_submit', 'generate_lead'],
  )

  for (const event of windowStub.dataLayer) {
    assert.equal(event.value, 1)
    assert.equal(event.currency, 'USD')
    assert.equal(event.source, 'contact_modal')
  }
})

test('ContactModal success path records a contact_modal lead', () => {
  const source = readFileSync(
    new URL('../src/components/ui/ContactModal.tsx', import.meta.url),
    'utf8',
  )

  assert.match(source, /import \{ trackLeadFormSubmit \} from '@\/lib\/ads-tracking'/)
  assert.match(
    source,
    /trackLeadFormSubmit\(\{\s*lang: language,\s*productInterest: 'general',\s*source: 'contact_modal',?\s*\}\)/s,
  )
})
