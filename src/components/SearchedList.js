export default function SearchedList({ movies, setSelectedId, selectedId }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, selectedId, setSelectedId }) {
  return (
    <li
      className="movie-details"
      onClick={() =>
        setSelectedId(movie.imdbID === selectedId ? null : movie.imdbID)
      }
    >
      <img className="movie-poster" src={movie.Poster} alt="poster" />
      <div>
        <h4>{movie.Title}</h4>
        <p style={{ transform: "translate(0px,-10px" }}>{movie.Year}</p>
      </div>
    </li>
  );
}
