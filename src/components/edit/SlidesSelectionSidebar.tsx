import { Icon, Menu, Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import Slide from "../../models/Slide";
import { Slider } from "../../styles/Sidebar";

interface Props {
  visible: boolean;
  slides: Slide[];
}

const SlidesSelectionSidebar: React.FC<Props> = ({ visible, slides }) => {
  return (
    <Slider open={visible} width="150px" borderDirection="right">
      {slides.map((slide) => {
        return <SlideContainer key={slide.uuid}>{slide.uuid}</SlideContainer>;
      })}
      {/* <div></div> */}
    </Slider>
  );
};

export default SlidesSelectionSidebar;

const SlideContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;
