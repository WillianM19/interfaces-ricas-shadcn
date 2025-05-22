import TaskForm from "../../../components/TaskForm/page";

export default function New() {
  return (
    <div className="p-8 border-1">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <TaskForm></TaskForm>
      </main>
    </div>
  );
}
