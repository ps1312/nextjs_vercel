import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [post, setPost] = useState({});

  useEffect(() => {
    async function makeRequest() {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setPost(data);
    }

    makeRequest();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <span>{post.userId}</span>
      <span>{post.id}</span>
      <span>{post.title}</span>
      <span>{post.body}</span>
    </div>
  );
}
