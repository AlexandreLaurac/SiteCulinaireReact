import React from 'react';


function Card({ plat }) {
    return (
        <div className='plat'>
            <p className="titre"> {plat.strMeal} </p>
            <p className="origine"> Origine : {plat.strArea} </p>
            <img src={plat.strMealThumb} alt="image manquante" />
            <p className="recette"> {plat.strInstructions} </p>
        </div>
    );
}

export default Card;
