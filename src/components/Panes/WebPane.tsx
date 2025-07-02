import type { GenericPaneProps } from "../../types";
import Pane from "../Pane";
import Web from "../Web";

const WebPane = ({ entries }: GenericPaneProps) => {
  return (
    <Pane
      title="Who votes who?"
      description="Number of times a pair has voted for eachother"
    >
      <Web entries={entries} />
    </Pane>
  );
};

export default WebPane;
