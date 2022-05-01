import React, {
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Block } from "../../../models/block";
import { plain_text_props } from "../../../models/properties";
import { getDefaultBlock } from "../Editor";

import styles from "./EditableBlock.module.scss";

interface EditableBlockProps {
  block: Block;
  onAddSibling: (newBlock: Block, thisElement: HTMLElement | null) => void;
  onDeleteThis: (thisElement: HTMLElement | null) => void;
}

const EditableBlock: React.FC<EditableBlockProps> = (props) => {
  const { block: initialBlock, onAddSibling, onDeleteThis } = props;
  const [block, setBlock] = useState<Block>(initialBlock);

  const contentEditable = useRef<HTMLElement>(null);
  const previousKey = useRef<string>("");

  // react-contenteditable의 일부 변수가 상태 변경을 감지하지 못하기 때문에 text filed를 ref로도 저장한다.
  const textValue = useRef<string | null>(
    "text" in block.properties ? block.properties.text : null
  );

  useEffect(() => {
    if ("text" in block.properties) {
      textValue.current = block.properties.text;
    }

    // 개발용 테스트 구문
    console.log(
      "block updated\n",
      JSON.stringify({ ...block, children: "no dot print child" }, undefined, 2)
    );
  }, [block]);

  // contentEditable 에서 텍스트 수정 이벤트 발생시 블록을 업데이트한다
  const onChange = useCallback(
    (e: ContentEditableEvent) => {
      // text field가 존재할때만 블록을 업데이트한다
      if ("text" in block.properties) {
        setBlock({
          ...block,
          properties: {
            ...block.properties,
            text: e.target.value,
          },
        } as Block);
      }
    },
    [block]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const key = e.key;
      const prevKey = previousKey.current;
      //shift enter 지원
      if (key === "Enter" && prevKey !== "Shift") {
        e.preventDefault();
        console.log("key enter");
        onAddSibling(
          getDefaultBlock(block.uuid, block.order + 1),
          contentEditable.current
        );
      }
      if (key === "Backspace" && textValue.current === "") {
        e.preventDefault();
        onDeleteThis(contentEditable.current);
      }

      // TODO tab 이벤트 구현
      previousKey.current = key;
    },
    [block, onAddSibling, onDeleteThis]
  );

  // block에 자식 블록을 추가하고, 커서를 다음 엘리먼트로 옮긴다
  const addChildToNextIndex = (
    currentIndex: number,
    newBlock: Block,
    thisElement: HTMLElement | null
  ) => {
    const children = [...block.children];
    children.splice(currentIndex + 1, 0, newBlock);

    setBlock({
      ...block,
      children: children,
    });

    console.log("Call CrateBlock API");
    // TODO 커서를 생성된 엘리먼트로 옮기기
  };

  //block의 해당 index 자식 블록을 삭제한다
  const deleteBlockByIndex = (
    currentIndex: number,
    thisElement: HTMLElement | null
  ) => {
    const children = [...block.children];
    children.splice(currentIndex, 1);

    setBlock({
      ...block,
      children: children,
    });

    console.log("Call DeleteBlock API");
    // TODO 커서를 가장 가까운 상위 엘리먼트로 옮기기
  };

  let renderElement: ReactElement<any, any> | null = <></>;
  switch (block.type) {
    case "plain_text":
      renderElement = (
        <RenderPlainText
          block={block}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={contentEditable}
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
      {renderElement}
      <div style={{ marginLeft: "10px" }}>
        {block.children.map((cb, index) => (
          <EditableBlock
            key={cb.uuid}
            block={cb}
            onAddSibling={(block: Block, thisElement: HTMLElement | null) =>
              addChildToNextIndex(index, block, thisElement)
            }
            onDeleteThis={(thisElement: HTMLElement | null) =>
              deleteBlockByIndex(index, thisElement)
            }
          />
        ))}
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

const RenderPlainText = forwardRef<HTMLElement, RenderderProps>(
  function RenderPlainText({ block, onChange, onKeyDown }, ref) {
    const prop = block as plain_text_props;

    return (
      <ContentEditable
        className={styles.plain_text}
        html={prop.properties.text}
        tagName="p"
        onChange={onChange}
        innerRef={ref ?? undefined}
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
