"use client";

import { type IBook } from "@/app/constant/books";
import { GENRES } from "@/app/constant/genre";
import { STATUS } from "@/app/constant/status";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AddBook from "./AddBook";
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";
import Pagination from "./Pagination";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const BookGrid = () => {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [genre, setGenre] = useState<string | undefined>(undefined);

  interface IFetchBooks {
    books: IBook[];
    config: {
      total: number;
      totalPages: number;
      page: number;
      limit: number;
    };
  }
  const getBooks = async (page: number) => {
    const res = await axios.get(`/api/book?page=${page}&limit=10`);
    return res.data;
  };

  const { isPending, data, isError, isFetching } = useQuery<IFetchBooks>({
    queryKey: ["books", page],
    queryFn: () => getBooks(page),
    placeholderData: keepPreviousData,
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
        <div className="flex gap-2">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {STATUS.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            placeholder="Search by title or author"
            className="w-56"
          />
          <Button
            onClick={() => {
              setStatus("");
              setGenre("");
              setInputValue("");
            }}
          >
            Reset Filters
          </Button>
          <AddBook />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isPending || isFetching ? (
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
          filterBooks(data.books).map((book) => (
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
                <div className="text-gray-500 flex flex-col">
                  <EditBook book={book} />
                  <DeleteBook id={book.id} />
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
      {data && (
        <div className="flex items-center justify-center mt-6">
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={data.config.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default BookGrid;
