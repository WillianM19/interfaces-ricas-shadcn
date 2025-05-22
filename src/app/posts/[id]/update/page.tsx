"use client";

import TaskForm from "../../../../components/TaskForm/page";
import type {PostFormData} from "../../../../components/TaskForm/page";
import { PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";


export default function Update() {
    const { id } = useParams();
    const postId = Number(id);
    const [ defaultValues, setDefaultValues ] = useState<PostFormData>();

    useEffect(() => {
        const existingPost = JSON.parse(localStorage.getItem("posts") || "[]");
        const post = existingPost.find((p: any) => p.id === postId);
        if (post){
            setDefaultValues({
                titulo: post.titulo,
                descricao: post.descricao,
                categoria: post.categoria,
            });
        }
    }, [postId]);

    function onSubmit(data: PostFormData) {
        const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
        const updatePosts = existingPosts.map((p: any) => {
            if(p.id === postId){
                return { ...p, ...data };
            }
            return p;
        });
        localStorage.setItem("posts", JSON.stringify(updatePosts));
    }

  return (
    <div className="p-8 flex justify-center items-center">
      <main className={`p-8 border-1 shadow-lg flex flex-col gap-[32px] row-start-2 items-center sm:items-start`}> 
        <div className="flex gap-2 items-center">
          <PencilLine/>
          <h1 className="text-xl font-medium">Editar uma postagem</h1>
        </div>
        <TaskForm defaultValues={defaultValues} onSubmit={onSubmit}></TaskForm>
      </main>
    </div>
  );
}
