import React from 'react';

const Card = ({ game }) => {
  return (
    <div className="card">
      <img src={game['Caratula Juego']} alt={game.Juego} className="card-image" />
      <div className="card-content">
        <h3>{game.Juego}</h3>
        <p>{game.Plataforma}</p>
      </div>
    </div>
  );
};

export default Card;