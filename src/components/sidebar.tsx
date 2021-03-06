import { useState, useEffect } from "react";
import { NavLink as Link, useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "@react-icons/all-files/gi/GiHamburgerMenu";

// Components
import { signOut } from "../redux/auth/authSlice";
import { clearUsers } from "../redux/user/userSlice";
import { clearBugs } from "../redux/bug/bugSlice";

// Utils
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Sidebar = () => {
  const [myBugs, setMyBugs] = useState<number>(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  let history = useHistory();

  const { auth } = useAppSelector((state) => state);
  const { bugs } = useAppSelector((state) => state.bugs);

  const SignOut = () => {
    dispatch(signOut());
    dispatch(clearUsers());
    dispatch(clearBugs());

    setOpenMenu(false);

    history.push("/");
  };

  useEffect(() => {
    const filterMyBugs = bugs.filter(
      (b: AuthTypes) => b.assigned === auth.user
    );

    myBugs !== null && setMyBugs(filterMyBugs.length);
    // eslint-disable-next-line
  }, [bugs]);

  return (
    <div className="bg-gray-200 static md:fixed left-0 border-r border-gray-200 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="md:w-64 w-screen h-16 md:h-screen bg-white md:py-6 flex flex-row justify-between md:flex-col md:justify-start">
          <div className="flex flex-col items-center justify-center ml-4 md:mt-8 md:ml-0">
            <Link
              className="flex flex-col justify-center items-center text-center md:mb-5"
              to="/"
            >
              <h1 className="text-3xl font-bold font-mono">UNTILT</h1>
              <small className="hidden md:block font-sans italic">
                Bug Tracker
              </small>
            </Link>
            <p className="hidden md:block font-sans">Welcome, {auth.user}!</p>
          </div>
          <button className="md:hidden text-3xl mr-4">
            <GiHamburgerMenu onClick={() => setOpenMenu(!openMenu)} />
          </button>
          <div
            className={`${
              openMenu
                ? "absolute z-20 inset-0 top-16 bg-white min-h-screen items-center flex"
                : "hidden justify-between"
            } flex-col md:flex`}
          >
            <nav
              className={`${
                openMenu ? "items-center justify-center w-full" : ""
              } mt-10 flex flex-col`}
            >
              <Link
                className="flex w-full justify-center md:justify-start border-b-4 md:border-none items-center mt-5 py-2 px-8 md:border-r-4 border-white transition ease-in-out  hover:bg-gray-200  hover:border-gray-700"
                exact
                activeClassName="bg-gray-200 border-gray-700"
                to="/"
                onClick={() => setOpenMenu(false)}
              >
                <span className="mx-4 font-medium">Dashboard</span>
              </Link>
              <Link
                className="flex w-full justify-center md:justify-start border-b-4 md:border-none items-center mt-5 py-2 px-8  md:border-r-4 border-white transition ease-in-out  hover:bg-gray-200  hover:border-gray-700"
                exact
                activeClassName="bg-gray-200 border-gray-700"
                to="/view-bugs"
                onClick={() => setOpenMenu(false)}
              >
                <span className="mx-4 font-medium">View All Bugs</span>
              </Link>
              <Link
                className="flex w-full justify-center md:justify-start border-b-4 md:border-none items-center mt-5 py-2 px-8  md:border-r-4 border-white transition ease-in-out  hover:bg-gray-200  hover:border-gray-700"
                exact
                activeClassName="bg-gray-200 border-gray-700"
                to="/my-bugs"
                onClick={() => setOpenMenu(false)}
              >
                <span className="mx-4 font-medium flex flex-row items-center">
                  My Bugs{" "}
                  <span
                    className="font-bold ml-2 text-white text-xs rounded-full bg-gray-700 flex items-center justify-center font-mono"
                    style={{ height: "20px", width: "20px" }}
                    data-testid="my-bugs-qty"
                  >
                    {myBugs}
                  </span>
                </span>
              </Link>
              <Link
                activeClassName="bg-gray-200 border-gray-700"
                className="flex w-full justify-center md:justify-start border-b-4 md:border-none items-center mt-5 py-2 px-8  md:border-r-4 border-white transition ease-in-out  hover:bg-gray-200  hover:border-gray-700"
                to="/create-bug"
                onClick={() => setOpenMenu(false)}
              >
                <span className="mx-4 font-medium">Create Bug</span>
              </Link>
              <button
                className="flex items-center justify-center md:justify-start text-center w-full mt-5 py-2 px-8 md:border-r-4 border-white text-red-700 transition ease-in-out  hover:bg-red-200 hover:border-red-700"
                onClick={() => SignOut()}
              >
                <span className="mx-4 font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
