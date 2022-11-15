import classNames from "classnames";
import { forwardRef, SyntheticEvent, useEffect, useRef, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { GridProps } from "semantic-ui-react";
import styled, { css } from "styled-components";
import { PLACEHOLDER } from "../../../Contstants";
import { Block } from "../../../models/block";
import * as Hangul from "hangul-js";
import {
  BlockProperties,
  plain_text_props,
  heading_props,
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
  editable: boolean;
}

export const RenderPlainText = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as plain_text_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
        });
      }
    };
    return (
      <ContentEditable
        disabled={!editable}
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="p"
        placeholder={PLACEHOLDER}
        onChange={forwardContentEditableChange}
        innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export const RenderHeading1 = forwardRef<HTMLElement, RenderderProps>(
  function RenderHeading1({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as heading_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
        });
      }
    };
    return (
      <ContentEditable
        disabled={!editable}
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="h1"
        placeholder={PLACEHOLDER}
        onChange={forwardContentEditableChange}
        innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export const RenderHeading2 = forwardRef<HTMLElement, RenderderProps>(
  function RenderHeading2({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as heading_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
        });
      }
    };

    return (
      <ContentEditable
        disabled={!editable}
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="h2"
        placeholder={PLACEHOLDER}
        onChange={forwardContentEditableChange}
        innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export const RenderHeading3 = forwardRef<HTMLElement, RenderderProps>(
  function RenderHeading3({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as heading_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
        });
      }
    };
    return (
      <ContentEditable
        disabled={!editable}
        className={classNames(styles.plain_text, "focusable")}
        html={prop.properties.text}
        tagName="h3"
        placeholder={PLACEHOLDER}
        onChange={forwardContentEditableChange}
        innerRef={ref ?? undefined}
        onKeyDown={onKeyDown}
      />
    );
  }
);

export const RenderTodo = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as plain_text_props;

    const forwardCheck = () => {
      if (!editable) {
        return;
      }

      if ("checked" in block.properties) {
        onChange({
          checked: !block.properties.checked,
        });
      }
    };

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
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
            disabled={!editable}
            className={classNames(styles.plain_text, "focusable")}
            html={prop.properties.text}
            tagName="p"
            placeholder={PLACEHOLDER}
            onChange={forwardContentEditableChange}
            innerRef={ref ?? undefined}
            onKeyDown={onKeyDown}
          />
        </>
      );
    }

    return <></>;
  }
);

export const RenderBulletedList = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as bulleted_list_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
        });
      }
    };

    return (
      <>
        <BulletContainer>
          <Bullet $shape="fill-circle"></Bullet>
        </BulletContainer>
        <ContentEditable
          disabled={!editable}
          className={classNames(styles.plain_text, "focusable")}
          html={prop.properties.text}
          tagName="p"
          placeholder={PLACEHOLDER}
          onChange={forwardContentEditableChange}
          innerRef={ref ?? undefined}
          onKeyDown={onKeyDown}
        />
      </>
    );
  }
);

export const RenderNumberedList = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText(
    { block, onChange, onKeyDown, numberedListIndex, editable },
    ref
  ) {
    const prop = block as numbered_list_props;

    const forwardContentEditableChange = (e: ContentEditableEvent) => {
      if (!editable) {
        return;
      }

      if ("text" in block.properties) {
        onChange({
          text: Hangul.assemble(Hangul.disassemble(e.target.value)),
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
          disabled={!editable}
          className={classNames(styles.plain_text, "focusable")}
          html={prop.properties.text}
          tagName="p"
          placeholder={PLACEHOLDER}
          onChange={forwardContentEditableChange}
          innerRef={ref ?? undefined}
          onKeyDown={onKeyDown}
        />
      </>
    );
  }
);

export const RenderSimpleMargin = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown, editable }, ref) {
    const prop = block as simple_margin_props;
    const [height, setHeight] = useState(prop.properties.height ?? 50);
    const innerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!editable) {
        return;
      }

      onChange({
        height: height,
      });
    }, [height, editable, onChange]);

    const handler = (mouseDownEvent: React.MouseEvent<HTMLButtonElement>) => {
      if (!editable) {
        return;
      }

      mouseDownEvent.preventDefault();
      mouseDownEvent.stopPropagation();
      const startSize = { y: height };
      const startPosition = {
        y: mouseDownEvent.pageY,
      };

      function onMouseMove(mouseMoveEvent: MouseEvent) {
        mouseDownEvent.preventDefault();
        mouseDownEvent.stopPropagation();
        setHeight(
          (currentSize) => startSize.y - startPosition.y + mouseMoveEvent.pageY
        );
      }
      function onMouseUp() {
        mouseDownEvent.preventDefault();
        mouseDownEvent.stopPropagation();
        document.body.removeEventListener("mousemove", onMouseMove);
      }

      document.body.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseup", onMouseUp, { once: true });
    };

    return (
      <div
        tabIndex={0}
        ref={innerRef}
        className={classNames(styles.plain_text, "focusable")}
        style={{
          height,
          backgroundColor: editable ? "red" : undefined,
          position: "relative",
        }}
        onKeyDown={onKeyDown}
      >
        <DraggerButton
          $editable={editable}
          id="draghandle"
          type="button"
          onMouseDown={handler}
        ></DraggerButton>
      </div>
    );
  }
);

const DraggerButton = styled.button<{ $editable: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10px;
  opacity: 0;

  ${(p) =>
    p.$editable &&
    css`
      &:hover {
        opacity: 1;
      }
    `}
`;

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
