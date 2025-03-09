import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount  from './firebase_secret.json';


export const adminFirebase=admin.initializeApp({
    credential:admin.credential.cert(serviceAccount as ServiceAccount),
})

