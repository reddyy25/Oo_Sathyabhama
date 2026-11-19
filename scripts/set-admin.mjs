import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFile } from 'node:fs/promises';

const [uid] = process.argv.slice(2);
if (!uid) {
  throw new Error('Usage: node scripts/set-admin.mjs <FIREBASE_AUTH_UID>');
}

const serviceAccount = JSON.parse(
  await readFile(new URL('../serviceAccountKey.json', import.meta.url), 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

await getAuth().setCustomUserClaims(uid, { admin: true });
console.log(`Set admin claim for UID: ${uid}`);