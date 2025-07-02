import type { GenericPaneProps } from "../../types";
import Pane from "../Pane";
import SpotifyEmbed from "../SpotifyEmbed";

const LastSubmission = ({ entries }: GenericPaneProps) => {
  const lastSongs = entries.slice(entries.length - 4);
  return (
    <Pane title="Last Week" description="Songs from last week">
      <div className="flex flex-col gap-y-2">
        {lastSongs.map((x, i) => {
          return (
            <div
              className={`flex justify-center items-center text-center p-2 rounded-md ${
                x.winner && "bg-amber-200"
              }`}
            >
              <p
                className={`mr-2 font-bold ${x.winner && "text-zinc-900"}`}
                style={{ textOrientation: "mixed", writingMode: "sideways-lr" }}
              >
                {x.name}
              </p>
              <SpotifyEmbed url={x.song} key={i} />
            </div>
          );
        })}
      </div>
    </Pane>
  );
};

export default LastSubmission;
