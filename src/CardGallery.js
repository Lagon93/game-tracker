import React from 'react';
import Card from './Card';

const CardGallery = ({ pendingGames }) => {
  return (
    <div className="card-gallery">
      {pendingGames.map(game => (
        <Card key={game.Juego} game={game} />
      ))}
    </div>
  );
};

export default CardGallery;