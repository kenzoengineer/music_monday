export type Name = "Ken" | "Andrew" | "Artom" | "Kevin" | "Souren";

export interface Entry {
  name: Name;
  song: string;
  date: string;
  winner: boolean;
}

export interface GenericPaneProps {
  entries: Entry[];
}
