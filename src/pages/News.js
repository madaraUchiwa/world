import React, {useEffect, useState} from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

const News = () => {

  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);


  useEffect(() => {
      getData();

  },[]);


    const getData = () => {
      axios.get('http://localhost:3003/articles')
      .then( (res) =>  setNewsData(res.data))
      .catch((e) => console.log(e));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(content.length < 140) {
            setError(true);
        } else {
          
        axios.post("http://localhost:3003/articles",{
          author,content,
          date: Date.now(),
        }).then((res) => {
          setAuthor('');
          setContent('');
          setError(false)
          getData();
        });
        }
    }

  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>New</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" value={author}  onInput={(e) => setAuthor(e.target.value)} placeholder="Nom" />
        <textarea style={{ borderColor: error ? "red":"#61dafb" }} placeholder="Message" value={content} onInput={(e) => setContent(e.target.value)} />
        { error && <p>Veuillez écrire un minumun de 150 caractère</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {newsData
        .sort((a,b) => b.date - a.date)
        .map((article, index) => <Article key={article.id} article={article} />)}
      </ul>
    </div>
  );
};

export default News;
