import { Block } from "../../models/block";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./Block/EditableBlock";
import { useCallback, useEffect, useState } from "react";

const initialBlock: Block = {
  uuid: uuidv4(),
  type: "root_block",
  properties: {},
  parent: null,
  order: 0,
  children: [
    {
      uuid: uuidv4(),
      type: "plain_text",
      properties: { text: "hello sumit!" },
      parent: null,
      order: 0,
      children: [],
    },
  ],
};

const Editor: React.FC = () => {
  const [rootBlock, setRootBlock] = useState(initialBlock);

  useEffect(() => {
    console.log("Call GetBlock API");
  }, []);
  /*
    root block은 형제가 존재하지 않기 떄문에 블록 핸들러는 아무 일도 하지 않는다.
    렌더링 최적화 및 자원 소모를 줄이기 위해 no-op function의 값(reference address)를 고정한다.
   */
  const nopFunc = useCallback(() => {}, []);

  return (
    <div id="slide">
      <EditableBlock
        block={rootBlock}
        onAddSibling={nopFunc}
        onDeleteThis={nopFunc}
      />
    </div>
  );
};

export const getDefaultBlock = (parent: string, myIndex: number): Block => {
  return {
    uuid: uuidv4(),
    type: "plain_text",
    properties: {
      text: "",
    },
    children: [],
    order: myIndex,
    parent: parent,
  };
};

export default Editor;
