# 💰 Pandero Digital

Una aplicación web para gestionar un sistema de pandero entre amigos, con turnos sorteados, control de pagos semanales y acceso mediante autenticación con Google.

---

## 🚀 Funcionalidades

- ✅ Ingreso con cuenta de Google
- 👥 Agregar y eliminar participantes (solo por el administrador)
- 🎲 Sorteo manual del orden de turnos (mínimo 5 participantes)
- 📆 Control de semana actual y cobrador asignado
- 💸 Marcar pagos por semana
- 🛡️ Control de roles: solo el administrador puede editar, los demás solo ven
- ☁️ Datos almacenados en Firebase Firestore
- 🌐 Despliegue como aplicación web

---

## 📸 Vista previa

![Demo](preview.png)

---

## 🛠️ Tecnologías utilizadas

- React.js
- Firebase Authentication
- Firebase Firestore
- Tailwind CSS (estilos)
- Vite (entorno de desarrollo)

---

## 📦 Instalación local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/pandero-digital.git
   cd pandero-digital
   ```

2. **Instala dependencias**
   ```bash
   npm install
   ```

3. **Configura Firebase**
   - Crea un archivo `src/firebase.js` con tus credenciales:
     ```js
     import { initializeApp } from 'firebase/app';
     import { getFirestore } from 'firebase/firestore';
     import { getAuth, GoogleAuthProvider } from 'firebase/auth';

     const firebaseConfig = {
       apiKey: 'TU_API_KEY',
       authDomain: 'TU_AUTH_DOMAIN',
       projectId: 'TU_PROJECT_ID',
       storageBucket: 'TU_BUCKET',
       messagingSenderId: 'TU_MSG_ID',
       appId: 'TU_APP_ID',
     };

     export const app = initializeApp(firebaseConfig);
     export const db = getFirestore(app);
     export const auth = getAuth(app);
     export const provider = new GoogleAuthProvider();
     ```

4. **Inicia el servidor**
   ```bash
   npm run dev
   ```

---

## 🧪 Uso

- Inicia sesión con Google
- Si eres el administrador, podrás:
  - Agregar/eliminar participantes
  - Sortear el orden cuando haya mínimo 5
  - Marcar pagos cada semana
- Los demás usuarios solo pueden ver el estado

---

## 👤 Rol de Administrador

El acceso completo está restringido al correo:
```
karlwgs1989@gmail.com
```

---

## 📤 Despliegue

Puedes desplegar esta app en:
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
Puedes usarlo, modificarlo y distribuirlo libremente bajo los términos de esta licencia.
