import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'node:fs/promises';

const serviceAccount = JSON.parse(
  await readFile(new URL('../serviceAccountKey.json', import.meta.url), 'utf8')
);

initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const db = getFirestore();
  const products = JSON.parse(
  await readFile(new URL('../sample-products.json', import.meta.url), 'utf8')
);

for (const p of products) {
  const { id, ...data } = p;
  await db.doc(`products/${id}`).set({ ...data, createdAt: new Date() });
}

await db.doc('settings/store').set({
  storeName: 'Oosatyabhama',
  contactNumber: '',
  whatsappNumber: '',
  storeEmail: '',
});

console.log(`Seeded ${products.length} sample products and store settings.`);