import { z } from "zod";

export const formSchema = z.object({
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
