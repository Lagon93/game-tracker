import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('Juegos_duplicate').select('*');
        console.log(data);

        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  const totalAchievements = data.reduce((acc, item) => {
    const logros = parseInt(item.Logros, 10);
    return acc + (isNaN(logros) ? 0 : logros);
  }, 0);


  const toggleDarkMode = () => setDarkMode(!darkMode);

   const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'Fecha de finalización') {
          aValue = aValue ? new Date(aValue) : new Date(0);
          bValue = bValue ? new Date(bValue) : new Date(0);
        } else if (sortConfig.key === 'Logros') {
          aValue = parseInt(aValue) || 0;
          bValue = parseInt(bValue) || 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header">
        <div className="stats">
          <span>🎮 {data.length}</span>
          <span>🏆 {totalAchievements}</span>
        </div>
        <h1>GAME TRACKER</h1>
        <div className="controls">
          <div className="search-input"><input 
            type="text" 
            placeholder="Buscar Juego..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          /></div>
            <label className="switch">
              <input type="checkbox"/>
              <div className="slider"></div>
              <div className="bg"></div>
            </label>
        </div>
      </div>
      <div className="glass-container">
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
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td><img src={item['Caratula Juego']} alt={item.Juego} style={{ width: '100px', height: 'auto' }} />  </td>              
                <td>{item.Juego}</td>
                <td>{item['Fecha de finalización']}</td>
                <td>{item.Logros}</td>
                <td>{item.Plataforma}</td>
                <td>{item.Horas}</td>
                <td>{item.Nota}</td>
                <td>  {item.Recomendado === 'Si' ? (
                  <span className="approved">✓</span>
                ) : (
                  <span className="not-approved">✗</span>
                )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
