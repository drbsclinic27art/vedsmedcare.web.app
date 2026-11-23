# Security Specification — Ved's Medcare Firestore Rules

## 1. Data Invariants
1. **Default Deny**: All unspecified paths under `/databases/{database}/documents` are denied for both reads and writes.
2. **Verified Admin RBAC**: Only verified users (`request.auth.token.email_verified == true`) whose email matches the bootstrapped founder/owner admin email (`drbsclinic27@gmail.com`) or who hold an entry in `/admins/{request.auth.uid}` can create, update, or delete catalog/editorial records (`medicines`, `articles`, `pharmacyNotes`, `products`, `categories`, `siteSettings`) or view/manage `enquiries`.
3. **Draft Isolation**: Unauthenticated and non-admin visitors can only `get` or `list` documents in `medicines`, `articles`, `pharmacyNotes`, `products`, and `categories` where `resource.data.published == true`.
4. **PII Isolation (`enquiries` & `admins`)**: Visitor enquiries (`name`, `email`, `phone`, `message`) can be created publicly ONLY when `consentAccepted == true`, `status == 'new'`, `createdAt == request.time`, and all strings obey strict length limits. Reading, listing, updating, or deleting enquiries is strictly limited to `isAdmin()`.
5. **Immutable Audit Fields & Server Timestamps**: `createdAt` is immutable on update and must equal `request.time` on create. `updatedAt` must equal `request.time` on create and update. `updatedBy` must equal `request.auth.uid`.
6. **Path ID Hardening**: Every single-document `get`, `create`, `update`, `delete` checks `isValidId(docId)` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
7. **Strict Key Allowlists & Array Bounds**: Every entity enforces `hasAll` + `hasOnly` on create, `affectedKeys().hasOnly(...)` on update, bounded array lengths (<= 10–12), and type-checked first element when non-empty.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unverified Admin Email Spoof**: Auth with `email: "drbsclinic27@gmail.com"` and `email_verified: false` attempting `medicines/paracetamol` create -> **DENIED**.
2. **Self-Assigned Admin Escalation**: Authenticated non-admin user writing `/admins/{uid}` with `{ role: "super_admin" }` -> **DENIED**.
3. **PII Blanket Read on Enquiries**: Authenticated non-admin user calling `get` or `list` on `/enquiries` -> **DENIED**.
4. **Draft Content Leak**: Public visitor calling `get` on `/articles/draft-post` where `published: false` -> **DENIED**.
5. **Shadow Ghost Field Injection**: Admin creating a medicine with an extra `"isOfficialPrescription": true` field -> **DENIED** via `hasOnly`.
6. **Consent Bypass on Enquiry**: Visitor submitting `/enquiries/enq-1` with `consentAccepted: false` -> **DENIED**.
7. **Status Shortcutting on Enquiry Create**: Visitor submitting `/enquiries/enq-2` with `status: "resolved"` instead of `"new"` -> **DENIED**.
8. **Client Timestamp Forgery**: Creating a medicine with backdated `createdAt` (`!= request.time`) -> **DENIED**.
9. **Immutable Field Tampering**: Updating a medicine and altering `createdAt` -> **DENIED**.
10. **Path ID Poisoning**: Creating `/enquiries/` with a 300-char junk ID containing invalid characters -> **DENIED** by `isValidId`.
11. **Denial-of-Wallet String Overflow**: Creating an enquiry with a 50,000-character `message` -> **DENIED** by `.size() <= 3000`.
12. **Array Type / Bound Poisoning**: Creating a medicine with 25 `brandNames` or non-string element `[123]` -> **DENIED** by bounded array guard.
