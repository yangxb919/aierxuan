#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('📝 RFQ Table Creation SQL')
console.log('=' .repeat(80))
console.log('\nPlease execute the following SQL in Supabase SQL Editor:')
console.log('(Go to: https://supabase.com/dashboard/project/dudvgnkvukujhqatolqm/sql/new)\n')
console.log('=' .repeat(80))

const sqlPath = path.join(__dirname, '..', 'database', 'seed', 'create-rfq-table.sql')
const sql = fs.readFileSync(sqlPath, 'utf8')

console.log(sql)
console.log('=' .repeat(80))
console.log('\n✅ After executing the SQL, test the RFQ form at:')
console.log('   http://localhost:3000/contact')

