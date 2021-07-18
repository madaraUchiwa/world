import React, { useState } from 'react';
import axios from "axios"; 
import DeleteArticle from './DeleteArticle';

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR',{
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });
        return newDate;
    }

    const handleEditing = () => {
        const data = {
            content: editContent,
            author: article.author,
            date: article.date
        };
        axios.put(' http://localhost:3003/articles/'+article.id, data)
        setIsEditing(false);
    }

    return (
        <div className="article" style={{ background: isEditing ? "#f3feff":"white" }}>
            <div className="card-header">
                <h3>{article.author}</h3>
                <em>Posté le { dateParser(article.date)}</em>
            </div>
            {isEditing ? (<textarea onChange={(e) => setEditContent(e.target.value)} autoFocus defaultValue={editContent ? editContent : article.content} />):(<p>{editContent ? editContent : article.content}</p>)}
            <div className="btn-container">
                { isEditing ?(
                <button onClick={handleEditing}>Enregistrer</button>
                ) : (
                <button onClick={(e) => setIsEditing(true)}>Edit</button>

                ) }
                <DeleteArticle id={article.id}/>
            </div>
        </div>
    );
};

export default Article;