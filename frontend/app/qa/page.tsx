"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MessageSquare, Search, ThumbsUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for Q&A
const initialQuestions = [
  {
    id: "q1",
    title: "How do I implement a binary search tree in Java?",
    content:
      "I'm trying to implement a binary search tree for my CS201 class but I'm having trouble with the delete operation. Can someone explain how to handle the case when the node has two children?",
    author: "Alex Johnson",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "2 days ago",
    course: "CS201: Data Structures",
    votes: 12,
    answers: [
      {
        id: "a1",
        content:
          "When deleting a node with two children, you need to find either the maximum value in the left subtree or the minimum value in the right subtree. Then replace the node's value with that value and delete the node with that value from the appropriate subtree. This ensures the BST property is maintained.",
        author: "Prof. Smith",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "1 day ago",
        votes: 8,
        isAccepted: true,
      },
      {
        id: "a2",
        content:
          "Here's some pseudocode that might help:\n\n```\nfunction delete(root, key):\n    if root is null: return null\n    if key < root.key: root.left = delete(root.left, key)\n    else if key > root.key: root.right = delete(root.right, key)\n    else:\n        if root.left is null: return root.right\n        if root.right is null: return root.left\n        // Node with two children\n        temp = findMin(root.right)\n        root.key = temp.key\n        root.right = delete(root.right, temp.key)\n    return root\n```",
        author: "Taylor Wilson",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "1 day ago",
        votes: 5,
        isAccepted: false,
      },
    ],
  },
  {
    id: "q2",
    title: "Difference between stack and heap memory?",
    content:
      "Can someone explain the key differences between stack and heap memory allocation in C++? When should I use one over the other?",
    author: "Jamie Smith",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "3 days ago",
    course: "CS301: Systems Programming",
    votes: 8,
    answers: [
      {
        id: "a3",
        content:
          "Stack memory is used for static memory allocation and heap memory is used for dynamic memory allocation. Variables allocated on the stack are stored directly to the memory and access to this memory is very fast. The allocation happens on contiguous blocks of memory. Stack follows LIFO (Last In First Out) order.\n\nHeap memory is used for dynamic memory allocation. Unlike stack, the program needs to look up the heap allocation to find the memory it needs. Memory allocated on the heap will stay allocated until it is specifically deallocated or the program ends.",
        author: "Dr. Garcia",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        date: "2 days ago",
        votes: 10,
        isAccepted: true,
      },
    ],
  },
  {
    id: "q3",
    title: "How to solve this calculus problem?",
    content: "I'm stuck on this integral: ∫(x²+3x+2)/(x+1) dx. Can someone show me the steps to solve it?",
    author: "Morgan Lee",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    date: "1 week ago",
    course: "MATH200: Calculus II",
    votes: 5,
    answers: [],
  },
]

export default function QAPage() {
  const [questions, setQuestions] = useState(initialQuestions)
  const [searchQuery, setSearchQuery] = useState("")
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" })
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmitQuestion = () => {
    if (newQuestion.title.trim() === "" || newQuestion.content.trim() === "") {
      return
    }

    const newQuestionObj = {
      id: `q${questions.length + 1}`,
      title: newQuestion.title,
      content: newQuestion.content,
      author: "You",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      date: "Just now",
      course: "Your Course",
      votes: 0,
      answers: [],
    }

    setQuestions([newQuestionObj, ...questions])
    setNewQuestion({ title: "", content: "" })
    setShowNewQuestionForm(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link href="/chat">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Chat
              </Link>
            </Button>
          </div>
          <Button onClick={() => setShowNewQuestionForm(!showNewQuestionForm)}>
            {showNewQuestionForm ? "Cancel" : "Ask a Question"}
          </Button>
        </div>

        <div className="grid gap-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Questions & Answers</CardTitle>
              <CardDescription>Browse questions or ask your own to get help from the community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Questions</TabsTrigger>
                  <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {showNewQuestionForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Ask a New Question</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="question-title" className="text-sm font-medium">
                      Question Title
                    </label>
                    <Input
                      id="question-title"
                      placeholder="e.g., How do I implement a binary search tree?"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="question-content" className="text-sm font-medium">
                      Question Details
                    </label>
                    <Textarea
                      id="question-content"
                      placeholder="Provide details about your question..."
                      rows={5}
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSubmitQuestion}>Submit Question</Button>
              </CardFooter>
            </Card>
          )}

          {filteredQuestions
            .filter((q) => {
              if (activeTab === "unanswered") return q.answers.length === 0
              if (activeTab === "popular") return q.votes > 5
              return true
            })
            .map((question) => (
              <Card key={question.id} className="mb-6">
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{question.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {question.course} • Asked {question.date}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {question.votes}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard?question=${question.id}`}>
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {question.answers.length}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={question.authorAvatar} alt={question.author} />
                      <AvatarFallback>{question.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{question.author}</div>
                      <p className="mt-1 text-sm">{question.content}</p>
                    </div>
                  </div>

                  {question.answers.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                      <h4 className="font-medium mb-4">
                        {question.answers.length} {question.answers.length === 1 ? "Answer" : "Answers"}
                      </h4>

                      {question.answers.map((answer) => (
                        <div key={answer.id} className="flex items-start space-x-4 mb-4 pb-4 border-b last:border-0">
                          <Avatar>
                            <AvatarImage src={answer.authorAvatar} alt={answer.author} />
                            <AvatarFallback>{answer.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <div className="font-medium">{answer.author}</div>
                              {answer.isAccepted && (
                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                                  Accepted Answer
                                </span>
                              )}
                              <span className="ml-auto text-xs text-muted-foreground">{answer.date}</span>
                            </div>
                            <p className="mt-1 text-sm whitespace-pre-line">{answer.content}</p>
                            <div className="mt-2 flex items-center">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ThumbsUp className="mr-1 h-3 w-3" />
                                {answer.votes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Answer form */}
                  <div className="mt-4 flex items-center space-x-2">
                    <Input placeholder="Write your answer..." className="flex-1" />
                    <Button size="sm" className="flex-shrink-0">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

          {filteredQuestions.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No questions found</h3>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or ask a new question</p>
                <Button className="mt-4" onClick={() => setShowNewQuestionForm(true)}>
                  Ask a Question
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
