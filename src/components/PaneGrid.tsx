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
    <div>
      <MostRecent />
      <div className="flex gap-4 flex-wrap">
        <Leaderboard entries={entries} />
        <WinHistory entries={entries} />
        <LastSubmission entries={entries} />
        <WebPane entries={entries} />
      </div>
    </div>
  );
};

export default PaneGrid;
