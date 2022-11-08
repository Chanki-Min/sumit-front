import React, { ReactElement, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { Block } from "../../../models/block";
import { BlockProperties } from "../../../models/properties";
import { DraggerContainer } from "../../../styles/Block";
import { IWithPath } from "../../../tree/tree";
import { getBlockPrototype, getNextPath } from "../../../tree/treeUtil";
import Dropzone, { ItemTypes } from "../Dropzone/Dropzone";
import {
  RenderBulletedList,
  RenderHeading1,
  RenderHeading2,
  RenderHeading3,
  RenderNumberedList,
  RenderPlainText,
  RenderSimpleMargin,
  RenderTodo,
} from "./BlockImpl";

interface EditableBlockProps {
  block: Block;
  siblingList: Block[];
  path: string;
  handleAddBlock: (
    dropPath: number[],
    parentId: string | null,
    newBlock: Block
  ) => void;
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
    handleAddBlock,
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
    typeof block.properties === "object" && "text" in block.properties
      ? block.properties.text
      : ""
  );
  useEffect(() => {
    if ("text" in block.properties) {
      textValue.current = block.properties.text;
    }

    blockRef.current = block;
  }, [block]);

  // 블록 속성 변경 핸들러
  const handlePropertyChange = (newProps: BlockProperties) => {
    // text field가 존재할때만 블록을 업데이트한다

    handleUpdateWithoutChildren(splitedPath, {
      ...block,
      properties: {
        ...block.properties,
        ...newProps,
      },
    } as Block);
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
      const nextPath = getNextPath(splitedPath);
      handleAddBlock(
        nextPath,
        block.parent,
        getBlockPrototype(block.type, {
          order: nextPath[nextPath.length - 1],
          parent: block.parent,
        })
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

      const dropPath = Array.from(splitedPath).slice(0, -1);
      dropPath[dropPath.length - 1] += +1;

      handleIndentation(dropPath, splitedPath, blockRef.current, "left");
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
  console.log(block.type);
  switch (block.type) {
    case "plain_text":
      renderElement = (
        <RenderPlainText
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;
    case "heading_1":
      renderElement = (
        <RenderHeading1
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;
    case "heading_2":
      renderElement = (
        <RenderHeading2
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;
    case "heading_3":
      renderElement = (
        <RenderHeading3
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;
    case "to_do_list":
      renderElement = (
        <RenderTodo
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          ref={contentEditable}
        />
      );
      break;
    case "bulleted_list":
      renderElement = (
        <RenderBulletedList
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          // ref={contentEditable}
        />
      );
      break;
    case "numbered_list":
      const firstIndex = getNumberedBlockIndex(
        props.siblingList,
        splitedPath[splitedPath.length - 1]
      );

      const myIndex = 1 + (splitedPath[splitedPath.length - 1] - firstIndex);

      renderElement = (
        <RenderNumberedList
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
          numberedListIndex={myIndex}
          // ref={contentEditable}
        />
      );
      break;
    case "simple_margin":
      renderElement = (
        <RenderSimpleMargin
          block={block}
          onChange={handlePropertyChange}
          onKeyDown={handleKeyDown}
        />
      );
      break;
    case "root_block":
      renderElement = <></>;
      break;
    default:
      renderElement = (
        <div id={block.uuid}>
          Not-implemented block. Type: {block.type}, Content:{" "}
          {JSON.stringify(block.properties)}
        </div>
      );
  }

  if (block.type === "root_block") {
    return (
      <div>
        {block.children.map((cb, index) => (
          <EditableBlock
            path={`${path}-${index}`}
            key={`${path}-${index}-${cb.uuid}`}
            block={cb}
            siblingList={block.children}
            handleAddBlock={handleAddBlock}
            handleDeleteThis={handleDeleteThis}
            handleUpdateWithoutChildren={handleUpdateWithoutChildren}
            handleMoveToPath={handleMoveToPath}
            handleIndentation={handleIndentation}
          />
        ))}
        <div style={{ position: "relative" }}>
          <Dropzone
            parentId={block.uuid}
            path={`${path}-${block.children.length}`}
            handleMoveToPath={handleMoveToPath}
            handleAddBlock={handleAddBlock}
          />
        </div>
      </div>
    );
  }

  if (block.type === "grid_divider") {
    return null;
  }

  if (block.type === "grid_1x2") {
    // TODO GRID 블록 구현

    const dividerIndex = block.children.findIndex(
      (b) => b.type === "grid_divider"
    );

    const left = block.children.slice(0, dividerIndex);
    const right = block.children.slice(dividerIndex + 1);

    console.log(left, right, dividerIndex);

    return (
      <>
        <div style={{ position: "relative" }}>
          <Dropzone
            parentId={block.parent}
            key={`dropzone_${path}`}
            path={path}
            handleMoveToPath={handleMoveToPath}
            handleAddBlock={handleAddBlock}
          />
          <DraggerContainer ref={drag} id={`path-${path}`}>
            <div
              style={{
                marginLeft: "15px",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                {left.map((cb, index) => {
                  return (
                    <EditableBlock
                      path={`${path}-${index}`}
                      key={`${path}-${index}-${cb.uuid}`}
                      block={cb}
                      siblingList={block.children}
                      handleAddBlock={handleAddBlock}
                      handleDeleteThis={handleDeleteThis}
                      handleUpdateWithoutChildren={handleUpdateWithoutChildren}
                      handleMoveToPath={handleMoveToPath}
                      handleIndentation={handleIndentation}
                    />
                  );
                })}
              </div>
              <div>
                {right.map((cb, index) => {
                  console.log(index, dividerIndex, index + dividerIndex);
                  return (
                    <EditableBlock
                      path={`${path}-${index + dividerIndex + 1}`}
                      key={`${path}-${index + dividerIndex + 1}-${cb.uuid}`}
                      block={cb}
                      siblingList={block.children}
                      handleAddBlock={handleAddBlock}
                      handleDeleteThis={handleDeleteThis}
                      handleUpdateWithoutChildren={handleUpdateWithoutChildren}
                      handleMoveToPath={handleMoveToPath}
                      handleIndentation={handleIndentation}
                    />
                  );
                })}
              </div>
            </div>
          </DraggerContainer>
        </div>
      </>
    );
  }
  // TODO: css 고치기 (너무 inline style에 의존하는데, 고쳐야 합니다)
  return (
    <>
      <div style={{ position: "relative" }}>
        <Dropzone
          parentId={block.parent}
          key={`dropzone_${path}`}
          path={path}
          handleMoveToPath={handleMoveToPath}
          handleAddBlock={handleAddBlock}
        />
        <DraggerContainer ref={drag} id={`path-${path}`}>
          {renderElement}
        </DraggerContainer>

        <div style={{ marginLeft: "15px", position: "relative" }}>
          {block.children.map((cb, index) => {
            return (
              <EditableBlock
                path={`${path}-${index}`}
                key={`${path}-${index}-${cb.uuid}`}
                block={cb}
                siblingList={block.children}
                handleAddBlock={handleAddBlock}
                handleDeleteThis={handleDeleteThis}
                handleUpdateWithoutChildren={handleUpdateWithoutChildren}
                handleMoveToPath={handleMoveToPath}
                handleIndentation={handleIndentation}
              />
            );
          })}
          <div style={{ position: "relative" }}>
            <Dropzone
              parentId={block.parent}
              key={`dropzone_${path}-${block.children.length}`}
              path={`${path}-${block.children.length}`}
              handleMoveToPath={handleMoveToPath}
              handleAddBlock={handleAddBlock}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditableBlock;

const getNumberedBlockIndex = (siblings: Block[], myIndex: number): number => {
  if (
    myIndex === 0 ||
    siblings.length === 0 ||
    siblings[myIndex - 1].type !== "numbered_list"
  ) {
    return myIndex;
  }

  return getNumberedBlockIndex(siblings, myIndex - 1);
};
