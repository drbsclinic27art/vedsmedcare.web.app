import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rulesPath = path.resolve(process.cwd(), 'firestore.rules');
const blueprintPath = path.resolve(process.cwd(), 'firebase-blueprint.json');
const rulesText = fs.readFileSync(rulesPath, 'utf8');
const blueprint = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));

test('firestore.rules enforces default-deny global safety net and rules_version 2', () => {
  assert.match(rulesText, /rules_version\s*=\s*'2';/);
  assert.match(rulesText, /match \/\{document=\*\*\}\s*\{\s*allow read, write: if false;\s*\}/);
});

test('every collection declared in firebase-blueprint.json has an explicit match block in firestore.rules', () => {
  const firestorePaths = Object.keys(blueprint.firestore);
  for (const colPath of firestorePaths) {
    assert.ok(
      rulesText.includes(`match ${colPath}`),
      `Missing match block for blueprint path: ${colPath}`
    );
  }
});

test('Dirty Dozen #1 & #2: email spoofing and self-assigned admin escalation are blocked', () => {
  assert.match(rulesText, /request\.auth\.token\.email_verified == true/);
  assert.match(rulesText, /match \/admins\/\{adminUid\}[\s\S]*allow create:[\s\S]*isAdmin\(\)/);
});

test('Dirty Dozen #3 & #4: PII enquiries are admin-only readable and drafts cannot leak publicly', () => {
  assert.match(rulesText, /match \/enquiries\/\{enquiryId\}[\s\S]*allow get: if isValidId\(enquiryId\) && isAdmin\(\);/);
  assert.match(rulesText, /match \/enquiries\/\{enquiryId\}[\s\S]*allow list: if isAdmin\(\);/);
  assert.match(rulesText, /match \/articles\/\{articleId\}[\s\S]*existing\(\)\.published == true\) \|\| isAdmin\(\)/);
});

test('Dirty Dozen #5-#12: strict key allowlists, consent gate, status lock, server timestamps, ID & size guards exist', () => {
  assert.match(rulesText, /data\.keys\(\)\.hasOnly\(/);
  assert.match(rulesText, /data\.consentAccepted == true/);
  assert.match(rulesText, /incoming\(\)\.status == 'new'/);
  assert.match(rulesText, /incoming\(\)\.createdAt == request\.time/);
  assert.match(rulesText, /incoming\(\)\.createdAt == existing\(\)\.createdAt/);
  assert.match(rulesText, /isValidId\(/);
  assert.match(rulesText, /isValidString\(data\.message, 10, 3000\)/);
  assert.match(rulesText, /isValidStringList\(data\.brandNames, 10\)/);
});

test('reviews collection enforces public approval gate, 1-5 rating bounds, and admin-only writes', () => {
  assert.match(rulesText, /match \/reviews\/\{reviewId\}[\s\S]*existing\(\)\.approved == true\) \|\| isAdmin\(\)/);
  assert.match(rulesText, /match \/reviews\/\{reviewId\}[\s\S]*allow list: if resource\.data\.approved == true \|\| isAdmin\(\);/);
  assert.match(rulesText, /data\.rating is int && data\.rating >= 1 && data\.rating <= 5/);
});
