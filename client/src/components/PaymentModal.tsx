"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useAppStore } from "@/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  mode: z.string({
    required_error: "Please select a mode to continue.",
  }),
  payment: z.string({
    required_error: "Please select a payment mode to continue.",
  }),
});

export default function PaymentModal() {
  const router = useRouter();

  const [paymentModalOpen, setPaymentModalOpen, billTotal, setBillItems] =
    useAppStore((state) => [
      state.paymentModalOpen,
      state.setPaymentModalOpen,
      state.billTotal,
      state.setBillItems,
    ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    try {
      const res = await fetch(`/api/daily-expense/${date}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: billTotal }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setPaymentModalOpen(false);
      router.push('/')
    }
  }

  return (
    <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>Dining or parcel?</DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 pb-4"
          >
            <div className="space-x-4 flex items-center">
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-full h-full py-2 bg-white">
                        <SelectGroup className="w-full h-full flex flex-col space-y-4 px-4 py-2 items-center justify-center">
                          <SelectItem className="w-full px-14" value="parcel">
                            Parcel
                          </SelectItem>
                          <SelectItem className="w-full px-14" value="dining">
                            Dining
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the payment mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-full h-full py-2 bg-white">
                        <SelectGroup className="w-full h-full flex flex-col space-y-4 px-4 py-2 items-center justify-center">
                          <SelectItem className="w-full px-14" value="gpay">
                            Gpay
                          </SelectItem>
                          <SelectItem className="w-full px-14" value="cash">
                            Cash
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {billTotal}
            <Button type="submit" className="w-full" variant="destructive">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
