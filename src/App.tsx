"use client";

import { motion } from "framer-motion";
import { Gamepad, Loader2 } from "lucide-react";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import logo from "@/assets/GamingGarage.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./components/ui/input-otp";
import { useToast } from "./hooks/use-toast";
import client from "./lib/client";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  userName: z.string().min(3, "Username is required"),
  password: z.string().min(3, "Password is required"),
});

type LoginFromValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  // const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationKey: ["login", "client"],
    mutationFn: async (values: LoginFromValues) => {
      const response = await client.post("/Auth/login", {
        userName: values.userName,
        password: values.password,
      });

      return response.data;
    },
    onSuccess(data, variables, context) {
      toast({
        title: "Login Successfull",
        description: "Login Successful",
      });
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please check your username/password",
      });
    },
  });
  const form = useForm<LoginFromValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginFromValues) {
    mutate({
      userName: values.userName,
      password: values.password,
    });
  }

  useEffect(() => {
    document.body.classList.add("dark");
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-end p-4 pr-28"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] border-none bg-black/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
          <CardHeader className="text-center space-y-3 pb-4 relative">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 shadow-lg shadow-purple-500/25">
              <Gamepad className="w-full h-full text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
              GAMING GARAGE
            </h1>
            <p className="text-sm text-purple-100/80 px-6">
              Enter your credentials to start gaming
            </p>
          </CardHeader>
          <CardContent className="relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="userName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-100">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          // id="username"
                          placeholder="Enter your username"
                          required
                          type="text"
                          disabled={isPending}
                          {...field}
                          className="bg-white/10 border-purple-500/20 text-purple-100 placeholder:text-purple-300/30"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-purple-100">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          // id="username"
                          placeholder="Enter your password"
                          required
                          type="password"
                          disabled={isPending}
                          {...field}
                          className="bg-white/10 border-purple-500/20 text-purple-100 placeholder:text-purple-300/30"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 transition-all duration-300"
                  size="lg"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "PLAY NOW"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 relative">
            <Button
              variant="ghost"
              className="w-full text-purple-100 hover:text-white hover:bg-white/10"
              onClick={() => {
                console.log("loginWindow");
                const loginWindow = new WebviewWindow("admin-panel", {
                  url: "/admin",
                  title: "Game Station Admin",
                  center: true,
                  width: 500,
                  height: 600,
                  resizable: false,
                  alwaysOnTop: true,
                  closable: true,
                });
                // loginWindow.show();
              }}
            >
              Admin Access
            </Button>

            <Link to={"/games"}>
              <Button
                variant="ghost"
                className="w-full text-purple-100 hover:text-white hover:bg-white/10"
                size="lg"
                // disabled={isPending}
              >
                Admin Access
              </Button>
            </Link>
            {/* <Dialog>
              <DialogTrigger className="w-full">
              </DialogTrigger>
              <DialogOverlay>
                <DialogContent>
                  <DialogHeader>
                    <h1 className="text-center"></h1>
                  </DialogHeader>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </DialogContent>
              </DialogOverlay>
            </Dialog> */}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
