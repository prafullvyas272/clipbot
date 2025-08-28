"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react"; // 👈 Import from NextAuth

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post("/api/login", form);
      const data = res.data;

      if (!data.status) {
        setMessage(data.error || "Login failed.");
      } else {
        document.cookie = `access_token=${data.data.access_token}; path=/; max-age=604800`;
        document.cookie = `userId=${data.data.user.id}; path=/; max-age=604800`;

        router.push("/dashboard");
        setMessage("Login successful!");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   // 👇 Handle Google Login
   const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setMessage(null);
    try {
      await signIn("google", { callbackUrl: "/dashboard" }); // redirect after login
    } catch (error) {
      console.log(error)
      setMessage("Google login failed. Try again.");
      setGoogleLoading(false);
      debugger
    }
  };

  // 👇 Handle Github Login
  const handleGithubLogin = async () => {
    setGithubLoading(true);
    setMessage(null);
    try {
      await signIn("github", { callbackUrl: "/dashboard" }); // redirect after login
    } catch (error) {
      setMessage("Github login failed. Try again.");
      setGithubLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

            <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                >
                  {googleLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Login with Google
                    </>
                  )}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative text-center text-sm">
                <span className="bg-card relative z-10 px-2 text-muted-foreground">
                  Or continue with
                </span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
              </div>

              {/* Email/Password Form */}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
              </div>

              {/* Register link */}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <span onClick={() => {router.push('/register')}} className="underline cursor-pointer underline-offset-4">
                  Sign up
                </span>
              </div>

              {/* Show messages */}
              {message && (
                <p className="text-center text-sm text-red-500">{message}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
