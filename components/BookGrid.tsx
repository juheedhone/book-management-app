"use client";

import { type IBook } from "@/app/constant/books";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const BookGrid = () => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [genre, setGenre] = useState<string | undefined>(undefined);

  const getBooks = async () => {
    const res = await axios.get("/api/book");
    return res.data;
  };

  const { isPending, data, isError } = useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  const filterBooks = (books: IBook[]) => {
    let filteredBooks = books;

    // input value
    filteredBooks = books.filter((book) => {
      const searchString = inputValue.toLocaleLowerCase();

      return (
        book.author.toLowerCase().includes(searchString) ||
        book.title.toLowerCase().includes(searchString)
      );
    });

    // status
    if (status) {
      filteredBooks = filteredBooks.filter((book) => book.status === status);
    }

    // genre
    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    return filteredBooks;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-16">
      <div className="flex items-center justify-between mb-8">
        <p className="text-4xl font-bold">Library</p>
        <div className="flex">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-[180px] mr-2">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Classic">Classic</SelectItem>
                <SelectItem value="Dystopian">Dystopian</SelectItem>
                <SelectItem value="Romance">Romance</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
                <SelectItem value="Thriller">Thriller</SelectItem>
                <SelectItem value="Drama">Drama</SelectItem>
                <SelectItem value="Biography">Biography</SelectItem>
                <SelectItem value="Memoir">Memoir</SelectItem>
                <SelectItem value="Self-Help">Self-Help"</SelectItem>
                <SelectItem value="Horror">Horror</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Historical">Historical</SelectItem>
                <SelectItem value="Philosophical">Philosophical</SelectItem>
                <SelectItem value="Post-Apocalyptic">
                  Post-Apocalyptic
                </SelectItem>
                <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px] mr-2">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Issued">Issued</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            placeholder="Search by title or author"
            className="w-56 mr-2"
          />
          <Button>Add Book</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isPending ? (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton
                key={i}
                className="h-110 w-[15.625rem] rounded-xl bg-gray-300"
              />
            ))}
          </>
        ) : isError ? (
          <p>error</p>
        ) : (
          filterBooks(data).map((book) => (
            <div
              key={book.id}
              className="flex flex-col overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
            >
              <div className="relative w-full overflow-hidden h-80">
                <img
                  src={book.image}
                  alt={book.title}
                  className="object-cover w-full h-full rounded-t-2xl"
                />
                <span
                  className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${
                    book.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {book.status}
                </span>
              </div>

              <div className="flex justify-between p-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {book.title}
                  </h2>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                <div className="text-gray-500">
                  <Edit className="mb-2 size-4" />
                  <Trash2 className="size-4" />
                </div>
              </div>

              <div className="px-4 pb-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Genre:</span> {book.genre}
                </p>
                <p>
                  <span className="font-medium">Year:</span>{" "}
                  {book.publishedYear}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookGrid;
