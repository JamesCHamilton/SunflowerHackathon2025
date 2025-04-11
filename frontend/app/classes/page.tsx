"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"

// Sample data
const subjects = [
  { id: "cs", name: "Computer Science" },
  { id: "math", name: "Mathematics" },
  { id: "phys", name: "Physics" },
  { id: "chem", name: "Chemistry" },
  { id: "bio", name: "Biology" },
]

const courseNumbers = {
  cs: ["101", "201", "301", "488"],
  math: ["100", "200", "300", "400"],
  phys: ["105", "205", "305", "405"],
  chem: ["110", "210", "310", "410"],
  bio: ["120", "220", "320", "420"],
}

const classNames = {
  cs101: "Introduction to Programming",
  cs201: "Data Structures",
  cs301: "Algorithms",
  cs488: "Intrnt & Distributed Computing",
  math100: "Calculus I",
  math200: "Calculus II",
  math300: "Linear Algebra",
  math400: "Differential Equations",
  phys105: "Mechanics",
  phys205: "Electricity and Magnetism",
  phys305: "Quantum Mechanics",
  phys405: "Thermodynamics",
  chem110: "General Chemistry",
  chem210: "Organic Chemistry",
  chem310: "Physical Chemistry",
  chem410: "Biochemistry",
  bio120: "Introduction to Biology",
  bio220: "Cell Biology",
  bio320: "Genetics",
  bio420: "Evolutionary Biology",
}

const professors = {
  cs101: ["Dr. Smith", "Dr. Johnson", "Dr. Williams"],
  cs201: ["Dr. Brown", "Dr. Jones", "Dr. Garcia"],
  cs301: ["Dr. Miller", "Dr. Davis", "Dr. Rodriguez"],
  cs488: ["Carmine Guida"],
  math100: ["Dr. Gonzalez", "Dr. Wilson", "Dr. Anderson"],
  math200: ["Dr. Thomas", "Dr. Taylor", "Dr. Moore"],
  math300: ["Dr. Jackson", "Dr. Martin", "Dr. Lee"],
  math400: ["Dr. Perez", "Dr. Thompson", "Dr. White"],
  phys105: ["Dr. Harris", "Dr. Sanchez", "Dr. Clark"],
  phys205: ["Dr. Ramirez", "Dr. Lewis", "Dr. Robinson"],
  phys305: ["Dr. Walker", "Dr. Young", "Dr. Allen"],
  phys405: ["Dr. King", "Dr. Wright", "Dr. Scott"],
  chem110: ["Dr. Torres", "Dr. Nguyen", "Dr. Hill"],
  chem210: ["Dr. Flores", "Dr. Green", "Dr. Adams"],
  chem310: ["Dr. Nelson", "Dr. Baker", "Dr. Hall"],
  chem410: ["Dr. Rivera", "Dr. Campbell", "Dr. Mitchell"],
  bio120: ["Dr. Carter", "Dr. Roberts", "Dr. Gomez"],
  bio220: ["Dr. Phillips", "Dr. Evans", "Dr. Turner"],
  bio320: ["Dr. Diaz", "Dr. Parker", "Dr. Cruz"],
  bio420: ["Dr. Edwards", "Dr. Collins", "Dr. Reyes"],
}

export default function ClassesPage() {
  const [subject, setSubject] = useState("")
  const [courseNumber, setCourseNumber] = useState("")
  const [className, setClassName] = useState("")
  const [professor, setProfessor] = useState("")

  const handleSubjectChange = (value: string) => {
    setSubject(value)
    setCourseNumber("")
    setClassName("")
    setProfessor("")
  }

  const handleCourseNumberChange = (value: string) => {
    setCourseNumber(value)
    const key = `${subject}${value}` as keyof typeof classNames
    setClassName(classNames[key] || "")
    setProfessor("")
  }

  const getAvailableCourseNumbers = () => {
    if (!subject) return []
    return courseNumbers[subject as keyof typeof courseNumbers] || []
  }

  const getAvailableProfessors = () => {
    if (!subject || !courseNumber) return []
    const key = `${subject}${courseNumber}` as keyof typeof professors
    return professors[key] || []
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/chat">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chat
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Class Selection</CardTitle>
              <CardDescription>Select your class details to find relevant discussions and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Select value={subject} onValueChange={handleSubjectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj.id} value={subj.id}>
                            {subj.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="courseNumber" className="text-sm font-medium">
                      Course Number
                    </label>
                    <Select value={courseNumber} onValueChange={handleCourseNumberChange} disabled={!subject}>
                      <SelectTrigger id="courseNumber">
                        <SelectValue placeholder="Select course number" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableCourseNumbers().map((num) => (
                          <SelectItem key={num} value={num}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="className" className="text-sm font-medium">
                      Class Name
                    </label>
                    <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
                      {className || "Class name will appear here"}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="professor" className="text-sm font-medium">
                      Professor
                    </label>
                    <Select value={professor} onValueChange={setProfessor} disabled={!subject || !courseNumber}>
                      <SelectTrigger id="professor">
                        <SelectValue placeholder="Select professor" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableProfessors().map((prof) => (
                          <SelectItem key={prof} value={prof}>
                            {prof}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubject("")
                      setCourseNumber("")
                      setClassName("")
                      setProfessor("")
                    }}
                  >
                    Reset
                  </Button>
                  <Button disabled={!subject || !courseNumber || !professor} asChild>
                    <Link
                      href={`/dashboard?class=${subject}${courseNumber}&professor=${encodeURIComponent(professor)}`}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Go to Chat
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {subject && courseNumber && className && (
            <Card>
              <CardHeader>
                <CardTitle>{className}</CardTitle>
                <CardDescription>
                  {subject.toUpperCase()} {courseNumber} • {professor || "Select a professor"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Course materials, discussions, and resources will appear here.
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/qa">View Q&A</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        Course Materials
                      </Button>
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full h-10 w-10 p-0" disabled={!professor} asChild>
                    <Link
                      href={`/dashboard?class=${subject}${courseNumber}&professor=${encodeURIComponent(professor)}`}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
