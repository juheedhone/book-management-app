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

const bookSchema = z.object({
  title: z.string().min(3),
  author: z.string().min(2),
  genre: z.string(),
  publishedYear: z.number(),
  status: z.enum(["Available", "Issued"]),
  image: z.string(),
});
