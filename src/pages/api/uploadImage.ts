import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

export default withApiAuthRequired(async function hello(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: [],
    });

    const fileData: formidable.Files = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm({
        maxFileSize: 5 * 1024 * 1024,
        keepExtensions: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        return resolve(files);
      });
    });

    const formData = new FormData();
    const file = fileData.file;
    const readStream = fs.createReadStream((file as formidable.File).filepath);

    formData.append("file", readStream);

    const apiPort = process.env.API_PORT || 8000;
    const response = await axios.post(
      `http://localhost:${apiPort}/profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type":
            "multipart/form-data; boundary=" + formData.getBoundary(),
        },
      }
    );

    const result = await response.data;
    res.status(200).json(result);
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
    bodyParser: false,
  },
};
