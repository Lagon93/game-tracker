import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import './App.css';
import Header from './Header';
import Table from './Table';
import Loader from './Loader';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('Juegos_duplicate').select('*');
        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }  finally {
        setIsLoading(false); // Finaliza la carga
      }

      
    }
    fetchData();
  }, []);

  const totalAchievements = data.reduce((acc, item) => {
    const logros = parseInt(item.Logros, 10);
    return acc + (isNaN(logros) ? 0 : logros);
  }, 0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredData = React.useMemo(() => {
    return data.filter(item =>
      item.Juego.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

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

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        dataLength={data.length} 
        totalAchievements={totalAchievements} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        toggleDarkMode={toggleDarkMode} 
      />
      <div className="glass-container">
        {isLoading ? <Loader /> : (
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
      </div>
        
    </div>
  );
}

export default App;
