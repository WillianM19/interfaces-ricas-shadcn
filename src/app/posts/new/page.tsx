"use client";

import TaskForm from "../../../components/TaskForm/page";
import type { PostFormData } from "../../../components/TaskForm/page";
import { Plus } from "lucide-react";

export default function New() {

  function onSubmit(data: PostFormData) {
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newId = existingPosts.length + 1;
    const newPost = { id: newId, ...data };
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));

    window.open(`/`, "_self");
  }

  return (
    <div className="p-8 flex">
      <div className={`p-8 border-1 shadow-lg flex flex-col gap-[32px] row-start-2 items-center sm:items-start`}> 
        <div className="flex gap-2 items-center">
          <Plus/>
          <h1 className="text-xl font-medium">Criar uma postagem</h1>
        </div>
        <TaskForm onSubmit={onSubmit}></TaskForm>
      </div>
    </div>
  );
}
