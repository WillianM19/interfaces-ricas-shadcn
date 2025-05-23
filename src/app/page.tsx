"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Pencil, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

type Post = {
  id: number
  titulo: string
  descricao: string
  categoria: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]")
    setPosts(storedPosts)
  }, [])

  const deletePost = (id: number) => {
    const updatedPosts = posts.filter((post) => post.id !== id)
    localStorage.setItem("posts", JSON.stringify(updatedPosts))
    setPosts([...updatedPosts])
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "jogos":
        return "bg-blue-500 hover:bg-blue-600"
      case "regioes":
        return "bg-green-500 hover:bg-green-600"
      case "esportes":
        return "bg-orange-500 hover:bg-orange-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog - Publicações</h1>
        <Button asChild>
          <Link href="/posts/new">
            <Plus className="mr-2 h-4 w-4" /> Criar Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Nenhum post encontrado</h2>
          <p className="text-muted-foreground mb-6">Crie seu post no blog.</p>
          <Button asChild>
            <Link href="/posts/new">
              <Plus className="mr-2 h-4 w-4" /> Criar Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.titulo}</CardTitle>
                  <Badge className={getCategoryColor(post.categoria)}>
                    {post.categoria.charAt(0).toUpperCase() + post.categoria.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="line-clamp-2 mt-2">
                  {post.descricao}
                </CardDescription>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/posts/${post.id}`}>Ver Post</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/posts/${post.id}/update`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
