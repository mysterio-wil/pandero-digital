// src/App.jsx
import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {!user ? (
        <div className="max-w-md mx-auto text-center bg-white p-6 rounded shadow">
          <h1 className="text-xl font-semibold mb-4">💰 Pandero Digital</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Iniciar sesión con Google
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4 max-w-2xl mx-auto">
            <p className="text-sm text-gray-700">
              Sesión iniciada como: <strong>{user.email}</strong>
            </p>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </div>
          <Dashboard user={user} />
        </>
      )}
    </div>
  );
};

export default App;
