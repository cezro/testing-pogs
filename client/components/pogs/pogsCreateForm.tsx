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

const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(150, { message: "Name must be at most 150 characters." }),
  ticker_symbol: z
    .string({
      required_error: "Ticker symbol is required.",
      invalid_type_error: "Ticker symbol must be a string.",
    })
    .min(2, {
      message: "Ticker symbol must be at least 2 characters.",
    })
    .max(10, {
      message: "Ticker symbol must be at most 10 characters.",
    })
    .trim()
    .toUpperCase(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => {
      if (typeof val === "string") {
        return parseFloat(val);
      }
      return val;
    })
    .refine(
      (num) => {
        const decimalCount = String(num).split(".")[1]?.length || 0;
        return decimalCount === 0 || decimalCount === 2;
      },
      {
        message:
          "Price must have either no decimal points or exactly two decimal points",
      }
    ),
  color: z
    .string({
      required_error: "Color is required.",
      invalid_type_error: "Color must be a string or hexcode.",
    })
    .min(3, { message: "Color must be at least 3 string characters." })
    .max(30, {
      message: "Color must be at most 30 string characters.",
    }),
});

type PogsCreationFormProps = {
  name: string;
  ticker_symbol: string;
  price: string | number;
  color: string;
};

export function PogsCreationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticker_symbol: "",
      price: undefined,
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

      if (!response.ok) {
        throw new Error(`Failed to create POG: ${response.statusText}`);
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
      toast({
        title: "Error",
        description: "There was an error creating the POG.",
      });
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
