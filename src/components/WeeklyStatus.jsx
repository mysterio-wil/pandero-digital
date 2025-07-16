import React from 'react';

const WeeklyStatus = ({ turns, pagos }) => {
  if (!Array.isArray(turns) || turns.length < 5) {
    return (
      <p className="text-yellow-600">
        ⚠️ Aún no se ha sorteado el orden de turnos o hay menos de 5 participantes.
      </p>
    );
  }

  const ahora = new Date();
  const inicioPrimeraSemana = new Date('2025-07-14'); // Lunes 14 de julio 2025
  const msEnUnaSemana = 7 * 24 * 60 * 60 * 1000;

  const diferencia = ahora - inicioPrimeraSemana;
  const semanaActual = diferencia >= 0
    ? Math.floor(diferencia / msEnUnaSemana) + 1
    : 0;

  const cobrador =
    semanaActual > 0 && semanaActual <= turns.length
      ? turns[semanaActual - 1]
      : 'No hay cobrador asignado';

  const montoPorPersona = 50;
  const cantidadPagos = Array.isArray(pagos) ? pagos.length : 0;
  const totalRecaudado = cantidadPagos * montoPorPersona;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">💼 Estado Semanal</h2>
      {semanaActual > 0 ? (
        <>
          <p><strong>Semana actual:</strong> {semanaActual}</p>
          <p><strong>Cobrador:</strong> {cobrador}</p>
          <p><strong>Total recaudado:</strong> S/ {totalRecaudado}</p>
        </>
      ) : (
        <p className="text-gray-600">
          Aún no ha iniciado el ciclo del pandero (empieza el 14 de julio de 2025).
        </p>
      )}
    </div>
  );
};

export default WeeklyStatus;
