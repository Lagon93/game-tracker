import React from 'react';

function Header({ dataLength, totalAchievements, searchTerm, setSearchTerm, toggleDarkMode }) {
  return (
    <div className="header">
      <div className="stats">
        <span>🎮 <b> {dataLength}</b></span>
        <span>🏆 <b>{totalAchievements}</b></span>
      </div>
      <h1>JUEGOS 2024</h1>
      <div className="controls">
        <div className="search-input">
          <input 
            type="text" 
            placeholder="Buscar Juego..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode}/>
          <div className="slider"></div>
          <div className="bg"></div>
        </label>
      </div>
    </div>
  );
}

export default Header;
