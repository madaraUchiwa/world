import React from 'react';
import axios from 'axios';

const DeleteArticle = ({ id }) => {
    const handeDelete = () => {
        axios.delete('http://localhost:3003/articles/'+id)
        .then(() => window.location.reload());
    }
    return (
        <button onClick={ () => {
            if(window.confirm('Voulez vous supprimer cet article ?')){
                handeDelete();
            }
        }}>
            Supprimer
        </button>
    );
};

export default DeleteArticle;