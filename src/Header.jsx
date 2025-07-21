import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <h1>Northcoders News</h1>
      <nav className="nav">
        <ul className="nav-list">
          <Link className="link-names" to="/">
            {" "}
            Home
          </Link>
          <Link className="link-names" to="/topics">
            {" "}
            Topics
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
