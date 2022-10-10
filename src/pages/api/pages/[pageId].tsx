import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function hello(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [],
    });
    const apiPort = process.env.API_PORT || 8000;
    const pid = req.query.pageId;

    if (req.method === "PUT") {
      const response = await axios.patch(
        `http://localhost:${apiPort}/pages/${pid}`,
        req.body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.data;
      return res.status(200).json(data);
    }

    if (req.method === "DELETE") {
      const response = await axios.delete(
        `http://localhost:${apiPort}/pages/${pid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.data;
      return res.status(200).json(data);
    }
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
