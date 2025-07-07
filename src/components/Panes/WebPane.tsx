import type { GenericPaneProps } from "../../types";
import Pane from "../Pane";
import Web from "../Web";

const WebPane = ({ entries }: GenericPaneProps) => {
  return (
    <Pane
      title="Who votes who?"
      description="Number of times a pair has voted for eachother"
    >
      <div className="max-md:w-96 flex items-center justify-center">
        <div className="max-md:scale-75">
          <Web entries={entries} />
        </div>
      </div>
    </Pane>
  );
};

export default WebPane;
