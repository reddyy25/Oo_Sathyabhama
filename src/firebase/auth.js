import { signInWithEmailAndPassword, signOut, onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from './firebase';
export const adminLogin = (email,password) => signInWithEmailAndPassword(auth,email,password);
export const adminLogout = () => signOut(auth);
export const watchAdmin = (callback) => onAuthStateChanged(auth, async user => {
  if (!user) return callback(null);
  try { const token = await getIdTokenResult(user,true); callback(token.claims.admin === true ? user : null, token.claims.admin === true ? null : 'This account is not authorized as an administrator.'); }
  catch { callback(null,'Unable to verify administrator access.'); }
});
