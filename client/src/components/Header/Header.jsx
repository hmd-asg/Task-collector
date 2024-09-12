import { Link, useLocation } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const location = useLocation();

  // Function to check if the current path is the login or signup page
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="d-flex justify-content-between bg-primary text-light mb-4 p-3">
      <div>
        {!isAuthPage && (
          <Link className="text-decoration-none text-light" to="/">
            <h1 className="m-0">Task Collector</h1>
          </Link>
        )}
      </div>
      <div>
        {!isAuthPage && Auth.loggedIn() ? (
          <>
            <Link className="btn btn-lg btn-info m-2" to="/">
              Dashboard
            </Link>
            <Link className="btn btn-lg btn-info m-2" to="/my-tasks">
              Tasks
            </Link>
            <Link className="btn btn-lg btn-info m-2" to="/profile">
              {Auth.getProfile().data.username}
            </Link>
            <button className="btn btn-lg btn-info m-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          !isAuthPage && (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-info m-2" to="/signup">
                Sign up
              </Link>
            </>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
