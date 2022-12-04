import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Article from './Article';


function Blog() {

    // Variables d'état
    const [articles, setArticles] = useState([""]);  // variable d'état destinée à contenir le tableau d'objets de type article contenu dans db.json
    const [modification, setModification] = useState(0);  // variable d'état déterminant l'action associée au formulaire (ajout ou modification d'article)
    const [intituleBouton, setIntituleBouton] = useState("Envoyer");  // variable d'état contenant l'intitulé du bouton de soumission du formulaire, selon l'action associée à celui-ci
    const [auteur, setAuteur] = useState("");  // variable d'état associée au champ de saisie "Nom" du formulaire
    const [message, setMessage] = useState("");  // idem pour le champ de saisie "Message"
    const [declencheur, setDeclencheur] = useState(0);  // variable d'état surveillée et modifiée pour déclencher useEffect lorsque nécessaire

    // Url utilisée pour les requêtes au fichier db.json
    var url = "http://localhost:3003/articles";


    // Callback associée à la soumission du formulaire
    function soumissionFormulaire(event) {

        // Pour éviter le rechargement de la page
        event.preventDefault();

        // Mode ajout d'un article
        if (modification === 0) {
            if (message.length > 140) {  // article soumis seulement si le nombre de caractères est > 140
                // Création d'un objet article reprenant le contenu des champs de saisie du formulaire
                var article = {
                    author: auteur,
                    content: message,
                    date: Date.now(),
                }
                axios.post(url, article); // soumission de l'article - l'instruction insère l'objet 'article' créé ci-dessus dans le fichier db.json
                setDeclencheur(declencheur + 1);  // modification de la variable déclencheur suivie pour appeler useEffect
                alert("Votre message a été publié");
            }
            else {  // article non soumis (nb caract. < 140)
                alert("Votre message doit contenir au moins 140 caractères pour être publié");
            }
        }

        // Mode modification d'un article
        else { // modification != 0 et == article.id
            // Création d'un article à partir du contenu des champs de saisie potentiellement modifiés
            var article = {
                author: auteur,
                content: message,
                date: Date.now()
            }
            axios.put(url + '/' + modification, article)  // modification de l'article dans le fichier db.json
            setModification(0);  // retour au mode ajout d'article
            setIntituleBouton("Envoyer");  // modification de l'intitulé du bouton de soumission du formulaire
            setDeclencheur(declencheur + 1);  // appel à useEffect
        }
    }

    // Fonction de modification d'un article, remarques :
    // Lors de la création du blog, on fournit à chacun des éléments Article créés une fonction "modification" qui est une fonction fléchée faisant directement appel à modificationArticle avec l'objet article correspondant : '... modificationArticle(article)', voir plus bas
    // Cette fonction est utilisée dans Article comme callback du bouton de modification (voir code de Article.js) 
    function modificationArticle(article) {
        setAuteur(article.author);  // on fait apparaitre le nom de l'auteur de l'article à modifier dans le champ de saisie "Nom" du formulaire
        setMessage(article.content);  // idem pour le champ de saisie "Message"
        setModification(article.id);  // on modifie le mode de fonctionnement du formulaire en attribuant à la variable "modification" l'id de l'article à modifier
        setIntituleBouton("Modifier");  // modification de l'intitulé du bouton de soumission du formulaire
    }


    // Fonction de suppression d'un article, fonctionnement :
    // 1. Lors de la création du blog, on fournit à chacun des éléments Article une fonction "suppression" qui est une fonction fléchée faisant directement appel à suppressionArticle avec l'id de l'objet article correspondant : '... suppressionArticle(article.id)', voir plus bas
    //    Cette fonction est utilisée dans Article comme callback du bouton de suppression (voir code de Article.js)
    // 2. La fonction suppressionArticle se contente de faire une requête de suppression de l'objet d'id fourni dans le fichier db.json. (Elle met aussi à jour la variable 'declencheur' pour refaire appel à useEffect qui chargera la nouvelle liste d'articles)
    // Ainsi, en raison de suppressions d'articles, la suite des indices des articles dans le fichier db.json peut être incomplète ("à trous"), mais cela n'a pas d'importance car on fournit des callbacks de suppression avec l'id des articles et ils sont bien retrouvés dans le fichier JSON.
    function suppressionArticle(id) {
        axios.delete(url + '/' + id);
        setDeclencheur(declencheur + 1);
    }

    // UseEffect
    // Mécanisme associé aux articles
    // 1. Lorsque les champs input et textarea sont remplis, les variables 'auteur' et 'message' sont mises à jour en raison des callbacks onChange qu'on donne à ces éléments HTML.
    //    Ces variables ne sont cependant pas fournies à useEffect comme variables à surveiller et il n'y a donc pas mise à jour des articles à ce moment 
    // 2. Lors de la soumission du formulaire ou de la suppression d'un article, les callbacks associées créent, modifient ou suppriment un article dans la base.
    //    Elles modifient ensuite la variable 'declencheur' suivie par useEffect. En retour, cette fonction met à jour les articles affichés dans la page en chargeant 
    //    la BDD. Le passage par une variable 'declencheur', dont la valeur n'est pas utilisée, permet de ne pas rentrer dans une boucle infinie d'appels de useEffect.
    useEffect(() => {
        axios.get(url).then((res) => setArticles(res.data));
        setAuteur("");
        setMessage("");
    }, [declencheur]);

    // Contenu HTML
    return (
        <div>
            <div id="div_titre">
                <h1> Notre blog </h1>
            </div>
            <div id="div_formulaire">
                <form id="formulaire_blog" onSubmit={soumissionFormulaire}>
                    <input id="nom" className="champ_saisie" type="text" value={auteur} placeholder="Nom" onChange={(e) => setAuteur(e.target.value)} required />
                    <textarea id="message" className="champ_saisie" rows="6" value={message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} required ></textarea>
                    <p>Veuillez écrire au minimum 140 caractères </p>
                    <input id="envoi_form" type="submit" value={intituleBouton} />
                </form>
            </div>
            <div id="div_articles">
                {articles.map((article) => <Article key={article.key} auteur={article.author} date={article.date} contenu={article.content} modification={() => modificationArticle(article)} suppression={() => suppressionArticle(article.id)} />)}
            </div>
        </div >
    )
}

export default Blog;
