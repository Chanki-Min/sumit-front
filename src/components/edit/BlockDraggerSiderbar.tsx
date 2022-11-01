import { faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Block, SidebarBlock } from "../../models/block";
import { BlockTypes } from "../../models/properties";
import { Slider } from "../../styles/Sidebar";

import { getBlockPrototype } from "../../tree/treeUtil";
import { ItemTypes } from "./Dropzone/Dropzone";

interface Props {
  visible: boolean;
}
const BlockDraggerSidebar: React.FC<Props> = ({ visible }) => {
  return (
    <Slider open={visible} width="200px" borderDirection="left">
      <Divider>기본 블록</Divider>
      <SidebarElement
        title="텍스트"
        desc="기본 텍스트를 사용해 내용을 작성하세요"
        iconSrc="/img/sidebarIcons/plain_text.svg"
        blockType="plain_text"
      />
      <SidebarElement
        title="to-do 리스트"
        desc="to-do 리스트로 진행사항을 정리하세요"
        iconSrc="/img/sidebarIcons/list-check-solid.svg"
        blockType="to_do_list"
      />
      <SidebarElement
        title="bulleted 리스트"
        desc="간단한 bulleted 리스트를 만들어보세요"
        iconSrc="/img/sidebarIcons/bulleted-list.png"
        blockType="bulleted_list"
      />
      <SidebarElement
        title="numbered 리스트"
        desc="숫자로 정리된 리스트를 만들어보세요"
        iconSrc="/img/sidebarIcons/numbered-list.png"
        blockType="numbered_list"
      />
      <SidebarElement
        title="간편한 간격"
        desc="조절 가능한 간격으로 구획을 나눠보세요"
        iconSrc="/img/sidebarIcons/divider.png"
        blockType="simple_margin"
      />
    </Slider>
  );
};

const Divider = styled.div`
  display: flex;
  padding-left: 6px;
  padding-right: 14px;
  color: rgba(55, 53, 47, 0.65);
  font-size: 11px;
  font-weight: 500;
  line-height: 120%;
  user-select: none;
  text-transform: uppercase;
`;

interface SidebarElementProps {
  title: string;
  desc: string;
  iconSrc: string;
  blockType: BlockTypes;
}

const SidebarElement: React.FC<SidebarElementProps> = ({
  title,
  desc,
  iconSrc,
  blockType,
}) => {
  const [{ isDragging }, drag] = useDrag<
    SidebarBlock,
    unknown, // drop function 의 반환 결과는 사용하지 않는다
    { isDragging: boolean }
  >(() => ({
    type: ItemTypes.SIDEBAR_BLOCK,
    item: getBlockPrototype(blockType, undefined),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <SidebarElementContainer ref={drag}>
      <div className="icon_container">
        <Image
          unselectable="on"
          layout="fill"
          src={iconSrc}
          alt="plain text icon"
        />
      </div>
      <div className="title_and_desc">
        <div className="title">{title}</div>
        <div className="desc">{desc}</div>
      </div>
    </SidebarElementContainer>
  );
};

const SidebarElementContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 120%;
  width: 100%;
  user-select: none;
  min-height: 45px;
  font-size: 14px;
  padding-top: 4px;
  padding-bottom: 4px;

  .icon_container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    margin-right: 4px;
    margin-top: 1px;
    align-self: flex-start;
    flex: 1 1 60px;
  }

  .title_and_desc {
    margin-left: 6px;
    margin-right: 12px;
    min-width: 0px;
    flex: 1 1 auto;

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .desc {
      /* white-space: nowrap;
      overflow: hidden; */
      /* text-overflow: ellipsis; */
      color: rgba(55, 53, 47, 0.65);
      margin-top: 2px;
      font-size: 12px;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-height: 14.4px; /* fallback */
      max-height: 28.8px; /* fallback */
    }
  }
`;

export default BlockDraggerSidebar;
