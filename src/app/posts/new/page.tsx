import TaskForm from "../../../components/TaskForm/page";
import { Plus } from "lucide-react";

export default function New() {
  return (
    <div className="p-8 flex justify-center items-center">
      <main 
        className={`
          p-8 border-1 shadow-lg
          flex flex-col gap-[32px] row-start-2 items-center sm:items-start
        `}
      > 
        <div className="flex gap-2 items-center">
          <Plus/>
          <h1 className="text-xl font-medium">Criar uma postagem</h1>
        </div>
        <TaskForm></TaskForm>
      </main>
    </div>
  );
}
