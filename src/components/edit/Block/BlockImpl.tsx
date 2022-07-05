import classNames from "classnames";
import { forwardRef } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styled, { css } from "styled-components";
import { PLACEHOLDER } from "../../../Contstants";
import { Block } from "../../../models/block";
import { BlockProperties, plain_text_props } from "../../../models/properties";

import styles from "./EditableBlock.module.scss";

export interface RenderderProps {
  block: Block;
  onChange: (newProps: BlockProperties) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const RenderPlainText = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as plain_text_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if ("text" in block.properties) {
        onChange({
          text: e.target.value,
        });
      }
    };
    return (
      <ContentEditable
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="p"
        placeholder={PLACEHOLDER}
        onChange={forwardContentEditableChange}
        // innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export const RenderTodo = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as plain_text_props;

    const forwardCheck = () => {
      if ("checked" in block.properties) {
        onChange({
          checked: !block.properties.checked,
        });
      }
    };

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if ("text" in block.properties) {
        onChange({
          text: e.target.value,
        });
      }
    };

    if ("checked" in block.properties) {
      return (
        <>
          {/* <div onClick={forwardCheck}>
              {block.properties.checked.toString()}
            </div> */}
          <TickBox $checked={block.properties.checked} onClick={forwardCheck} />
          <ContentEditable
            className={classNames(styles.plain_text, "focusable")}
            html={prop.properties.text}
            tagName="p"
            placeholder={PLACEHOLDER}
            onChange={forwardContentEditableChange}
            // innerRef={ref ?? undefined}
            onKeyDown={onKeyDown}
          />
        </>
      );
    }

    return <></>;
  }
);

const TickBox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  border-radius: 3px;
  border: 0.5px solid black;
  margin-right: 4px;

  ${(p) =>
    p.$checked &&
    css`
      background-image: url("/img/sidebarIcons/tick-box.svg");
      background-size: 20px;
      border: none;
    `}
`;
