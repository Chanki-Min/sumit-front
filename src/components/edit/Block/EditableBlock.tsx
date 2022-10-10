import classNames from "classnames";
import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useDrag } from "react-dnd";
import styled, { css } from "styled-components";
import { PLACEHOLDER } from "../../../Contstants";
import { Block, SidebarBlock } from "../../../models/block";
import {
  BlockProperties,
  BlockTypes,
  plain_text_props,
  to_do_list_props,
} from "../../../models/properties";
import { DraggerContainer } from "../../../styles/Block";
import { IWithPath } from "../../../tree/tree";
import { getBlockPrototype, getNextPath } from "../../../tree/treeUtil";
import Dropzone, { ItemTypes } from "../Dropzone/Dropzone";
import { RenderPlainText, RenderTodo } from "./BlockImpl";

import styles from "./EditableBlock.module.scss";

interface EditableBlockProps {
  block: Block;
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
      : null
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
          {block.children.map((cb, index) => (
            <EditableBlock
              path={`${path}-${index}`}
              key={`${path}-${index}-${cb.uuid}`}
              block={cb}
              handleAddBlock={handleAddBlock}
              handleDeleteThis={handleDeleteThis}
              handleUpdateWithoutChildren={handleUpdateWithoutChildren}
              handleMoveToPath={handleMoveToPath}
              handleIndentation={handleIndentation}
            />
          ))}
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
