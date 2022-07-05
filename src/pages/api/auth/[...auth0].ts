// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const AUTH0_AUDIENCE = process.env.AUTH0_BASE_URL;

interface Auth0Error {
  status: number;
  message: string;
}
function isAuth0Error(obj: unknown): obj is Auth0Error {
  return (
    Object.prototype.hasOwnProperty.call(obj, "status") &&
    Object.prototype.hasOwnProperty.call(obj, "message")
  );
}

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        // authorizationParams: {
        //   audience: AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
        //   // Add the `offline_access` scope to also get a Refresh Token
        //   scope: "", // or AUTH0_SCOPE
        // },
      });
    } catch (error) {
      if (isAuth0Error(error))
        res.status(error.status || 400).end(error.message);
      else res.status(500).end("internal error with auth0");
    }
  },
});
