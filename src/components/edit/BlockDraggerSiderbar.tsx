import { Slider } from "../../styles/Sidebar";

interface Props {
  visible: boolean;
}
const BlockDraggerSidebar: React.FC<Props> = ({ visible }) => {
  return <Slider open={visible} width="150px" borderDirection="left"></Slider>;
};

export default BlockDraggerSidebar;
