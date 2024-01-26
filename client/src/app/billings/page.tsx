"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const date = `${year}-${month}-${day}`;
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    async function getExpense() {
      const res = await fetch(`/api/get-daily-expenses/${date}`);
      const data = await res.json();
      console.log(data);
      if (!data) return setAmount(0);
      setAmount(data.amount);
    }
    getExpense();
  }, []);

  return (
    <div>
      <h1 className="font-bold text-2xl">Total expense today: {amount}</h1>
    </div>
  );
}
