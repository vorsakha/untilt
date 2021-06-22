import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";
import { filter } from "../../Controllers/Redux/bugSlice";
import BugView from "../Components/Bug view/bugView";
import LoadingSpinner from "../Components/loading";
import BugCard from "../Components/bugCard";

const Bugs = () => {
  const [displayBug, setDisplayBug] = useState({
    name: "",
    isDisplayed: false,
  });
  const [filteredArray, setFilteredArray] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { bugs, loading, isFiltered } = useSelector((state) => state.bugs);

  const handleName = (name) => {
    setDisplayBug({
      isDisplayed: !displayBug.isDisplayed,
      name: name,
    });
  };

  const handleFilterBugs = () => {
    const pendingBugs =
      bugs !== null && bugs.filter((b) => b.status === "pending");

    bugs !== null && setFilteredArray(pendingBugs);
    dispatch(filter());
  };

  useEffect(() => {
    const pendingBugs =
      bugs !== null && bugs.filter((b) => b.status === "pending");

    bugs !== null && setFilteredArray(pendingBugs);
  }, [bugs]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="p-6 pt-10 max-w-screen-xl m-auto">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-center text-3xl font-medium">All Bugs</h1>
      <div className="flex flex-row items-center mb-4">
        Show Unresolved bugs:{" "}
        <button
          className="flex flex-row px-2 py-1 rounded ring-black ring-opacity-5 transition ease-in-out disabled:opacity-20"
          onClick={handleFilterBugs}
          disabled={bugs !== null && bugs.length === 0}
        >
          {!isFiltered ? (
            <BsToggleOff className="text-gray-700 text-2xl" />
          ) : (
            <BsToggleOn className="text-gray-700 text-2xl" />
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center col-span-2">
        {!isFiltered &&
          bugs !== null &&
          bugs.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {bugs === null && setFilteredArray.length === 0 && (
          <p>No bugs found.</p>
        )}
        {isFiltered &&
          filteredArray !== null &&
          filteredArray.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {bugs !== null && displayBug.isDisplayed && (
          <BugView
            bug={bugs.filter((bug) => bug.name === displayBug.name)[0]}
            clicked={handleName}
          />
        )}
      </div>
    </div>
  );
};

export default Bugs;
