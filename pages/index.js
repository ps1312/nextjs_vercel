import Head from "next/head";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/todos", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {data.todos.map((todo) => {
        return (
          <div key={todo.id}>
            <span>{todo.id}</span>
            <span>{todo.title}</span>
          </div>
        );
      })}
    </div>
  );
}
