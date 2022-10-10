import axios from "axios";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { ManagementClient } from "auth0";
import { NextApiRequest, NextApiResponse } from "next";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;

  const session = await getSession(req, res);
  const id = session.user.sub;
  const accessToken = session.accessToken;

  try {
    const params = body;

    const currentUserManagementClient = new ManagementClient({
      domain: process.env.AUTH0_ISSUER_BASE_URL.replace("https://", ""),
      clientId: "40JQbgDWZ5dIAejtBwdxsJFb6JdTRjJE",
      clientSecret:
        "8M1caSzvtke_MhQ3NpitA4Vz3OZ_rmrusqvjKkBPef_3Bxw4J8hwEOa6kWe5zoTk",
    });

    const user = await currentUserManagementClient.updateUser({ id }, params);

    res.status(200).json(params);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default withApiAuthRequired(userHandler);
