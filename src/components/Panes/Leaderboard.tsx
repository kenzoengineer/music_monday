import type { GenericPaneProps, Name } from "../../types";
import Pane from "../Pane";

const Leaderboard = ({ entries }: GenericPaneProps) => {
  const winCounts = entries.reduce(
    (prev, curr) => {
      if (curr.winner) {
        return {
          ...prev,
          [curr.name]: prev[curr.name] + 1,
        };
      }
      return prev;
    },
    { Ken: 0, Andrew: 0, Artom: 0, Kevin: 0, Souren: 0 } as Record<Name, number>
  );
  // ordered
  const leaderboard = Object.entries(winCounts)
    .map(([name, wins]) => ({ name, wins }))
    .sort((a, b) => b.wins - a.wins);
  return (
    <Pane title="Leaderboard" description="All wins from the beginning of time">
      <div className="">
        {leaderboard.map((obj, idx) => {
          return (
            <div
              className="bg-zinc-700 my-2 px-2 py-1 rounded-md flex items-center"
              style={{
                opacity: 1 - 0.1 * idx,
              }}
              key={idx}
            >
              <div className="font-black text-lg mr-5">{idx + 1}.</div>
              <div className="font-medium">{obj.name}</div>
              <div className="ml-auto text-zinc-400">{obj.wins}</div>
            </div>
          );
        })}
      </div>
    </Pane>
  );
};

export default Leaderboard;
