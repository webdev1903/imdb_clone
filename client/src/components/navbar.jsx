import "./components.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <ul className="navbar">
      <li>
        <Link to="/" className="links">
          Dashboard
        </Link>
      </li>
      <li>
        <Link to="/editor" className="links">
          Editor
        </Link>
      </li>
    </ul>
  );
}
