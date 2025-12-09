export default function WatchedList({ watchedMovies, setWatchedMovies }) {
  function closeMovie(id) {
    setWatchedMovies(watchedMovies.filter((movie) => movie.imdbID !== id));
  }
  return (
    <div>
      <WatchedListHeaeder watchedMovies={watchedMovies} />
      <ul className="list" style={{ marginTop: "5px" }}>
        {watchedMovies.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} closeMovie={closeMovie} />
        ))}
      </ul>
    </div>
  );
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedListHeaeder({ watchedMovies }) {
  const avgImdbRating = average(
    watchedMovies.map((movie) => Number(movie.imdbRating))
  ).toFixed(2);
  const avgUserRating = average(
    watchedMovies.map((movie) => Number(movie.userRating))
  ).toFixed(2);

  const watchedTime = watchedMovies
    .map((movie) => Number(movie.runtime.split(" ").at(0)))
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <div className="watched-movie-header">
      <h2>Movies you watched</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <h3>{watchedMovies.length} Movies</h3>
        <h3>
          {avgImdbRating} <span>⭐</span>
        </h3>
        <h3>
          {avgUserRating} <spna>🌟</spna>
        </h3>
        <h3>
          <span>⌛</span>
          {watchedTime} Min
        </h3>
      </div>
    </div>
  );
}

function Movie({ movie, closeMovie }) {
  return (
    <li className="movie-details">
      <img className="movie-poster" src={movie.poster} alt="poster" />
      <div>
        <h4>{movie.title}</h4>
        <div
          style={{
            display: "flex",
            gap: "10px",
            transform: "translateY(-30px)",
          }}
        >
          <p>
            <span>⭐</span> {movie.imdbRating}
          </p>
          <p>
            <span>🌟</span> {movie.userRating}
          </p>
          <p>{movie.runtime}</p>
        </div>
      </div>
      <button className="btn-close" onClick={() => closeMovie(movie.imdbID)}>
        X
      </button>
    </li>
  );
}
