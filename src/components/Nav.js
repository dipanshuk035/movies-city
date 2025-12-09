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
    />
  );
}
