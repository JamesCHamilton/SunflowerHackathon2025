"use client";

import type React from "react";

import Link from "next/link";
import {Facebook, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignInForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER}/clients/login`,
                data,
                { withCredentials: true },
            );

            if (response.status === 200) {
                router.push("/chat");
            }
        } catch (error) {
            console.error("Login failed:", error);
            // Handle API errors (e.g., display error message)
        }
    };

    return (
        <div className="space-y-6">
            {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {Object.entries(errors).map(([key, error]) => (
                        <p key={key}>{(error as { message?: string }).message}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </label>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                        Or continue with
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button
                    variant="outline"
                    type="button"
                    className="flex items-center justify-center"
                >
                    <Facebook size={16} className="mr-2" />
                    Facebook
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    className="flex items-center justify-center"
                >
                    <Github size={16} className="mr-2" />
                    GitHub
                </Button>
            </div>

            <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
}
