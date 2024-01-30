/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function App() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getPosts() {
      const res = await fetch("https://vahidalvandi.ir/wp-json/wp/v2/posts");
      const data = await res.json();
      setAllPosts(data);
      console.log(data);
    }
    getPosts();
  }, []);

  useEffect(() => {
    async function getPostById() {
      try {
        if (id) {
          const res = await fetch(
            `https://vahidalvandi.ir/wp-json/wp/v2/posts/${id}`
          );
          if (!res.ok) throw new Error("Wrong ID");
          const data = await res.json();
          setPosts([data]);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }
    getPostById();
    return () => {
      setError("");
    };
  }, [id]);
  function handleSubmit(e) {
    e.preventDefault();
    setId(e.target.querySelector("input").value);
  }
  function ErrorMessage({ message }) {
    return (
      <p>
        <span>⛔ </span>

        {message}
      </p>
    );
  }
  return (
    <div className="app">
      <div className="container">
        <div className="posts">
          <div className="all">
            <h1>Blogs</h1>
            <ol>
              {allPosts.map((post) => (
                <li key={post.id}>
                  <a href={post.link}>{post.title.rendered}</a>
                </li>
              ))}
            </ol>
          </div>
          <div className="id">
            <h1>Search blog by ID</h1>
            <form action="" onSubmit={handleSubmit}>
              <input type="number" />
              <button type="submit">Search</button>
            </form>
            {error ? (
              <ErrorMessage message={error} />
            ) : (
              posts.map((postById) => (
                <a key={postById.id} href={postById.link}>
                  {postById.title.rendered}
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
