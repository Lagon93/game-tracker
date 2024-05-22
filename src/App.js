import React, { useState, useEffect } from 'react';
import supabase from './supabase';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Consultar los datos de la tabla en Supabase
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

  return (
    <div className="glass-container"> {/* Añade la clase 'glass-container' para aplicar los estilos */}
      <h1>Tabla de Datos desde Supabase</h1>
      <table className="glass-table"> {/* Añade la clase 'glass-table' para aplicar los estilos */}
        <thead>
          <tr>
            <th>Juego</th>
            <th>Fecha de finalización</th>
            <th>Logros</th>
            <th>Plataforma</th>
            <th>Horas</th>
            <th>Nota</th>
            <th>Recomendado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Juego}</td>
              <td>{item['Fecha de finalización']}</td>
              <td>{item.Logros}</td>
              <td>{item.Plataforma}</td>
              <td>{item.Horas}</td>
              <td>{item.Nota}</td>
              <td>{item.Recomendado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;