import { useEffect, useRef } from "react";

// import "./index.css";
export default function Nav({ setQuery, query }) {
  return (
    <header>
      <LogoTitle />
      <Search query={query} setQuery={setQuery} />
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

function Search({ setQuery, query }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Enter") {
          if (document.activeElement === inputEl.current) return;
          inputEl.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);

      return document.addEventListener("keydown", callback);
    },
    [setQuery]
  );
  return (
    <input
      style={{
        height: "20px",
        width: "200px",
        fontSize: "15px",
        padding: "10px",

        borderRadius: "15px",
      }}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search your movie hare..."
      ref={inputEl}
    />
  );
}
