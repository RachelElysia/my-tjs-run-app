import React from 'react';

const RecipesPaginate = ({ recipes, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {recipes.map(recipes => (
        <li key={recipes.id} className='list-group-item'>
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default RecipesPaginate;