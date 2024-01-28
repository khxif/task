"use client";

import { useQuery } from "react-query";

async function getProducts() {
  const res = await fetch("/api/get-products");
  const data = await res.json();
  console.log(data);
  return data;
}

export default function useProducts() {
  const { data, isError, isLoading } = useQuery("products", getProducts);
  return {
    products: data,
    isError,
    isLoading,
  };
}
