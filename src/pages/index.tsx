import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sumit-보일러플레이트</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Sumit!!</a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}> Next.js, styled-comp, auth0</code>
          템플릿 입니다.
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <Link href="/profile" passHref>
            <a className={styles.card}>
              <h2>프로필 보기 &rarr;</h2>
              <p>
                현재 로그인한 유저의 프로필을 확인합니다. 로그아웃된 경우에는
                로그인 페이지로 리다이렉트됩니다
              </p>
            </a>
          </Link>

          <Link
            href="https://auth0.com/docs/quickstart/webapp/nextjs/01-login"
            passHref
          >
            <a target="_blank" className={styles.card}>
              <h2>auth0 next.js docs &rarr;</h2>
              <p>
                여기를 클릭하시면 auth0 nextjs 도큐멘트를 확인할 수 있습니다
              </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;