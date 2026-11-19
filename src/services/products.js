import { collection, getDocs, getDoc, doc, query, where, orderBy, limit, setDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
export async function getProducts({category,flag}={}) {
  const constraints=[]; if(category && category!=='All') constraints.push(where('category','==',category)); if(flag==='new') constraints.push(where('isNewArrival','==',true)); if(flag==='best') constraints.push(where('isBestSeller','==',true));
  const snap=await getDocs(query(collection(db,'products'),...constraints)); return snap.docs.map(d=>({id:d.id,...d.data()})).filter(p=>p.active!==false);
}
export async function getProduct(id){const s=await getDoc(doc(db,'products',id));return s.exists()?{id:s.id,...s.data()}:null;}
export const saveProduct=(id,data)=>setDoc(doc(db,'products',id),{...data,updatedAt:serverTimestamp()},{merge:true});
export const removeProduct=id=>deleteDoc(doc(db,'products',id));

export async function getStoreSettings(){const s=await getDoc(doc(db,'settings','store'));return s.exists()?s.data():{shippingCharges:0,freeShippingThreshold:0};}
