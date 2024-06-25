import React from 'react';

const colorScale = {
  0: '#8B0000',  // Dark red
  1: '#A52A2A',  // Brown
  2: '#B22222',  // Fire brick
  3: '#CD5C5C',  // Indian red
  4: '#D2691E',  // Chocolate
  5: '#DAA520',  // Goldenrod
  6: '#9ACD32',  // Yellow green
  7: '#32CD32',  // Lime green
  8: '#228B22',  // Forest green
  9: '#008000',  // Green
  10: '#006400'  // Dark green
};

function getBackgroundColor(nota) {
  const value = Math.round(parseFloat(nota));
  if (isNaN(value) || value < 0 || value > 10) return 'white'; // Color por defecto
  return colorScale[value];
}

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
                      <tr key={index} style={{ backgroundColor: getBackgroundColor(item.Nota) }}>
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
                  <td>{item.Plataforma === 'Steam' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" alt="Steam" width="20" />}
              {item.Plataforma === 'Xbox' && <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png" alt="Xbox" width="20" />}
              {item.Plataforma !== 'Steam' && item.Plataforma !== 'Xbox' && item.Plataforma}</td>
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
