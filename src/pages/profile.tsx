import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Profile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <>로딩중...</>;
  } else if (user) {
    return (
      <>
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.picture ?? undefined} alt="Profile image" />
        }
        <SyntaxHighlighter language="json" style={docco}>
          {JSON.stringify(user, null, 2)}
        </SyntaxHighlighter>
      </>
    );
  } else {
    return <></>;
  }
};

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <>리다이렉트 중...</>,
  onError: (error) => <>{error.message}</>,
});
