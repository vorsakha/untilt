import React, { useEffect, useState } from "react";
import { BsToggleOff } from "@react-icons/all-files/bs/BsToggleOff";
import { BsToggleOn } from "@react-icons/all-files/bs/BsToggleOn";
import BugView from "../components/Bug view/bugView";
import BugCard from "../components/bugCard";
import LoadingSpinner from "../components/common/loading";

// Redux
import { filter } from "../redux/bug/bugSlice";
import PriorityController from "../redux/utils/priority";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const SelectedBugs: React.FC<SelectedBugsTypes> = (props) => {
  const [displayBug, setDisplayBug] = useState<SelectedBugsFormTypes>({
    name: "",
    isDisplayed: false,
  });
  const [filteredArray, setFilteredArray] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { bugs, loading, isFiltered } = useAppSelector((state) => state.bugs);
  const [allBugsCount, setCount] = useState<number>(0);

  const handleName = (
    name: string,
    isDisplayed: boolean = !displayBug.isDisplayed
  ) => {
    setDisplayBug({
      isDisplayed: isDisplayed,
      name: name,
    });
  };

  const { level } = PriorityController(props.priority);

  const selected = bugs.filter(
    (b: { priority: number }) => b.priority === props.priority
  );

  const handleFilterBugs = () => {
    const pendingBugs = selected.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
    dispatch(filter());
  };

  useEffect(() => {
    const pendingBugs = selected.filter(
      (b: { status: string }) => b.status === "pending"
    );

    setFilteredArray(pendingBugs);
    // eslint-disable-next-line
  }, [bugs]);

  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    setCount(filteredArray.length);
  }, [filteredArray]);

  return (
    <div className="p-6 pt-10 max-w-screen-xl m-auto">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-center text-3xl font-medium mb-4">
        {level} Priority Bugs
      </h1>
      <div className="flex flex-row items-center mb-4">
        Show Unresolved bugs
        <span
          className="font-bold text-white text-xs rounded-full bg-gray-700 flex items-center justify-center font-mono mr-1 ml-1"
          style={{ height: "20px", width: "20px" }}
        >
          {allBugsCount}
        </span>
        :{" "}
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
          selected !== null &&
          selected.map((bug: any, key: number) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {selected.length === 0 && <p>No {level} priority bugs found.</p>}
        {isFiltered &&
          filteredArray !== null &&
          filteredArray.map((bug, key) => (
            <BugCard key={key} {...bug} clicked={handleName} />
          ))}
        {displayBug.isDisplayed && (
          <BugView
            bug={
              bugs.filter(
                (bug: { name: string }) => bug.name === displayBug.name
              )[0]
            }
            clicked={handleName}
          />
        )}
      </div>
    </div>
  );
};

export default SelectedBugs;
