"use client";

import BookGrid from "@/components/BookGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BookGrid />
      </QueryClientProvider>
    </div>
  );
};

export default page;
