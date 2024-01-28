"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAppStore } from "@/store";
import { Search } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function AddItemsModal() {
  const [open, setOpen, billItems, setBillItems] = useAppStore((state) => [
    state.open,
    state.setOpen,
    state.billItems,
    state.setBillItems,
  ]);
  const [input, setInput] = useState("");
  const [items, setItem] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/get-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: input }),
      });
      const data = await res.json();
      console.log(data === null);

      setItem(data);
      console.log(items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    console.log(billItems);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <div className="space-y-4">
          <h1 className="font-bold text-xl">Search...</h1>
          <form onSubmit={handleSubmit}>
            <span className="flex items-center ">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Search something"
              />
              <Button type="submit" variant="link">
                <Search />
              </Button>
            </span>
          </form>
          <div className="flex flex-col space-y-4">
            {!items && !input && (
              <p className="text-center">No items found..</p>
            )}
            {loading && input && <p className="text-center">Loading..</p>}
            {items &&
              items?.map((item) => (
                <div
                  key={item?._id}
                  onClick={() => {
                    setBillItems(item);
                    setOpen(false);
                    setItem([]);
                  }}
                  className="flex items-center px-4 cursor-pointer py-2 rounded-md bg-slate-300 justify-between"
                >
                  <h1>{item?.name}</h1>
                  <p>{item?.price}</p>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
