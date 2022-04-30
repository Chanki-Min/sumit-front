import { Icon, Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import { Slider } from "../../styles/Sidebar";

interface Props {
  visible: boolean;
}

const SlidesSelectionSidebar: React.FC<Props> = ({ visible }) => {
  return (
    <Slider open={visible} width="150px" borderDirection="right">
      <div></div>
    </Slider>
  );
};

export default SlidesSelectionSidebar;
