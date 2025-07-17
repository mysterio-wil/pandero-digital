import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import WeeklyStatus from './WeeklyStatus';

const ADMIN_EMAIL = 'karlwgs1989@gmail.com';

const Dashboard = ({ user }) => {
  const [participantes, setParticipantes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [nuevoParticipante, setNuevoParticipante] = useState('');

  const esAdmin = user?.email === ADMIN_EMAIL;

  const fechaInicio = new Date('2025-07-14');
  const ahora = new Date();
  const cicloIniciado = ahora >= fechaInicio;

  useEffect(() => {
    const cargarDatos = async () => {
      const participantesRef = doc(db, 'pandero', 'participantes');
      const turnosRef = doc(db, 'pandero', 'ordenTurnos');
      const pagosRef = doc(db, 'pandero', 'pagos');

      const [partSnap, turnosSnap, pagosSnap] = await Promise.all([
        getDoc(participantesRef),
        getDoc(turnosRef),
        getDoc(pagosRef),
      ]);

      if (partSnap.exists()) {
        setParticipantes(partSnap.data().lista || []);
      }

      if (turnosSnap.exists()) {
        setTurnos(turnosSnap.data().turnos || []);
      }

      if (pagosSnap.exists()) {
        setPagos(pagosSnap.data().pagos || []);
      }
    };

    cargarDatos();
  }, []);

  const guardarParticipantes = async (nuevaLista) => {
    setParticipantes(nuevaLista);
    await setDoc(doc(db, 'pandero', 'participantes'), {
      lista: nuevaLista,
    });

    await setDoc(doc(db, 'pandero', 'ordenTurnos'), { turnos: [] });
    await setDoc(doc(db, 'pandero', 'pagos'), { pagos: [] });

    setTurnos([]);
    setPagos([]);
  };

  const agregarParticipante = async () => {
    const nombre = nuevoParticipante.trim();
    if (nombre && !participantes.includes(nombre)) {
      const nuevaLista = [...participantes, nombre];
      await guardarParticipantes(nuevaLista);
      setNuevoParticipante('');
    }
  };

  const eliminarParticipante = async (nombre) => {
    const nuevaLista = participantes.filter((p) => p !== nombre);
    await guardarParticipantes(nuevaLista);
  };

  const shuffle = (array) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const sortearTurnos = async () => {
    if (participantes.length < 5) return;

    const ordenAleatorio = shuffle(participantes);
    setTurnos(ordenAleatorio);

    await setDoc(doc(db, 'pandero', 'ordenTurnos'), {
      turnos: ordenAleatorio,
    });

    await setDoc(doc(db, 'pandero', 'pagos'), {
      pagos: [],
    });

    setPagos([]);
  };

  const marcarPago = async (nombre) => {
    if (!cicloIniciado || turnos.length < 5 || !esAdmin) return;

    let nuevosPagos;
    if (Array.isArray(pagos)) {
      if (pagos.includes(nombre)) {
        nuevosPagos = pagos.filter((p) => p !== nombre);
      } else {
        nuevosPagos = [...pagos, nombre];
      }
    } else {
      nuevosPagos = [nombre];
    }

    setPagos(nuevosPagos);

    await setDoc(doc(db, 'pandero', 'pagos'), {
      pagos: nuevosPagos,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">💰 Pandero Digital</h1>

      {!esAdmin && (
        <p className="text-sm text-gray-500 italic">
          Modo solo lectura. Solo el administrador puede editar esta información.
        </p>
      )}

      <WeeklyStatus turns={turnos} pagos={pagos} />

      <div className="bg-gray-100 p-4 rounded-lg space-y-4">
        <h2 className="text-lg font-semibold">Participantes</h2>

        {esAdmin && (
          <div className="flex gap-2">
            <input
              type="text"
              value={nuevoParticipante}
              onChange={(e) => setNuevoParticipante(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && agregarParticipante()}
              placeholder="Nombre"
              className="flex-1 border px-2 py-1 rounded"
            />
            <button
              onClick={agregarParticipante}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              ➕ Agregar
            </button>
          </div>
        )}

        <ul className="list-disc list-inside">
          {participantes.map((nombre, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span>{nombre}</span>
              {esAdmin && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => marcarPago(nombre)}
                    disabled={!cicloIniciado || turnos.length < 5}
                    className={`px-2 py-1 rounded text-sm ${
                      pagos.includes(nombre)
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {pagos.includes(nombre) ? '✅ Pagado' : '💸 Marcar pago'}
                  </button>
                  <button
                    onClick={() => eliminarParticipante(nombre)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {participantes.length > 0 && participantes.length < 5 && (
          <p className="text-yellow-600 text-sm">
            ⚠️ Se necesitan al menos 5 participantes para sortear los turnos.
          </p>
        )}

        {esAdmin && (
          <button
            onClick={sortearTurnos}
            disabled={participantes.length < 5 || turnos.length > 0}
            className={`mt-4 px-4 py-2 rounded text-white font-semibold ${
              participantes.length < 5 || turnos.length > 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            🎲 Sortear orden
          </button>
        )}
      </div>

      {turnos.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Orden de Turnos</h3>
          <ol className="list-decimal list-inside">
            {turnos.map((persona, index) => (
              <li key={index}>
                Semana {index + 1}: {persona}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
