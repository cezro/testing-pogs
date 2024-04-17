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
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export function PogsCreationForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ticker_symbol: "",
      price: 0,
      color: "000000",
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
              <HexColorPicker
                onChange={(currentColor) => {
                  field.onChange(currentColor);
                }}
              />
              <FormControl>
                <Input
                  placeholder="Set Color"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
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
