import rawData from "../data.json";
import { Dessert, DessertCategory } from "./types";

// Map the JSON data into strongly-typed Dessert objects
export const DESSERT_DATA: Dessert[] = (rawData as any[]).map(
  (item, index): Dessert => ({
    id: String(index + 1),
    name: item.name,
    category: item.category as DessertCategory,
    price: item.price,
    image: item.image,
    description: "",
    inStock: true,
  })
);


