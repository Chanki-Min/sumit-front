import { NextPage } from "next";
import { ReactElement, useEffect, useMemo, useState } from "react";
import fetchBlock from "../api/fetchBlock";
import { Block } from '../models/block'
import { plain_text_props, to_do_list_props } from "../models/properties";


const EditPage: NextPage = (props) => {
  const [block, setBlock] = useState<Block>();

  useEffect(() => {
    const f = async() => {
      const block  = await fetchBlock()
      setBlock(block)
    }
    f()
  }, [])

  if(typeof block === 'undefined') {
    return <></>
  }

  return <Block {...block} />
};

interface BlockProps extends Block {
}

const Block: React.FC<BlockProps> = (props) => {
  const { type, uuid, properties, children } = props;

  let renderElement: ReactElement<any, any> | null = (<></>);
  switch (type) {
    case 'to_do_list':
      renderElement = RenderTodo(props)
      break;
    case 'plain_text':
      renderElement = renderPlainText(props)
      break;
    default:
      break
  }


  return (
    <>
      {renderElement}
      <div style={{ marginLeft: '10px' }}>
        {
          props.children.map(cb => <Block key={cb.uuid} {...cb} />)
        }
      </div>
    </>
  )
}

const RenderTodo: React.FC<BlockProps> = (block: Block) => {
  const prop = block.properties as to_do_list_props

  const [checked, setChecked] = useState<boolean>(prop.checked)
  const toggleChecked = () => (setChecked(!checked))

  return (
    <>
      <div onClick={toggleChecked}><button style={{minHeight: '5px'}} >{checked ? 'V' : ' '}</button> {prop.text}</div>
    </>
  )
}

const renderPlainText = (block: Block): JSX.Element => {
  const prop = block.properties as plain_text_props

  return (
    <>
      <div>{prop.text}</div>
    </>
  )
}


export default EditPage;
