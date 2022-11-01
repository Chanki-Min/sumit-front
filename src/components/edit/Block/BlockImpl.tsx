import classNames from "classnames";
import { forwardRef, SyntheticEvent } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import styled, { css } from "styled-components";
import { PLACEHOLDER } from "../../../Contstants";
import { Block } from "../../../models/block";
import {
  BlockProperties,
  plain_text_props,
  bulleted_list_props,
  simple_margin_props,
  numbered_list_props,
} from "../../../models/properties";

import styles from "./EditableBlock.module.scss";

export interface RenderderProps {
  block: Block;
  onChange: (newProps: BlockProperties) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  numberedListIndex?: number;
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

export const RenderBulletedList = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as plain_text_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if ("text" in block.properties) {
        onChange({
          text: e.target.value,
        });
      }
    };
    console.log("return1");
    return (
      <>
        <BulletContainer>
          <Bullet $shape="fill-circle"></Bullet>
        </BulletContainer>
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
);

export const RenderNumberedList = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText(
    { block, onChange, onKeyDown, numberedListIndex },
    ref
  ) {
    const prop = block as numbered_list_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if ("text" in block.properties) {
        onChange({
          text: e.target.value,
        });
      }
    };

    return (
      <>
        <BulletContainer>
          <div id="numbered-list-index">
            {numberedListIndex ? `${numberedListIndex}.` : "1."}
          </div>
        </BulletContainer>
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

const BulletContainer = styled.div`
  width: 20px;
  height: 20px;
  flex: 0 0 20px;

  margin-right: 4px;
  justify-content: center;
  align-items: center;
`;
const Bullet = styled.div<{
  $shape: "fill-circle" | "empty-circle" | "square";
}>`
  margin: 6px;
  width: 8px;
  height: 8px;

  ${(p) => {
    switch (p.$shape) {
      case "fill-circle":
        return css`
          border-radius: 50%;
          background-color: black;
        `;
      case "empty-circle":
        return css`
          border-radius: 0%;
          background-color: black;
        `;
      case "square":
        return css`
          border-radius: 50%;
          background-color: transparent;
        `;
    }
  }}
`;

// TODO simple margin 구현
export const RenderSimpleMargin = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as simple_margin_props;

    return <span>Contents</span>;
  }
);
