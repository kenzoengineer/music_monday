import Papa from "papaparse";
import csvText from "./winners.csv?raw";
import type { Entry } from "./types";

export const processFile = async (): Promise<Entry[]> => {
  const result = Papa.parse(csvText, { header: true, skipEmptyLines: true });
  const data = result.data.map((row: any) => ({
    ...row,
    winner: row.winner === "1",
  }));

  return data;
};

export const linkToEmbedLink = (link: string) => {
  const match = link.match(/\/track\/([a-zA-Z0-9]+)/);
  const trackId = match?.[1];

  if (!trackId) return link;

  return `https://open.spotify.com/embed/track/${trackId}`;
};
