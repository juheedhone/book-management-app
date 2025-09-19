"use client";

import { books } from "@/app/constant/books";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const BookGrid = () => {
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [genre, setGenre] = useState<string | undefined>(undefined);

  const filterBooks = () => {
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
      filteredBooks = books.filter((book) => book.status === status);
    }
    // genre

    if (genre) {
      filteredBooks = books.filter((book) => book.genre === genre);
    }

    return filteredBooks;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-16">
        <div className="flex justify-between items-center mb-8">
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
              className="mr-2 w-56"
            />
            <Button>Add Book</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filterBooks().map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-t-2xl"
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
                  <Edit className="size-4 mb-2" />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookGrid;
