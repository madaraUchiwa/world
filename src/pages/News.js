import React, {useEffect, useState} from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";

const News = () => {

  const   [newsData, setNewsData] = useState([]);


  useEffect(() => {
      getData();

  },[]);


    const getData = () => {
      axios.get('http://localhost:3003/articles')
      .then( (res) =>  setNewsData(res.data))
      .catch((e) => console.log(e));
    }

  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>New</h1>

      <form>
        <input type="text" placeholder="Nom" />
        <textarea placeholder="Message" />
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
