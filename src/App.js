import { useEffect, useState } from "react";
import "./index.css";
import Nav from "./components/Nav.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  //http://www.omdbapi.com/?apikey=[yourkey]&
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setMessage("Loading...");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=f28062cf&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Samething went wrong");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);
          else setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") setMessage(err.message);
        } finally {
        }
        if (query.length < 3) {
          setMovies([]);
        }
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <div>
      <Nav query={query} setQuery={setQuery} />

      <Main
        movies={movies}
        isLoading={isLoading}
        message={message}
        query={query}
      />

      <Footer />
    </div>
  );
}
