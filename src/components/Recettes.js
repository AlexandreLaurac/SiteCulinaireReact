import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Card from './Card';


function Recettes() {

    // Variables d'état
    const [donnees, setDonnees] = useState([""]);
    const [champ, setChamp] = useState("");

    // Urls
    const urlBase = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    var url = urlBase + champ;

    // Fonction useEffect
    useEffect(() => {
        url = urlBase + champ;
        axios.get(url).then((res) => setDonnees(res.data.meals));
    }, [champ]);

    // Contenu HTML (le test "donnees != null ?, etc." a pour but de déterminer si la requête a renvoyé qch,
    // et de permettre de ne rien afficher si le résultat est vide et éviter le problème de page blanche)
    return (
        <div>
            <h1> Nos recettes </h1>
            <div id="recherche">
                <input id="champ" type="text" placeholder="Tapez un ingrédient de recette, le nom d'un plat, etc. (en anglais)" onChange={(e) => setChamp(e.target.value)} />
            </div>
            <div id="conteneur_recettes">
                {(donnees != null) ? donnees.map((meal) => <Card key={meal.idMeal} plat={meal} />) : <div></div>}
            </div>
        </div>
    );

}

export default Recettes;
