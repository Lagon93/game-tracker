import React from 'react';

const Table = ({ data, requestSort }) => {
  return (
    <table className="glass-table">
      <thead>
        <tr>
          <th>Caratula Juego</th>
          <th onClick={() => requestSort('Juego')}>Juego</th>
          <th onClick={() => requestSort('Fecha de finalización')}>Fecha de finalización</th>
          <th onClick={() => requestSort('Logros')}>Logros</th>
          <th>Plataforma</th>
          <th onClick={() => requestSort('Horas')}>Horas</th>
          <th onClick={() => requestSort('Nota')}>Nota</th>
          <th>Recomendado</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                <img src={item['Caratula Juego']} alt={item.Juego} style={{ width: '100px', height: 'auto' }} /></a></td>
              <td>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.Juego}</a></td>
              {item.Recomendado === null ? (
                <td colSpan="6" className="currently-playing"> 
                  <div className="text-container">
                    <div className="text-pattern"><b>Jugando actualmente</b></div>
                  </div>
                </td>
              ) : (
                <>
                  <td>{item['Fecha de finalización']}</td>
                  <td>{item.Logros || 0}</td>
                  <td>{item.Plataforma}</td>
                  <td>{item.Horas}</td>
                  <td>{item.Nota}</td>
                  <td>
                    {item.Recomendado === 'Si' ? (
                      <span className="approved">✓</span>
                    ) : (
                      <span className="not-approved">✗</span>
                    )}
                  </td>
                </>
              )}
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
