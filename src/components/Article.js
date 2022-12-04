import React from 'react';


function Article(props) {

    // Variables pour la date
    const objetDate = new Date(props.date);  // création d'un objet Date à partir du timeStamp contenu dans les objets du fichier db.json
    const date = objetDate.toLocaleString('fr-FR', {  // conversion en un format local
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    // Contenu HTML
    return (
        <div className="article">
            <div className="en-tete">
                <p> {props.auteur} </p>
                <p className="date"> Posté le {date} </p>
            </div>
            <div className="contenu">
                <p> {props.contenu} </p>
            </div>
            <div className="boutons">
                <button onClick={props.modification}> Modifier </button>
                <button onClick={props.suppression}> Supprimer </button>
            </div>
        </div>
    )
}

export default Article;
