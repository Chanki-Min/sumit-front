import { rest } from "msw";

const apiPort = process.env.API_PORT || 8000;

export const handlers = [
  rest.get(`http://localhost:${apiPort}/pages`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          uuid: "f8c8ed6a-a58e-4ecd-9a78-ebebe2b9895e",
          user_uuid: "google-oauth2|116907406893832294287",
          title: "테스트",
          description: null,
          share: false,
          hashtags: null,
          createAt: "2022-10-11T23:53:02.413Z",
          updateAt: "2022-10-11T23:53:40.866Z",
          slides: [
            {
              uuid: "3b209d26-95f1-4206-904f-18ed74a81d3b",
              pathname: "/",
              order: 0,
              createAt: "2022-10-11T23:53:03.269Z",
              updateAt: "2022-10-11T23:53:03.269Z",
              root_block: {
                uuid: "0710d590-6dc6-433a-9f0d-20e350bb5a75",
                type: "root_block",
                properties: {},
                order: 0,
                pid: null,
                createAt: "2022-10-11T23:53:02.701Z",
                updateAt: "2022-10-11T23:53:02.701Z",
              },
            },
          ],
        },
        {
          uuid: "9099c0c5-9861-4b99-953a-848955d81170",
          user_uuid: "google-oauth2|116907406893832294287",
          title: "새 페이지",
          description: null,
          share: false,
          hashtags: null,
          createAt: "2022-10-12T00:01:58.241Z",
          updateAt: "2022-10-12T00:01:58.241Z",
          slides: [
            {
              uuid: "cfa2e943-6406-428b-9f27-7ddb881e5ad2",
              pathname: "/",
              order: 0,
              createAt: "2022-10-12T00:01:58.537Z",
              updateAt: "2022-10-12T00:01:58.537Z",
              root_block: {
                uuid: "9f774aa0-70a7-4a3f-b04d-ad0986d8eff5",
                type: "root_block",
                properties: {},
                order: 0,
                pid: null,
                createAt: "2022-10-12T00:01:58.375Z",
                updateAt: "2022-10-12T00:01:58.375Z",
              },
            },
          ],
        },
      ])
    );
  }),

  rest.get(`http://localhost:${apiPort}/pages/*`, (req, res, ctx) => {
    return res(
      ctx.json({
        uuid: "f8c8ed6a-a58e-4ecd-9a78-ebebe2b9895e",
        user_uuid: "google-oauth2|116907406893832294287",
        title: "테스트",
        description: null,
        share: false,
        hashtags: null,
        createAt: "2022-10-11T23:53:02.413Z",
        updateAt: "2022-10-11T23:53:40.866Z",
        slides: [
          {
            uuid: "3b209d26-95f1-4206-904f-18ed74a81d3b",
            pathname: "/",
            order: 0,
            createAt: "2022-10-11T23:53:03.269Z",
            updateAt: "2022-10-11T23:53:03.269Z",
            root_block: {
              uuid: "0710d590-6dc6-433a-9f0d-20e350bb5a75",
              type: "root_block",
              properties: {},
              order: 0,
              pid: null,
              createAt: "2022-10-11T23:53:02.701Z",
              updateAt: "2022-10-11T23:53:02.701Z",
            },
          },
        ],
      })
    );
  }),

  rest.post(`/api/uploadImage`, (req, res, ctx) => {
    return res(
      ctx.json({
        ETag: '"9c7c18ecaf931be5aa406738538fef27"',
        Location:
          "https://s3.ap-northeast-2.amazonaws.com/images.sumit-project.com/user-thmb/google-oauth2%7C116907406893832294287",
        key: "user-thmb/google-oauth2|116907406893832294287",
        Key: "user-thmb/google-oauth2|116907406893832294287",
        Bucket: "images.sumit-project.com",
      })
    );
  }),
  rest.get(`/api/pages/search`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          uuid: "a97dea6d-2d69-4e07-b5b7-f4a32b8b1ba1",
          user_uuid: "google-oauth2|116907406893832294287",
          title: "새 페이지 2",
          description: null,
          share: false,
          hashtags: null,
          createAt: "2022-10-29T07:57:56.301Z",
          updateAt: "2022-10-29T07:58:55.170Z",
          slides: [
            {
              uuid: "59a7e518-cd24-4a1f-8e08-07ab45376584",
              pathname: "/",
              order: 0,
              createAt: "2022-10-29T07:57:56.660Z",
              updateAt: "2022-10-29T07:57:56.660Z",
              root_block: {
                uuid: "39bf5243-bd5a-4747-947e-7e5de8185f91",
                type: "root_block",
                properties: {},
                order: 0,
                pid: null,
                createAt: "2022-10-29T07:57:56.473Z",
                updateAt: "2022-10-29T07:57:56.473Z",
              },
            },
          ],
        },
        {
          uuid: "0888a68d-a17f-4efa-9d5c-13ab45245eb5",
          user_uuid: "google-oauth2|116907406893832294287",
          title: "새 페이지",
          description: null,
          share: false,
          hashtags: null,
          createAt: "2022-10-29T07:58:46.971Z",
          updateAt: "2022-10-29T07:58:46.971Z",
          slides: [
            {
              uuid: "b05b962a-0015-4cf3-a22f-98b25241ca63",
              pathname: "/",
              order: 0,
              createAt: "2022-10-29T07:58:47.277Z",
              updateAt: "2022-10-29T07:58:47.277Z",
              root_block: {
                uuid: "12e7df5d-898b-455a-a718-97191ba57027",
                type: "root_block",
                properties: {},
                order: 0,
                pid: null,
                createAt: "2022-10-29T07:58:47.105Z",
                updateAt: "2022-10-29T07:58:47.105Z",
              },
            },
          ],
        },
      ])
    );
  }),
];
