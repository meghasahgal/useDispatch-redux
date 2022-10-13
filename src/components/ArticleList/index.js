import { Route, Switch, NavLink } from "react-router-dom";
import { useEffect } from "react";
import SingleArticle from "../SingleArticle";
import { useDispatch, useSelector } from "react-redux";
// useSelector allows for the ArticleList needs to subscribe to the store and listen for changes in the articles slice of state
import { loadArticles } from "../../store/articleReducer";

const ArticleList = () => {
  const dispatch = useDispatch();
  //retrieve the entries by listening to changes in the data/state
  const articles = useSelector((state) => state.articleState.entries);
  // load the article data into the store after the first render:
  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);
  return (
    <div>
      <h1>Article List</h1>
      <ol>
        {articles.map(({ id, title }) => (
          <li key={id}>
            <NavLink to={`/article/${id}`}>{title}</NavLink>
          </li>
        ))}
      </ol>
      <Switch>
        <Route path="/article/:id">
          <SingleArticle />
        </Route>
      </Switch>
    </div>
  );
};

export default ArticleList;
