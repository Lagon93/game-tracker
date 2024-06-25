import React from 'react';
import { Bar, Pie,Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement);

function Statistics({ data }) {

  // Top 5 juegos más jugados
  const topGames = data
    .sort((a, b) => !isNaN(parseFloat(b.Horas)) - !isNaN(parseFloat(a.Horas)))
    .slice(0, 5);

  // Correlación entre horas jugadas y calificación
  const correlationData = data
    .filter(game => !isNaN(parseFloat(game.Horas)) && !isNaN(parseFloat(game.Nota)))
    .map(game => ({
      x: parseFloat(game.Horas),
      y: parseFloat(game.Nota)
    }));

  // Filtrar y contar juegos por plataforma, excluyendo valores NULL o vacíos
  const platformCounts = data.reduce((acc, game) => {
    if (game.Plataforma && game.Plataforma.trim() !== '') {
      acc[game.Plataforma] = (acc[game.Plataforma] || 0) + 1;
    }
    return acc;
  }, {});


  // Contar juegos por calificación
  const ratingDistribution = data.reduce((acc, game) => {
    const rating = Math.floor(parseFloat(game.Nota));
    if (!isNaN(rating)) {
      acc[rating] = (acc[rating] || 0) + 1;
    }
    return acc;
  }, {});

    // Calcular la media de horas jugadas
    const totalHours = data.reduce((sum, game) => {
      const hours = parseFloat(game.Horas);
      return !isNaN(hours) ? sum + hours : sum;
    }, 0);
    const averageHours = totalHours / data.length;
  

  // Datos para el gráfico de plataformas
  const platformChartData = {
    labels: Object.keys(platformCounts),
    datasets: [{
      data: Object.values(platformCounts),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
      ],
    }]
  };

  // Datos para el gráfico de distribución de calificaciones
  const ratingChartData = {
    labels: Object.keys(ratingDistribution).sort((a, b) => parseInt(a) - parseInt(b)),
    datasets: [{
      label: 'Número de Juegos',
      data: Object.values(ratingDistribution),
      backgroundColor: 'rgba(75,192,192,0.6)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1
    }]
  };
    // Datos para el gráfico de correlación
    const correlationChartData = {
      datasets: [{
        label: 'Horas vs Calificación',
        data: correlationData,
        backgroundColor: 'rgba(75,192,192,0.6)',
      }]
    };
  
    const correlationOptions = {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Horas Jugadas'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Calificación'
          },
          min: 0,
          max: 10
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Correlación entre Horas Jugadas y Calificación'
        }
      }
    };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Juegos por Plataforma'
      }
    }
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Distribución de Calificaciones'
      }
    }
  };

  return (
    <div className="statistics">
            <div className="stats-summary">
        <h3>Resumen de Estadísticas</h3>
        <p>Número total de juegos: <br></br>{data.length}</p>
        <p>Media de horas jugadas: <br></br>{averageHours.toFixed(2)} horas</p>
      </div>
      <div className="top-games">
        <h3>Top 5 Juegos Más Jugados</h3>
        <ul>
          {topGames.map((game, index) => (
            <li className="listaTop" key={index}>{game.Juego}: {parseFloat(game.Horas).toFixed(2)} horas</li>
          ))}
        </ul>
      </div>
      <div className="chart-container">
        <Pie data={platformChartData} options={pieOptions} />
      </div>
      <div className="chart-container">
        <Bar data={ratingChartData} options={barOptions} />
      </div>
      <div className="chart-container">
        <Scatter data={correlationChartData} options={correlationOptions} />
      </div>
    </div>
  );
}

export default Statistics;