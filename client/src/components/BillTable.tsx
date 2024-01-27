import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface TableProps {
  billItems: Product[];
}

export default function BillTable({ billItems }: TableProps) {
  const [setPaymentModalOpen, billTotal, setBillTotal, deleteBillItem] =
    useAppStore((state) => [
      state.setPaymentModalOpen,
      state.billTotal,
      state.setBillTotal,
      state.deleteBillItem,
    ]);

  useEffect(() => {
    setBillTotal(
      billItems.reduce((acc: any, current: any) => {
        return acc + current.price;
      }, 0)
    );
  }, [billItems]);
  return (
    <Table>
      <TableCaption>A list of your selected items.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item name</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {billItems.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="font-medium">{item?.name}</TableCell>
            <TableCell className="text-right">{item?.price}</TableCell>
            <TableCell
              className="text-right cursor-pointer"
              onClick={() => deleteBillItem(item._id)}
            >
              x
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-bold">Total</TableCell>
          <TableCell className="text-right">{billTotal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{""} </TableCell>
          <TableCell className="ml-auto text-right">
            <Button
              onClick={() => setPaymentModalOpen(true)}
              className="ml-auto text-right"
              variant="destructive"
              size="lg"
            >
              Buy
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
