import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";

export default withApiAuthRequired(async function hello(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [],
    });

    const apiPort = process.env.API_PORT || 8000;
    const response = await axios.get(`http://localhost:${apiPort}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const hello = await response.data;
    res.status(200).json(hello);
  } catch (error) {
    console.log("e", error);
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({ error: error.message });
    } else {
      res.status(500).json(error);
    }
  }
});
