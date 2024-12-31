// OBSDisplay.js
import React, { useMemo } from 'react';
import './OBSDisplay.css';


function OBSDisplay({ data }) {
  // Filtrar los juegos completados este año
  const currentYear = new Date().getFullYear();
  const completedThisYear = useMemo(() => {
    return data.filter(item => {
      const completedDate = item['Fecha de finalización'];
      return completedDate && new Date(completedDate).getFullYear() === currentYear;
    });
  }, [data]);

  // Total de logros
  const totalAchievements = useMemo(() => {
    return data.reduce((acc, item) => {
      const logros = parseInt(item.Logros, 10);
      return acc + (isNaN(logros) ? 0 : logros);
    }, 0);
  }, [data]);

  // Juegos actualmente "platinando"
  const platinandoGames = useMemo(() => {
    return data.filter(item => item.Recomendado === null);
  }, [data]);

  return (
    <div className="obs-display">


      <div className="obs-section">
        <h3>🎮 {completedThisYear.length} 🏆 {totalAchievements}
        </h3>
        <div className="image-carousel">
                    {completedThisYear.map((game, index) => (
                        <img
                        key={index}
                        src={game['Caratula Juego']}
                        alt={game.Juego}
                        className="gamep"
                        style={{
                          animationDelay: `${index * 4}s` // Retraso para cada imagen
                        }}
                      />
                    ))}
          </div>
      </div>
      <div className="obs-section2">
        <h3>Juegos Platinando Actualmente</h3>
        <div className="platinando-carousel">
          {platinandoGames.map((game, index) => (
            <img
              key={index}
              src={game['Caratula Juego']}
              alt={game.Juego}
              className="game-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OBSDisplay;
