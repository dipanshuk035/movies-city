import { useRef } from "react";
import { useKey } from "../custom/useKey";

// import "./index.css";
export default function Nav({ setQuery, query, movies }) {
  return (
    <header>
      <LogoTitle />
      <Search query={query} setQuery={setQuery} movies={movies} />
    </header>
  );
}

function LogoTitle() {
  return (
    <div className="logo-title">
      <img className="logo title-logo" src="logo/movie.png" alt="title Logo" />
      <h2 className="title text">MoviesCity</h2>
    </div>
  );
}

function Search({ setQuery, query, movies }) {
  const inputEl = useRef(null);

  function callback() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }

  useKey("Enter", callback);

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        width: "400px",
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your movie hare..."
        ref={inputEl}
      />
      <h3>{movies.length > 0 ? `${movies.length} Results` : " "}</h3>
    </div>
  );
}
