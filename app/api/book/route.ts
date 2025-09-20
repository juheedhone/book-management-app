import { books } from "@/app/constant/books";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

export const GET = async (request: NextRequest) => {
  await new Promise((resolve) => setTimeout(resolve, 1300));
  return NextResponse.json(books);
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  await new Promise((resolve) => setTimeout(resolve, 1300));

  const validatedBody = bookSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json({ error: validatedBody.error }, { status: 400 });
  }

  const newBook = {
    ...validatedBody,
    id: books.length,
  };

  return NextResponse.json(newBook, { status: 201 });
};

export const bookSchema = z.object({
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

export type IBookSchema = z.infer<typeof bookSchema>;
