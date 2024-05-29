import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import './App.css';
import Header from './Header';
import Table from './Table';
import Loader from './Loader';
import Pagination from './Pagination';
import CardGallery from './CardGallery';
import Tabs from './Tabs';

function App() {
  // Estado para almacenar los datos de los juegos
  const [data, setData] = useState([]);
  // Estado para gestionar la carga de datos
  const [isLoading, setIsLoading] = useState(true);
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el modo oscuro
  const [darkMode, setDarkMode] = useState(false);
  // Estado para la configuración de ordenamiento
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  // Estado para la página actual de los juegos completados
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para la página actual de los juegos pendientes
  const [currentPendingPage, setCurrentPendingPage] = useState(1);
  // Número de elementos por página
  const [itemsPerPage] = useState(10);
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState('completed');

  // useEffect para obtener los datos de la base de datos de Supabase
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
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calcula el total de logros obtenidos
  const totalAchievements = data.reduce((acc, item) => {
    const logros = parseInt(item.Logros, 10);
    return acc + (isNaN(logros) ? 0 : logros);
  }, 0);

  // Alterna el modo oscuro
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Filtra los datos según el término de búsqueda y si no están pendientes
  const filteredData = React.useMemo(() => {
    return data.filter(item =>
      item.Juego.toLowerCase().includes(searchTerm.toLowerCase()) && !item.Pendiente
    );
  }, [data, searchTerm]);

  // Ordena los datos filtrados según la configuración de ordenamiento
  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Convierte fechas y logros a un formato comparable
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

  // Divide los datos ordenados en páginas
  const currentData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, itemsPerPage]);

  // Filtra los juegos pendientes
  const pendingGames = React.useMemo(() => {
    return data.filter(item => item.Pendiente);
  }, [data]);

  // Ordena los juegos pendientes según la configuración de ordenamiento
  const sortedPendingGames = React.useMemo(() => {
    let sortableData = [...pendingGames];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Convierte fechas y logros a un formato comparable
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

  // Divide los juegos pendientes ordenados en páginas
  const currentPendingData = React.useMemo(() => {
    const startIndex = (currentPendingPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedPendingGames.slice(startIndex, endIndex);
  }, [sortedPendingGames, currentPendingPage, itemsPerPage]);

  // Función para manejar el ordenamiento
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
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'completed' ? (
              <>
                <Table data={currentData} requestSort={requestSort} />
                <Pagination
                  totalItems={sortedData.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </>
            ) : (
              <>
                <CardGallery pendingGames={currentPendingData} />
                <Pagination
                  totalItems={pendingGames.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPendingPage}
                  setCurrentPage={setCurrentPendingPage}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
