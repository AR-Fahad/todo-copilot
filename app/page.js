import Todo from "@/components/Todo";
import { CopilotPopup } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <>
      <Todo />
      <CopilotPopup
        instructions="You are assisting the user with managing their todo list. Use the available actions to help them add, remove, or clear todos."
        labels={{
          title: "cTodo Assistant",
          initial: "Need help managing your todos?",
        }}
      />
    </>
  );
}
