import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
        onClick={() => setActiveTab('completed')}
      >
        <b>Completados/Jugando Actualmente</b>
      </button>
      <button
        className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
        onClick={() => setActiveTab('pending')}
      >
        <b>Pendientes</b>
      </button>
    </div>
  );
};

export default Tabs;
