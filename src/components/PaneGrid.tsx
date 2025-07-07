import { useEffect, useState } from "react";
import Leaderboard from "./Panes/Leaderboard";
import { processFile } from "../script";
import type { Entry } from "../types";
import MostRecent from "./Panes/MostRecent";
import WinHistory from "./Panes/WinHistory";
import LastSubmission from "./Panes/LastSubmission";
import WebPane from "./Panes/WebPane";

const PaneGrid = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    (async () => {
      const records = await processFile();
      setEntries(records);
    })();
  }, []);
  return (
    <div className="">
      <MostRecent />
      <div className="flex gap-4 flex-wrap max-xl:hidden">
        <Leaderboard entries={entries} />
        <WinHistory entries={entries} />
        <LastSubmission entries={entries} />
        <WebPane entries={entries} />
      </div>
      <div className="flex gap-4 max-md:flex-col md:flex-wrap max-lg:justify-center max-md:items-center xl:hidden">
        <Leaderboard entries={entries} />
        <LastSubmission entries={entries} />
        <WebPane entries={entries} />
        <WinHistory entries={entries} />
      </div>
    </div>
  );
};

export default PaneGrid;
