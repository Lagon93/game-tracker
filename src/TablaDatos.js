import React from 'react';

function TablaDatos({ data }) {
  return (
    <table className="glass-table">
      <thead>
        <tr>
          <th>Juego</th>
          <th>Fecha de finalización</th>
          <th>Logros</th>
          <th>Plataforma</th>
          <th>Horas</th>
          <th>Nota</th>
          <th>Recomendado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.Juego}</td>
            <td>{item['Fecha de finalización']}</td>
            <td>{item.Logros}</td>
            <td>{item.Plataforma}</td>
            <td>{item.Horas}</td>
            <td>{item.Nota}</td>
            <td>{item.Recomendado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaDatos;