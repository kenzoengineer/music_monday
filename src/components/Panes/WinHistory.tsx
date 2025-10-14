import type { Entry, GenericPaneProps, Name } from "../../types";
import Pane from "../Pane";
import { Tooltip } from "react-tooltip";
import SpotifyEmbed from "../SpotifyEmbed";
import { useWindowDimension } from "../../script";

const SONG_TOOLTIP = "song-tooltip";

const WinHistory = ({ entries }: GenericPaneProps) => {
  const [w, _] = useWindowDimension();
  const MAX = w < 768 ? 7 : 30;
  let history: (Entry | "")[] = entries.filter((v) => v.winner);
  if (history.length < MAX) {
    history = (Array.from({ length: MAX - history.length }).fill("") as ""[])
      // @ts-ignore
      .concat(history);
  }
  if (history.length > MAX) {
    history = history.slice(-MAX);
  }
  console.log(history);
  const colorMap: Record<Name | "", string> = {
    Ken: "text-lime-600",
    Kevin: "text-cyan-600",
    Artom: "text-violet-600",
    Andrew: "text-red-600",
    Souren: "text-yellow-600",
    "": "text-zinc-700",
  };
  const backgroundMap: Record<Name, string> = {
    Ken: "bg-lime-600",
    Kevin: "bg-cyan-600",
    Artom: "bg-violet-600",
    Andrew: "bg-red-600",
    Souren: "bg-yellow-600",
  };
  return (
    <Pane title="Winner History" description={`Last ${MAX} weeks`}>
      <div className="flex gap-x-2 mb-4 -mt-2">
        {(Object.keys(colorMap) as (Name | "")[]).map((v) => {
          return <p className={`${colorMap[v]} font-bold`}>{v}</p>;
        })}
      </div>
      <div className="flex">
        {history.map((v, i) => {
          if (v === "") {
            return <div className="w-4 h-48 bg-zinc-700 mx-1 rounded-sm" />;
          }
          return (
            <div
              className={`w-4 h-48 ${
                backgroundMap[v.name as Name] ?? "bg-zinc-700"
              } mx-1 rounded-sm`}
              data-tooltip-id={SONG_TOOLTIP}
              data-tooltip-content={i.toString()}
              key={i}
            ></div>
          );
        })}
      </div>
      <Tooltip
        id={SONG_TOOLTIP}
        clickable
        render={({ content }) => {
          if (!content || typeof history[parseInt(content)] === "string")
            return <></>;
          return (
            <SpotifyEmbed url={(history[parseInt(content)] as Entry).song} />
          );
        }}
      />
    </Pane>
  );
};
export default WinHistory;
