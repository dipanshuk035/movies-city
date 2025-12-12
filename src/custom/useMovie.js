import { useState, useEffect } from "react";

export function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setMessage("Loading...");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=f28062cf&s=${query}`,
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

  return { isLoading, message, movies };
}
