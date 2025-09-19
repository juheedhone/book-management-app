import { books } from "@/app/constant/books";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const BookGrid = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-16">
        <div className="flex justify-between">
          <p className="text-4xl font-bold   mb-8 ">Library</p>
          <Button>Add Book</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {books.map((book) => (
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
