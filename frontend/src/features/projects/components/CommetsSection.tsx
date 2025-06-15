import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Textarea } from "../../../components/ui/textarea";
import { Separator } from "../../../components/ui/separator";

import { Send, ThumbsUp, Reply } from "lucide-react";
import { useState } from "react";

const comments = [
  {
    id: 1,
    author: {
      name: "Carlos Rodríguez",
      username: "carlos_dev",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "¡Increíble trabajo! Me encanta cómo has solucionado la navegación. ¿Podrías compartir más detalles sobre el proceso de research?",
    createdAt: "hace 2 horas",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: {
          name: "María García",
          username: "maria_design",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "¡Gracias Carlos! Claro, hicimos entrevistas con 15 usuarios y usamos Maze para testing. Te puedo enviar más detalles por mensaje privado.",
        createdAt: "hace 1 hora",
        likes: 5,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Ana López",
      username: "ana_brand",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "La paleta de colores está perfecta. ¿Cómo decidiste estos tonos específicos?",
    createdAt: "hace 5 horas",
    likes: 8,
    isLiked: true,
    replies: [],
  },
  {
    id: 3,
    author: {
      name: "Diego Martín",
      username: "diego_3d",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Excelente caso de estudio. Me gustaría ver más del proceso de wireframing.",
    createdAt: "hace 1 día",
    likes: 15,
    isLiked: false,
    replies: [],
  },
];

function CommetsSection() {
  const [newComment, setNewComment] = useState("");
  const [commentsData, setCommentsData] = useState(comments);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: {
        name: "Tu Usuario",
        username: "tu_usuario",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: newComment,
      createdAt: "ahora",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setCommentsData([comment, ...commentsData]);
    setNewComment("");
  };

  const handleReplySubmit = (commentId: number) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "Tu Usuario",
        username: "tu_usuario",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: replyContent,
      createdAt: "ahora",
      likes: 0,
      isLiked: false,
    };

    setCommentsData(
      commentsData.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );
    setReplyContent("");
    setReplyingTo(null);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Comentarios ({commentsData.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add Comment */}
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>TU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comentar
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {commentsData.map((comment) => (
              <div key={comment.id} className="space-y-3">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.author.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.author.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ..{comment.author.username}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {comment.createdAt}
                      </span>
                    </div>
                    <p className="mb-2">{comment.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment.id ? null : comment.id
                          )
                        }
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="ml-11 flex gap-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" />
                      <AvatarFallback className="text-xs">TU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        placeholder="Escribe una respuesta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[60px]"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleReplySubmit(comment.id)}
                          disabled={!replyContent.trim()}
                        >
                          Responder
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent("");
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="ml-11 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={reply.author.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="text-xs">
                            {reply.author.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {reply.author.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ..{reply.author.username}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              •
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {reply.createdAt}
                            </span>
                          </div>
                          <p className="text-sm mb-2">{reply.content}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CommetsSection;
