import React from 'react';

function Participants({ list }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Participantes ({list.length})</h3>
      <ul className="list-disc pl-6 text-gray-700">
        {list.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;
