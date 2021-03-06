import React from 'react';

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <Link onClick={() => paginate(number)} href='!#' className='page-link'><a>
              {number}
            </a></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;