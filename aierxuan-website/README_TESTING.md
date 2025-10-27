# AIERXUAN Website - Testing Guide

Quick reference for running tests and verifying the application.

## 🚀 Quick Start

```bash
# Start development server
npm run dev

# Run all automated tests
npm test

# Or run individual test scripts
node scripts/test-full-login-flow.js
node scripts/test-rfq-rls-complete.js
node scripts/test-session-validation.js
node scripts/test-admin-dashboard-stats.js
```

## ✅ Test Status

**All Critical Tests**: ✅ PASSING (13/13)

| Test | Status | Command |
|------|--------|---------|
| Authentication | ✅ | `node scripts/test-full-login-flow.js` |
| RFQ Security | ✅ | `node scripts/test-rfq-rls-complete.js` |
| Session Validation | ✅ | `node scripts/test-session-validation.js` |
| Dashboard Stats | ✅ | `node scripts/test-admin-dashboard-stats.js` |

## 🔒 Security Verification

```bash
# Verify RFQ security (most important)
node scripts/test-rfq-rls-complete.js

# Expected output:
# ✅ anon cannot SELECT
# ✅ anon can INSERT
# ✅ service_role can SELECT
# ✅ Security isolation
# 4/4 tests passed
```

## 🌐 Manual Testing

### Test RFQ Form
1. Visit: http://localhost:3001
2. Scroll to bottom
3. Fill and submit form
4. Should redirect to `/thank-you`

### Test Admin Login
1. Visit: http://localhost:3001/admin
2. Login: `admin@aierxuan.com` / `admin123`
3. Should see dashboard with statistics

### Test Product Page
1. Visit: http://localhost:3001/products
2. Should see 5 products
3. Click language switcher (🇺🇸 EN → 🇨🇳 中文)
4. UI should switch to Chinese

## 📚 Documentation

- **FINAL_TEST_REPORT.md** - Complete test results
- **RFQ_RLS_SECURITY_FIX.md** - Security fix details
- **MANUAL_TEST_CHECKLIST.md** - Manual testing guide
- **DEPLOYMENT_READY_SUMMARY.md** - Deployment readiness

## 🐛 Troubleshooting

### RFQ Form Not Submitting
```bash
# Check RLS policies
node scripts/test-rfq-rls-complete.js

# If fails, re-execute SQL
# In Supabase SQL Editor:
# database/seed/secure-rfq-rls.sql
```

### Dashboard Shows Zero Statistics
```bash
# Verify service role is used
node scripts/test-admin-dashboard-stats.js

# Check src/app/admin/page.tsx uses:
# createSupabaseAdminClient()
```

### Login Not Working
```bash
# Test full login flow
node scripts/test-full-login-flow.js

# Check environment variables
cat .env.local | grep SUPABASE
```

## 🎯 Key Files

### Frontend
- `src/components/forms/RFQForm.tsx` - Main RFQ form
- `src/components/features/FinalCTA.tsx` - Homepage CTA
- `src/components/features/ProductGrid.tsx` - Product display
- `src/app/admin/page.tsx` - Admin dashboard

### Backend
- `database/seed/secure-rfq-rls.sql` - RFQ security policies
- `src/app/api/admin/login/route.ts` - Login API
- `src/app/api/admin/logout/route.ts` - Logout API

### Tests
- `scripts/test-full-login-flow.js` - Auth testing
- `scripts/test-rfq-rls-complete.js` - RFQ security
- `scripts/test-session-validation.js` - Session testing
- `scripts/test-admin-dashboard-stats.js` - Dashboard testing

## 🔑 Test Credentials

```
Admin:
  Email: admin@aierxuan.com
  Password: admin123
```

## 📊 Expected Results

### RFQ Security Test
```
✅ anon cannot SELECT (Count: 0)
✅ anon can INSERT (Success)
✅ service_role can SELECT (Count: >0)
✅ Security isolation (anon=0, service>0)
```

### Login Flow Test
```
✅ Login successful
✅ User info retrieved
✅ Dashboard accessible
✅ Logout successful
✅ Logout verified (401)
```

### Dashboard Stats Test
```
ANON Key:
  Total RFQs: 0 (secure)
  Total Products: 5

SERVICE Key:
  Total RFQs: >0 (accurate)
  Total Products: 5
  Blog Posts: 3
  FAQs: 9
```

## 🚨 Critical Checks

Before deployment, verify:

```bash
# 1. RFQ security
node scripts/test-rfq-rls-complete.js
# Must show: 4/4 tests passed

# 2. Authentication
node scripts/test-full-login-flow.js
# Must show: All tests passed

# 3. Manual RFQ submission
# Visit http://localhost:3001
# Submit form → Should redirect to /thank-you

# 4. Admin access
# Visit http://localhost:3001/admin
# Login → Should see dashboard with stats
```

## 💡 Tips

1. **Always run tests after code changes**
2. **Check browser console for errors**
3. **Verify database changes in Supabase**
4. **Test with both anon and admin users**
5. **Clear browser cache if issues persist**

## 📞 Need Help?

1. Check documentation in `docs/` folder
2. Review test output for specific errors
3. Verify environment variables in `.env.local`
4. Check Supabase logs for database errors

---

**Status**: ✅ All tests passing  
**Last Updated**: 2025-10-15  
**Version**: 1.0.0

