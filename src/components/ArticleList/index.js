import { Route, Switch, NavLink } from "react-router-dom";
import { useEffect } from "react";
import SingleArticle from "../SingleArticle";
import { useDispatch, useSelector } from "react-redux";
// useSelector allows for the ArticleList needs to subscribe to the store and listen for changes in the articles slice of state
import { loadArticles } from "../../store/articleReducer";
// loadArticles is the action creator
const ArticleList = () => {
  const dispatch = useDispatch();
  //retrieve the array of entries by listening to changes in the data/state via a useSelector, store is the selector
  const articles = useSelector((store) => store.articleState.entries);
  // load the article data into the store after the first render:
  useEffect(() => {
    // dispatch is like a fetch
    // dispatch({type: "article/loadArticles", articles}), need to invoke the function like below
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
