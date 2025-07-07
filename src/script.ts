import Papa from "papaparse";
import csvText from "./winners.csv?raw";
import type { Entry } from "./types";
import { useEffect, useState } from "react";

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

export const debounce = (fn: Function, ms: number) => {
  let timer: number | null;
  return () => {
    clearTimeout(timer as number);
    // @ts-ignore
    timer = setTimeout(function () {
      timer = null;
      fn.apply({}, arguments);
    }, ms);
  };
};

export const useWindowDimension = () => {
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setDimension([window.innerWidth, window.innerHeight]);
    }, 300);
    window.addEventListener("resize", debouncedResizeHandler);
    return () => window.removeEventListener("resize", debouncedResizeHandler);
  }, []);
  return dimension;
};
