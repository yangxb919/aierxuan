import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { brandFacts } from '../src/lib/brand-facts'

const en = JSON.parse(readFileSync(new URL('../src/dictionaries/en.json', import.meta.url), 'utf8'))
const ru = JSON.parse(readFileSync(new URL('../src/dictionaries/ru.json', import.meta.url), 'utf8'))
const zhCN = JSON.parse(readFileSync(new URL('../src/dictionaries/zh-CN.json', import.meta.url), 'utf8'))
const aboutPageSource = readFileSync(new URL('../src/app/[lang]/about/page.tsx', import.meta.url), 'utf8')
const oemPageSource = readFileSync(new URL('../src/app/[lang]/oem/page.tsx', import.meta.url), 'utf8')
const faqPageSource = readFileSync(new URL('../src/app/[lang]/faq/FAQPageClient.tsx', import.meta.url), 'utf8')

test('canonical brand facts are the single source for core GEO claims', () => {
  assert.equal(brandFacts.foundedYear, '2014')
  assert.equal(brandFacts.moq, '100+')
  assert.equal(brandFacts.sampleLeadTimeText, '7-15 days')
  assert.equal(brandFacts.standardProductionLeadTimeText, '15-25 days')
  assert.equal(brandFacts.countriesServed, '50+')
  assert.equal(brandFacts.unitsShipped, '500,000+')
  assert.equal(brandFacts.facilityArea, '15,000㎡')
  assert.deepEqual(brandFacts.certifications, ['CE', 'FCC', 'RoHS', 'ISO 9001', 'ISO 14001'])
})

test('English public dictionary uses the canonical order and lead-time facts', () => {
  assert.match(en.about.story.subtitle, /2014/)
  assert.match(en.oem.meta.description, /MOQ from 100 units/)
  assert.doesNotMatch(en.oem.meta.description, /MOQ from 300 units/)
  assert.doesNotMatch(JSON.stringify(en.faq), /300 units for OEM orders and 500 units for ODM orders/)
  assert.match(JSON.stringify(en.faq), /standard MOQ starts at 100 units/)
  assert.match(JSON.stringify(en.faq), /Samples take 7-15 days/)
  assert.match(JSON.stringify(en.faq), /standard production orders take 15-25 days/)
})

test('Russian public dictionary uses the canonical order and lead-time facts', () => {
  assert.match(ru.about.story.subtitle, /2014/)
  assert.match(ru.oem.meta.description, /MOQ от 100/)
  assert.doesNotMatch(JSON.stringify(ru.faq), /MOQ составляет 300/)
  assert.match(JSON.stringify(ru.faq), /стандартный MOQ начинается от 100/)
  assert.match(JSON.stringify(ru.faq), /Образцы занимают 7-15 дней/)
})

test('Chinese public dictionary no longer exposes the old 300/500 unit MOQ claim', () => {
  assert.match(zhCN.oem.meta.description, /起订量100台起/)
  assert.match(zhCN.oem.services.oem.moq, /100台起/)
  assert.doesNotMatch(JSON.stringify(zhCN.oem), /起订量300台|300台起/)
  assert.doesNotMatch(JSON.stringify(zhCN.faq), /OEM订单300台，ODM订单500台/)
  assert.match(JSON.stringify(zhCN.faq), /标准起订量从100台起/)
})

test('core public pages reference the shared brand facts instead of stale literals', () => {
  assert.match(aboutPageSource, /brandFacts\.foundedYear/)
  assert.match(aboutPageSource, /brandFacts\.intelPartnerSince/)
  assert.doesNotMatch(aboutPageSource, /Since 2017|^\s*\['2017'/m)

  assert.match(oemPageSource, /brandFacts\.moqText/)
  assert.match(oemPageSource, /brandFacts\.sampleLeadTimeText/)
  assert.match(oemPageSource, /brandFacts\.standardProductionLeadTimeText/)
  assert.doesNotMatch(oemPageSource, /Flexible MOQ \| 7-15 Day Samples/)

  assert.match(faqPageSource, /brandFacts\.moqText/)
  assert.match(faqPageSource, /brandFacts\.sampleLeadTimeText/)
  assert.doesNotMatch(faqPageSource, /7-15 Day Samples/)
})
