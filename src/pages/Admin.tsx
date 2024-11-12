import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { InputTags } from "@/components/ui/input-tags";
const formSchema = z.object({
  name: z.string().min(1, "Name Required"),
  path: z.string().min(1, "Path Required"),
  image: z.string().min(1, "Image Required"),
  tags: z.array(z.string()),
});
type AddGameFormValues = z.infer<typeof formSchema>;
export default function Admin() {
  const form = useForm<AddGameFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      path: "",
      tags: [],
    },
  });
  const [image, setImage] = useState("");

  function onSubmit(values: AddGameFormValues) {}
  return (
    <div className="h-screen w-full bg-[#242936] p-3">
      <Button
        variant={"ghost"}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25 transition-all duration-300"
      >
        Add New Game
      </Button>

      <div className="space-y-4 pt-5">
        <div className="bg-slate-300 p-3 px-3 rounded gap-3 flex">
          <div className="h-44 w-32 bg-red-300 rounded shrink-0">
            <img src={image} alt="" className="h-full w-full" />
          </div>
          <div className="w-full">
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl className="">
                        <Input
                          placeholder="Game Name"
                          {...field}
                          className=""
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="">
                          <Button
                            //   placeholder="Path"
                            //   type="file"
                            onClick={async () => {
                              const path = await open({
                                canCreateDirectories: false,
                                filters: [
                                  { extensions: ["exe"], name: "Executable" },
                                ],
                              });
                              if (path) {
                                field.onChange(path);
                              }
                            }}
                            //   {...field}
                          >
                            Select File
                          </Button>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="">
                          <Button
                            //   placeholder="Path"
                            //   type="file"
                            onClick={async () => {
                              const path = await open({
                                canCreateDirectories: false,
                                filters: [
                                  {
                                    extensions: ["png", "jpg", "webp", "jpeg"],
                                    name: "Images",
                                  },
                                ],
                              });
                              if (path) {
                                const relativeImageSrc = convertFileSrc(path);
                                setImage(relativeImageSrc);
                                field.onChange(path);
                                console.log(relativeImageSrc);
                              }
                            }}
                            //   {...field}
                          >
                            Select Image
                          </Button>
                        </FormControl>
                        {/* <FormDescription className="flex text-xs"></FormDescription> */}
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl className="">
                        <InputTags
                          value={field.value}
                          onChange={field.onChange}
                          max={3}
                        />
                      </FormControl>
                      {/* <FormDescription className="flex text-xs"></FormDescription> */}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
