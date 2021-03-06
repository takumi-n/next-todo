import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";

export default function EstimatedTime() {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const { todos } = useUser();
  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
  });

  const totalEstimatedMinutes = Object.values(todos)
    .filter(t => !t.done)
    .map(t => t.estimatedMinutes)
    .reduce((previous, current) => {
      return previous + current;
    }, 0);

  const estimatedTimeOfCompletion =
    currentTime + totalEstimatedMinutes * 60 * 1000; // To milliseconds

  return (
    <>
      {totalEstimatedMinutes > 0 ? (
        <span>
          完了予定時刻:{" "}
          {new Date(estimatedTimeOfCompletion).toLocaleTimeString()}
        </span>
      ) : (
        ""
      )}
    </>
  );
}
