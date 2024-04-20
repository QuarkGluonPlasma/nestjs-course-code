import { gql, useMutation, useQuery } from '@apollo/client';

const getTodoList = gql`
  query Query {
    todolist {
      content
      id
    }
  }
`;

const createTodoItem = gql`
  mutation Mutation($todoItem: CreateTodoItemInput!) {
    createTodoItem(todoItem: $todoItem) {
      id
      content
    }
  }
`;

type TodoItem = {
  id: number;
  content: string;
}

type TodoList = {
  todolist: Array<TodoItem>;
}

export default function App() {
  const { loading, error, data } = useQuery<TodoList>(getTodoList);

  const [createTodo] = useMutation(createTodoItem, {
    refetchQueries: [getTodoList]
  });

  async function onClick() {
    await createTodo({
      variables: {
        todoItem: {
          content: Math.random().toString().slice(2, 10)
        }
      }
    })
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <button onClick={onClick}>新增</button>
      <ul>
        {
          data?.todolist?.map(item => {
            return <li key={item.id}>{item.content}</li>
          })
        }
      </ul>
    </div>
  );
}
