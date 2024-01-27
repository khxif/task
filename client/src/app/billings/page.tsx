"use client";

import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function Page() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;
  const [amount, setAmount] = useState(0);
  const[bills,setBills] = useState<any>([])

  useEffect(() => {
    async function getBills() {
      const res = await fetch(`/api/get-daily-bills/${date}`);
      const data = await res.json();
      console.log(data);
      setBills(data)
      if (!data) return setAmount(0);
      setAmount(data.reduce((acc: any,current: any) => acc+current.amount,0));
      // data.map((items) => {
      //   items.billItems.map((item) => {
      //     console.log(item);
      //   });
      // });
    }
    getBills();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Total expense today:{amount}</h1>

      <div>
        {
          bills?.map((items: any) => (
             <Card key={items._id} items={items} />
          ))
        }
      </div>
    </div>
  );
}
