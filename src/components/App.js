import { useEffect, useState } from "react";

import Nav from "./Nav.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { useMovie } from "../custom/useMovie.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [bodyWidth, setBodyWidth] = useState(0);

  const { isLoading, message, movies } = useMovie(query);

  useEffect(function () {
    setBodyWidth(document.querySelector("body").getBoundingClientRect().width);
  }, []);

  return (
    <div>
      {bodyWidth > 1000 && (
        <>
          <Nav query={query} setQuery={setQuery} movies={movies} />

          <Main
            movies={movies}
            isLoading={isLoading}
            message={message}
            query={query}
          />
          <Footer />
        </>
      )}
      {bodyWidth < 1000 && <Note setBodyWidth={setBodyWidth} />}
    </div>
  );
}

function Note({ setBodyWidth }) {
  return (
    <div className="note">
      <h3>Note: This application is not suitable for your device</h3>
      <p>Please use Leptop/Desktop for best experience</p>
      <button
        onClick={() => setBodyWidth((width) => 1100)}
        className="note-close"
      >
        Continou
      </button>
    </div>
  );
}
