import type React from "react"
import { MessageSquare } from "lucide-react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Brand/Logo */}
      <div className="bg-blue-600 text-white md:w-1/3 p-8 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <MessageSquare size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Setter Search</h1>
        </div>

        <div className="hidden md:block mt-auto">
          <h2 className="text-3xl font-bold mb-4">Manage all your customer conversations in one place</h2>
          <p className="text-blue-100 mb-6">
            Connect with your with fellow students, professors, and so much more in Setter Search
          </p>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-white/60"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
