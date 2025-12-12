import { useEffect, useRef, useState } from "react";
import SearchedList from "./SearchedList.js";
import WatchedList from "./WatchedList.js";
import StarRating from "./StarRating.js";
import { useLocalStorageState } from "../custom/useLocolStorageState.js";
import { useKey } from "../custom/useKey.js";

export default function Main({ movies, isLoading, message, query }) {
  const [selectedId, setSelectedId] = useState(null);

  const [watchedMovies, setWatchedMovies] = useLocalStorageState([], "watched");

  function settingWatched(item) {
    setWatchedMovies([...watchedMovies, item]);
  }

  useEffect(
    function () {
      setSelectedId(null);
    },
    [query]
  );

  return (
    <main>
      <ListBox query={query} isLoading={isLoading}>
        {isLoading || (
          <h3
            className="searchedListMessege"
            style={{ transform: `translateY(${query ? "0% " : "600%"})` }}
          >
            {query !== "" ? "Your Movies" : "Search your favorite movies..."}
          </h3>
        )}
        {isLoading || movies === undefined ? (
          <Message>{message}</Message>
        ) : (
          <SearchedList
            movies={movies}
            setSelectedId={setSelectedId}
            selectedId={selectedId}
          />
        )}
      </ListBox>

      <ListBox>
        {selectedId ? (
          <SelectedMovie
            setSelectedId={setSelectedId}
            selectedId={selectedId}
            settingWatched={settingWatched}
            watchedMovies={watchedMovies}
          />
        ) : (
          <WatchedList
            watchedMovies={watchedMovies}
            setWatchedMovies={setWatchedMovies}
          />
        )}
      </ListBox>
    </main>
  );
}

function Message({ children }) {
  return <p style={{ fontSize: "20px", marginTop: "40%" }}>{children}</p>;
}

function ListBox({ children }) {
  return <div className="list-box">{children}</div>;
}

function SelectedMovie({
  setSelectedId,
  selectedId,
  settingWatched,
  watchedMovies,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [error, setError] = useState("");

  const countN = useRef(0);

  const isWatched = watchedMovies.find((movie) => movie.imdbID === selectedId);

  useEffect(
    function () {
      if (userRating) countN.current++;
    },
    [userRating]
  );

  function addingMovie() {
    const item = {
      imdbID: selectedMovie.imdbID,
      title: selectedMovie.Title,
      poster: selectedMovie.Poster,
      imdbRating: selectedMovie.imdbRating,
      runtime: selectedMovie.Runtime,
      userRating: userRating,
      userDisisionCount: countN.current,
    };

    settingWatched(item);
    setSelectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        try {
          setIsLoading(true);
          setError("Loading...");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=f28062cf&i=${selectedId}`
          );
          const data = await res.json();

          setSelectedMovie(data);
          setIsLoading(false);
        } catch (err) {
          setError("Failed to fatch!");
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!selectedMovie.Title) return;
      document.title = `Movie | ${selectedMovie.Title}`;

      return function () {
        document.title = "MoviesCity";
      };
    },
    [selectedMovie.Title]
  );

  function onCloseMovie() {
    setSelectedId(null);
  }

  useKey("Escape", onCloseMovie);

  return (
    <div className="selected-movie-details">
      {isLoading ? (
        <Message>{error}</Message>
      ) : (
        <>
          <button onClick={() => setSelectedId(null)} className="btn btn-larr">
            &larr;
          </button>
          <div className="selected-movie-header">
            <img src={selectedMovie.Poster} alt="Poster" />
            <div className="details-overview">
              <h2>{selectedMovie.Title}</h2>
              <p>
                {selectedMovie.Released} &bull; {selectedMovie.Runtime}
              </p>
              <p>{selectedMovie.Genre}</p>

              <p>
                <span>⭐ </span>
                {selectedMovie.imdbRating} imdb Rating
              </p>
            </div>
          </div>
          <div className="rating">
            {isWatched ? (
              <p>You already rated this movie {isWatched.userRating} 🌟</p>
            ) : (
              <>
                <StarRating
                  maxRating={10}
                  size={30}
                  color="rgba(242, 174, 37)"
                  setUserRating={setUserRating}
                />
                {userRating > 0 ? (
                  <button className="btn-add" onClick={addingMovie}>
                    +Add to WatchedList
                  </button>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
          <section>
            <p>
              <em>{selectedMovie.Plot}</em>
            </p>
            <p>Starring {selectedMovie.Actors}</p>
            <p>Directed by {selectedMovie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
