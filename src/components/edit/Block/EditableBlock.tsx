import { ReactElement, useState } from "react";
import { Block } from "../../../models/block";
import { plain_text_props, to_do_list_props } from "../../../models/properties";

interface EditableBlockProps {
  block: Block;
}

const EditableBlock: React.FC<EditableBlockProps> = (props) => {
  const {
    block: { type, uuid, properties, children },
  } = props;

  let renderElement: ReactElement<any, any> | null = <></>;
  switch (type) {
    case "to_do_list":
      renderElement = RenderTodo(props);
      break;
    case "plain_text":
      renderElement = RenderPlainText(props);
      break;
    default:
      return (
        <div id={uuid}>
          Type: {type}, Content: {JSON.stringify(properties)}
        </div>
      );
      break;
  }

  return (
    <>
      {renderElement}
      <div style={{ marginLeft: "10px" }}>
        {children.map((cb) => (
          <EditableBlock key={cb.uuid} block={cb} />
        ))}
      </div>
    </>
  );
};
export default EditableBlock;

const RenderTodo: React.FC<EditableBlockProps> = ({ block }) => {
  const prop = block as to_do_list_props;

  const [checked, setChecked] = useState<boolean>(prop.properties.checked);
  const toggleChecked = () => setChecked(!checked);

  return (
    <>
      <div onClick={toggleChecked}>
        <button style={{ minHeight: "5px" }}>{checked ? "V" : " "}</button>{" "}
        {prop.properties.text}
      </div>
    </>
  );
};

const RenderPlainText: React.FC<EditableBlockProps> = ({ block }) => {
  const prop = block as plain_text_props;

  return (
    <>
      <div>{prop.properties.text}</div>
    </>
  );
};
