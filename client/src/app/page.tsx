"use client";

import BillTable from "@/components/BillTable";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { PlusIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  const [setOpen, billItems, setBillItems] = useAppStore((state) => [
    state.setOpen,
    state.billItems,
    state.setBillItems,
  ]);

  return (
    <main className="w-full h-[80vh] flex flex-col space-y-6 items-center justify-center px-4">
      {billItems?.length > 0  && <BillTable billItems={billItems} />}
      <Button
        className="flex items-center space-x-2"
        onClick={() => setOpen(true)}
      >
        <PlusIcon />
        <p>Add</p>
      </Button>
    </main>
  );
}
