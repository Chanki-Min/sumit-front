import { Block } from "../models/block";

 const fetchBlock = async() => {
    return todo_slide;
}

const todo_slide: Block = {
    uuid: 1,
    type: "to_do_list",
    properties: { text: "부모 블록", checked: false },
    parent: null,
    order: 0,
    children: [
      {
        uuid: 2,
        type: "plain_text",
        properties: { text: "텍스트 1" },
        parent: 1,
        children: [
          {
            uuid: 3,
            type: "plain_text",
            properties: { text: "텍스트 2" },
            parent: 1,
            children: [],
            order: 1
          },
        ],
        order: 0
      },
      {
        uuid: 3,
        type: "plain_text",
        properties: { text: "텍스트 2" },
        parent: 1,
        children: [],
        order: 1
      },
    ],
  };

export default fetchBlock;