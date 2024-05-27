import React from 'react';
import './App.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      <button className="Arrows" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
        &lt;
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`page-btn ${index + 1 === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button className="Arrows" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
      &gt;      </button>
    </div>
  );
};

export default Pagination;
