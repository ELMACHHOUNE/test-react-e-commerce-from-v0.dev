"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  const { toast } = useToast()

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
        localStorage.removeItem("user")
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - in real app, this would be an API call
      if (email && password.length >= 6) {
        const user: User = {
          id: "1",
          email,
          name: email.split("@")[0],
          avatar: "/placeholder.svg?height=40&width=40",
        }

        localStorage.setItem("user", JSON.stringify(user))
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })

        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })

        return true
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock registration - in real app, this would be an API call
      if (email && password.length >= 6 && name) {
        const user: User = {
          id: Date.now().toString(),
          email,
          name,
          avatar: "/placeholder.svg?height=40&width=40",
        }

        localStorage.setItem("user", JSON.stringify(user))
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })

        toast({
          title: "Account Created!",
          description: "Your account has been successfully created.",
        })

        return true
      } else {
        throw new Error("Invalid registration data")
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      toast({
        title: "Registration Failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
