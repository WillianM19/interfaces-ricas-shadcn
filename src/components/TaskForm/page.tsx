"use client";

import { Form, FormField, FormItem, FormControl, FormDescription, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useForm } from "react-hook-form";

type FormData = {
  titulo: string;
  descricao: string;
  categoria: string;
}

export default function TaskForm() {

  const form = useForm<FormData>({
    defaultValues: {
      titulo: "",
      descricao: "",
      categoria: "",
    },
  });

  function onSubmit(data: FormData) {
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newId = existingPosts.length + 1;
    const newPost = { 
      id: newId,
      titulo: data.titulo,
      descricao: data.descricao,
      categoria: data.categoria,
    };
    const updatePosts = [...existingPosts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatePosts));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título da postagem</FormLabel>
              <FormControl>
                <Input placeholder="Título da postagem..." {...field}></Input>
              </FormControl>
              <FormDescription>
                Insira o título da postagem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição da postagem..." {...field}></Textarea>
              </FormControl>
              <FormDescription>
                Insira a descrição da postagem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Categoria da postagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jogos">Jogos</SelectItem>
                    <SelectItem value="regioes">Regiões</SelectItem>
                    <SelectItem value="esportes">Esportes</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Escolha uma categoria para a postagem.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">Criar Post</Button>
      </form>
    </Form>
  );
}
