import { useDrag } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { Block, SidebarBlock } from "../../models/block";
import { Slider } from "../../styles/Sidebar";

import { getBlockPrototype } from "../../tree/treeUtil";
import { ItemTypes } from "./Dropzone/Dropzone";

interface Props {
  visible: boolean;
}
const BlockDraggerSidebar: React.FC<Props> = ({ visible }) => {
  return (
    <Slider open={visible} width="150px" borderDirection="left">
      <PlainTextDragger />
    </Slider>
  );
};

const PlainTextDragger: React.FC = () => {
  const [{ isDragging }, drag] = useDrag<
    SidebarBlock,
    unknown, // drop function 의 반환 결과는 사용하지 않는다
    { isDragging: boolean }
  >(() => ({
    type: ItemTypes.SIDEBAR_BLOCK,
    item: getBlockPrototype("plain_text", undefined),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <div ref={drag}>플레인 텍스트</div>;
};

export default BlockDraggerSidebar;
