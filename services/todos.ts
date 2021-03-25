import { PrismaClient } from "@prisma/client";

type Todo = {
  title: string;
  completed: boolean;
};

const prisma = new PrismaClient();

const getTodos = async () => {
  return await prisma.todo.findMany();
};

const insertTodo = async (todoBody: Todo) => {
  const { title, completed } = todoBody;

  return await prisma.todo.create({
    data: { title, completed, },
  });
};

export { getTodos, insertTodo };
