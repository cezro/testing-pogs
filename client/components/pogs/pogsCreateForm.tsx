"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "../ui/use-toast";
import { formSchema } from "@/lib/schemas/formSchema";
import { PogsCreationFormProps } from "@/lib";

export function PogsCreationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticker_symbol: "",
      price: 0,
      color: "",
    },
  });

  const onSubmit = async (data: PogsCreationFormProps) => {
    console.log(data);

    try {
      const parsedData = {
        ...data,
        price: parseFloat(String(data.price)),
      };
      formSchema.parse(parsedData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pogs/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedData),
        }
      );
      console.log(response.body);
      console.log("You should error if no ok");

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Unknown error";

        toast({
          title: "Error",
          description: `Failed to create POG: ${errorMessage}`,
        });

        throw new Error(`Failed to create POG: ${errorMessage}`);
      }

      const dataJson = await response.json();

      toast({
        title: "Pogs Created Successfully!",
        description: `Pogs ${data.name} with ticker of ${data.ticker_symbol} has been created and been added to the database.`,
      });

      console.log("response" + response);

      router.push(`/pogs/${dataJson.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticker_symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker Symbol</FormLabel>
              <FormControl>
                <Input placeholder="Ticker Symbol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
