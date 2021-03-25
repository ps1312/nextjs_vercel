import Head from "next/head";
import useApi from "../services/hooks/useApi";

export default function Home() {
  const [data, loading] = useApi()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading}
    </div>
  );
}
