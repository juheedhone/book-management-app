"use client";

import type { IBook } from "@/app/constant/books";
import { GENRES } from "@/app/constant/genre";
import { STATUS } from "@/app/constant/status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  book: IBook;
}

export const editBookSchema = z.object({
  id: z.number(),
  title: z
    .string({ error: "Title is required" })
    .min(1, { error: "Title is required" }),
  author: z
    .string({ error: "Author is required" })
    .min(1, { error: "Author is required" }),
  genre: z
    .string({ error: "Genre is required" })
    .min(1, { error: "Genre is required" }),
  publishedYear: z.coerce
    .number<number>({ error: "Published year must be a number" })
    .int()
    .min(0, "Published year must be 0 or greater"),
  status: z
    .string({ error: "Status is required" })
    .min(1, { error: "Status is required" }),
  image: z
    .string({ error: "Image URL is required" })
    .min(1, { error: "Image URL is required" }),
});
type IEditBookSchema = z.infer<typeof editBookSchema>;

const EditBook = ({ book }: Props) => {
  const queryClient = useQueryClient();
  const form = useForm<IEditBookSchema>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      status: book.status,
      image: book.image,
      publishedYear: book.publishedYear,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (newBook: IEditBookSchema) => {
      return axios.put("/api/book", newBook);
    },
    onError: (error, onMutateResult) => {
      console.log("🚀 ~ AddBook ~ onMutateResult:", onMutateResult);
      console.log("🚀 ~ AddBook ~ error:", error);
      toast.error("Failed to updated book");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book updated successfully");
    },
  });

  const onSubmit = (values: IEditBookSchema) => {
    console.log(values);
    mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-8">
        <DialogHeader>
          <DialogTitle>Edit book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-3xl"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Hobbit" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="J.R.R. Tolkien" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex *:flex-1 gap-2">
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {GENRES.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="publishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PublishedYear</FormLabel>
                  <FormControl>
                    <Input placeholder="2025" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://unsplash.com/photos/..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBook;
