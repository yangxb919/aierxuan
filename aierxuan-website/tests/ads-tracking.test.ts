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

test('ContactModal awaits the secure RFQ API before tracking a contact_modal lead', () => {
  const source = readFileSync(
    new URL('../src/components/ui/ContactModal.tsx', import.meta.url),
    'utf8',
  )

  assert.match(source, /import \{ trackLeadFormSubmit \} from '@\/lib\/ads-tracking'/)
  assert.doesNotMatch(source, /createSupabaseClient/)
  assert.doesNotMatch(source, /\.from\('rfqs'\)/)

  const submitIndex = source.indexOf("await fetch('/api/send-rfq-email'")
  const errorCheckIndex = source.indexOf('if (!response.ok)')
  const trackIndex = source.indexOf('trackLeadFormSubmit({')

  assert.notEqual(submitIndex, -1)
  assert.notEqual(errorCheckIndex, -1)
  assert.notEqual(trackIndex, -1)
  assert.ok(submitIndex < errorCheckIndex)
  assert.ok(errorCheckIndex < trackIndex)

  assert.match(
    source,
    /trackLeadFormSubmit\(\{\s*lang: language,\s*productInterest: 'general',\s*source: 'contact_modal',?\s*\}\)/s,
  )
})
