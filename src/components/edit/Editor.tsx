import { Block } from "../../models/block";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./Block/EditableBlock";

const initialBlock: Block = {
  uuid: uuidv4(),
  type: "root_block",
  properties: {},
  parent: null,
  order: 0,
  children: [],
};

const Editor: React.FC = () => {
  return (
    <div id="slide">
      <EditableBlock block={initialBlock} />
    </div>
  );
};

export default Editor;
