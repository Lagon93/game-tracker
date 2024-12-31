import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Table from './Table';
import Loader from './Loader';
import Pagination from './Pagination';
import CardGallery from './CardGallery';
import Tabs from './Tabs';
import Statistics from './Statistics';
import OBSDisplay from './OBSDisplay';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import jsonData from './data/gameData.json';
import Propositos2025 from './Propositos2025';


function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPendingPage, setCurrentPendingPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [itemsPerPageP] = useState(9);
  const [activeTab, setActiveTab] = useState('completed');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = jsonData.juegos;
          setData(data);
          setFilteredData(data.filter(item => !item.Pendiente));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

  }, []);

  const completedGames = data.filter(item => item['Fecha de finalización']);

  const totalAchievements = data.reduce((acc, item) => {
    const logros = parseInt(item.Logros, 10);
    return acc + (isNaN(logros) ? 0 : logros);
  }, 0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = (term) => {
    const filtered = data.filter(item =>
      item.Juego.toLowerCase().includes(term.toLowerCase()) && !item.Pendiente
    );
    setFilteredData(filtered);
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'Fecha de finalización') {
          aValue = aValue ? new Date(aValue.split('/').reverse().join('-')) : new Date();
          bValue = bValue ? new Date(bValue.split('/').reverse().join('-')) : new Date();
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
  }, [filteredData, sortConfig]);

  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  const pendingGames = React.useMemo(() => {
    return data.filter(item => item.Pendiente);
  }, [data]);

  const sortedPendingGames = React.useMemo(() => {
    let sortableData = [...pendingGames];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'Fecha de finalización') {
          aValue = aValue ? new Date(aValue.split('/').reverse().join('-')) : new Date();
          bValue = bValue ? new Date(bValue.split('/').reverse().join('-')) : new Date();
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
  }, [pendingGames, sortConfig]);

  const currentPendingData = React.useMemo(() => {
    const startIndex = (currentPendingPage - 1) * itemsPerPageP;
    const endIndex = startIndex + itemsPerPageP;
    return sortedPendingGames.slice(startIndex, endIndex);
  }, [sortedPendingGames, currentPendingPage, itemsPerPageP]);

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
    <Router>
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header
        dataLength={completedGames.length}
        totalAchievements={totalAchievements}
        onSearch={handleSearch}
        toggleDarkMode={toggleDarkMode}
      />
      <Routes>
        <Route path="/" element={ //Renderizar vista principal
        

<div className="glass-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === 'completed' && (
            <>
              <Table data={currentData} requestSort={requestSort} />
              <Pagination
                totalItems={sortedData.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
          {activeTab === 'pending' && (
            <>
              <CardGallery pendingGames={currentPendingData} />
              <Pagination
                totalItems={pendingGames.length}
                itemsPerPage={itemsPerPageP}
                currentPage={currentPendingPage}
                setCurrentPage={setCurrentPendingPage}
              />
            </>
          )}
          {activeTab === 'statistics' && (
            <Statistics data={data} />
          )}
        </>
      )}
      </div>
                  } />
              <Route path="/obs-display" element={<OBSDisplay data={data} />} />
              <Route path="/propositos-2025" element={<Propositos2025 />} />
              </Routes>
            </div>
          </Router>
  );
}

export default App;