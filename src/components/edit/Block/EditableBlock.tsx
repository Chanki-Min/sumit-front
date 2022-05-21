import classNames from "classnames";
import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { Block } from "../../../models/block";
import { plain_text_props } from "../../../models/properties";
import { IWithPath } from "../../../tree/tree";
import { getNextPath } from "../../../tree/treeUtil";
import Dropzone, { ItemTypes } from "../Dropzone/Dropzone";
import { getDefaultBlock } from "../Editor";

import styles from "./EditableBlock.module.scss";

interface EditableBlockProps {
  block: Block;
  path: string;
  handleAddSibling: (dropPath: number[], newBlock: Block) => void;
  handleDeleteThis: (thisPath: number[], item: Block) => void;
  handleUpdateWithoutChildren: (thisPath: number[], updateProps: Block) => void;
  handleMoveToPath: (
    dropzonePath: number[],
    { path: itemPath, ...item }: IWithPath<Block>
  ) => void;
  handleIndentation: (
    splitParentPath: number[],
    splitItemPath: number[],
    item: Block,
    directon: "left" | "right"
  ) => void;
}

const EditableBlock: React.FC<EditableBlockProps> = (props) => {
  const {
    block,
    handleAddSibling,
    handleDeleteThis,
    handleUpdateWithoutChildren,
    handleMoveToPath,
    handleIndentation,
    path,
  } = props;

  const blockRef = useRef<Block>(block);

  const splitedPath = path.split("-").map(Number);
  const contentEditable = useRef<HTMLElement>(null);
  const previousKey = useRef<string>(""); // 직전에 눌린 Key stroke 문자열

  // react-contenteditable의 일부 변수가 상태 변경을 감지하지 못하기 때문에 text filed를 ref로도 저장한다.
  const textValue = useRef<string | null>(
    "text" in block.properties ? block.properties.text : null
  );
  useEffect(() => {
    if ("text" in block.properties) {
      textValue.current = block.properties.text;
    }

    blockRef.current = block;
  }, [block]);

  // contentEditable 에서 텍스트 수정 이벤트 발생시 블록을 업데이트한다
  const handleContentEditableChange = (e: ContentEditableEvent) => {
    // text field가 존재할때만 블록을 업데이트한다
    if ("text" in block.properties) {
      handleUpdateWithoutChildren(splitedPath, {
        ...block,
        properties: {
          ...block.properties,
          text: e.target.value,
        },
      } as Block);
    }
  };

  // 키보드 입력중 Enter, Tab, Backspace 등의 이벤트를 처리한다
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    const prevKey = previousKey.current;
    //shift enter 지원
    if (key === "Enter" && prevKey !== "Shift") {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent.isComposing || e.keyCode === 229) {
        return; // CJK IME의 Composing issue 수정용도임, ref: https://github.com/vuejs/vue/issues/10277#issuecomment-873337252
      }
      handleAddSibling(
        getNextPath(splitedPath),
        getDefaultBlock(block.uuid, block.order + 1)
      );
    }
    if (key === "Backspace" && textValue.current === "") {
      e.preventDefault();
      e.stopPropagation();
      if (splitedPath.length <= 2) {
        handleDeleteThis(splitedPath, blockRef.current);
      } else {
        const dropPath = splitedPath.slice(0, -1);
        dropPath[dropPath.length - 1] += 1;
        console.log(`back-move from: ${path} to ${dropPath}`);
        handleMoveToPath(dropPath, { path: path, ...blockRef.current });
      }
    }

    if (key === "Tab" && prevKey !== "Shift") {
      e.preventDefault();
      e.stopPropagation();
      if (splitedPath[splitedPath.length - 1] === 0) {
        return;
      }
      const siblingPath = Array.from(splitedPath);
      siblingPath[siblingPath.length - 1] += -1;
      handleIndentation(siblingPath, splitedPath, blockRef.current, "right");
    } else if (key === "Tab" && prevKey === "Shift") {
      e.preventDefault();
      e.stopPropagation();

      const siblingPath = Array.from(splitedPath).slice(0, -1);
      siblingPath[siblingPath.length - 1] += +1;

      handleIndentation(siblingPath, splitedPath, blockRef.current, "left");
    }
    previousKey.current = key;
  };

  // Dragger handler
  const [{ isDragging }, drag] = useDrag<
    IWithPath<Block>,
    unknown, // drop function 의 반환 결과는 사용하지 않는다
    { isDragging: boolean }
  >(
    () => ({
      type: ItemTypes.BLOCK,
      item: {
        ...block,
        path: path,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [path, block]
  );

  let renderElement: ReactElement<any, any> | null = <></>;
  switch (block.type) {
    case "plain_text":
      renderElement = (
        <RenderPlainText
          block={block}
          onChange={handleContentEditableChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;

    case "root_block":
      renderElement = <>root_block</>;
      break;
    default:
      renderElement = (
        <div id={block.uuid}>
          Not-implemented block. Type: {block.type}, Content:{" "}
          {JSON.stringify(block.properties)}
        </div>
      );
  }

  return (
    <>
      <Dropzone path={path} handleMoveToPath={handleMoveToPath} />
      <DraggerContainer ref={drag} id={`path-${path}`}>
        {renderElement}
      </DraggerContainer>

      <div style={{ marginLeft: "10px" }}>
        {block.children.map((cb, index) => (
          <EditableBlock
            path={`${path}-${index}`}
            key={`${path}-${index}-${cb.uuid}`}
            block={cb}
            handleAddSibling={handleAddSibling}
            handleDeleteThis={handleDeleteThis}
            handleUpdateWithoutChildren={handleUpdateWithoutChildren}
            handleMoveToPath={handleMoveToPath}
            handleIndentation={handleIndentation}
          />
        ))}
        <Dropzone
          path={`${path}-${block.children.length}`}
          handleMoveToPath={handleMoveToPath}
        />
      </div>
    </>
  );
};
export default EditableBlock;

interface RenderderProps {
  block: Block;
  onChange: (e: ContentEditableEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const DraggerContainer = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;

  * {
    flex: 1 1;
  }

  &::before {
    display: inline-block;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font: var(--fa-font-solid);
    content: "\f550";

    visibility: hidden;
    flex: 0 0;
    margin: 4px 3px 0 0;
  }

  &:focus-within::before {
    visibility: visible;
    content: "\f550";
  }
`;

const RenderPlainText = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as plain_text_props;

    return (
      <ContentEditable
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="p"
        onChange={onChange}
        // innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

// const RenderTodo: React.FC<EditableBlockProps> = ({ block }) => {
//   const prop = block as to_do_list_props;

//   const [checked, setChecked] = useState<boolean>(prop.properties.checked);
//   const toggleChecked = () => setChecked(!checked);

//   return (
//     <>
//       <div onClick={toggleChecked}>
//         <button style={{ minHeight: "5px" }}>{checked ? "V" : " "}</button>{" "}
//         {prop.properties.text}
//       </div>
//     </>
//   );
// };
