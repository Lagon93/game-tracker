import React from 'react';

function Header({ dataLength, totalAchievements, searchTerm, setSearchTerm, toggleDarkMode }) {
  return (
    <header className="header">
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
      <a href="https://twitter.com/Lagon_93/status/1752067654364389802" target="_blank" rel="noopener noreferrer">
          <img src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png" alt="X Logo" className="twitter-logo" />
        </a>
    </header>
  );
}

export default Header;
