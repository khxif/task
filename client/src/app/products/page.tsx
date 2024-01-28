"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useProducts from "@/hooks/useProducts";
import { Trash } from "lucide-react";
import { useQueryClient } from "react-query";

export default function ProductPage() {
  const { products, isError, isLoading } = useProducts();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/get-products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    queryClient.invalidateQueries("products");
  };
  return (
    <main className="px-4 py-6">
      <Table>
        <TableCaption>A list of Products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="">Amount</TableHead>
            <TableHead className="text-right"> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products?.map((product: Product) => (
              <TableRow key={product?._id}>
                <TableCell className="font-medium">{product?.name}</TableCell>
                <TableCell className="">{product?.price}</TableCell>
                <TableCell className="text-right">
                  <Trash
                    onClick={() => handleDelete(product?._id)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </main>
  );
}
