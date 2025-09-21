import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface Props {
  id: number;
}

const DeleteBook = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/book?id=${id}`);
    },
    onError: (error, onMutateResult) => {
      console.log("🚀 ~ AddBook ~ onMutateResult:", onMutateResult);
      console.log("🚀 ~ AddBook ~ error:", error);
      toast.error("Failed to delete book");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book deleted successfully");
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="text-red-400">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete book?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => mutate()}>
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBook;
