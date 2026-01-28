"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { bookSchema } from "@/lib/validations";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "../ColorPicker";
import { createBook, updateBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BookFormValues = z.infer<typeof bookSchema>;

type BookFormProps = {
  type?: "create" | "update";
  book?: Partial<Book> & { id?: string }; // passed from edit page
};

export default function BookForm({ type = "create", book }: BookFormProps) {
  const router = useRouter();

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title ?? "",
      description: book?.description ?? "",
      author: book?.author ?? "",
      genre: book?.genre ?? "",
      rating: (book?.rating as any) ?? 1,
      totalCopies: (book?.totalCopies as any) ?? 1,
      coverUrl: book?.coverUrl ?? "",
      coverColor: book?.coverColor ?? "#000000",
      videoUrl: book?.videoUrl ?? "",
      summary: book?.summary ?? "",
    },
  });

  const onSubmit = async (values: BookFormValues) => {
    try {
      if (type === "update") {
        if (!book?.id) {
          toast.error("Missing book id");
          return;
        }

        const res = await updateBook(book.id, values as any);

        if (!res.success) {
          toast.error("Failed to update book", { description: res.error });
          return;
        }

        toast.success("Book updated successfully");
        router.push("/admin/books");
        router.refresh();
        return;
      }

      // create
      const res = await createBook(values as any);

      if (!res.success) {
        toast.error("Failed to create book", { description: res.error });
        return;
      }

      toast.success("Book created successfully");
      router.push("/admin/books");
      router.refresh();
    } catch (err: any) {
      toast.error("Something went wrong", {
        description: err?.message ?? "Please try again",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the book title"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Author */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the author name"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Genre */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the genre of the book"
                  {...field}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={field.value ?? 1}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total copies */}
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total number of copies
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  value={field.value ?? 1}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover image upload */}
        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="image"
                  accept="image/*"
                  placeholder="Upload book cover (max 20MB)"
                  folder="/books/covers"
                  variant="light"
                  value={(field.value as string) ?? ""}
                  onFileChange={(url) => field.onChange(url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cover color */}
        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Primary color
              </FormLabel>
              <FormControl>
                <ColorPicker
                  value={(field.value as string) || "#000000"}
                  onChange={(color) => field.onChange(color)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book Description"
                  {...field}
                  rows={10}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Trailer upload */}
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  type="video"
                  accept="video/*"
                  placeholder="Upload trailer (max 50MB)"
                  folder="/books/trailers"
                  variant="light"
                  value={(field.value as string) ?? ""}
                  onFileChange={(url) => field.onChange(url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Summary */}
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Book summary"
                  {...field}
                  rows={5}
                  className="book-form_input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="book-form_btn text-white">
          {type === "update" ? "Update Book" : "Add Book to Library"}
        </Button>
      </form>
    </Form>
  );
}
