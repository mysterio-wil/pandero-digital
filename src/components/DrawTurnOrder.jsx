import React from 'react';

function DrawTurnOrder({ list }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Orden de Turnos</h3>
      <ol className="list-decimal pl-6 text-green-700">
        {list.map((name, i) => (
          <li key={i}>Semana {i + 1}: {name}</li>
        ))}
      </ol>
    </div>
  );
}

export default DrawTurnOrder;
