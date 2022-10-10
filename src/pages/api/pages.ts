import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function hello(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [],
    });

    if (req.method !== "POST") {
      return res.status(401).end();
    }

    console.log(req.body);

    const apiPort = process.env.API_PORT || 8000;
    const response = await axios.post(
      `http://localhost:${apiPort}/pages`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log("e", error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
});

export const config = {
  api: {
    bodyParser: true,
  },
};
