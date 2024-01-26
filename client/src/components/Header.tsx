import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 flex items-center justify-between">
      <div>
        <Link href="/">
          <h1 className="font-bold text-xl">Store</h1>
        </Link>
      </div>

      <div className="flex items-center space-x-8">
        <Link href="/billings">
          <p className="font-medium text-lg">Billings</p>
        </Link>
        <Link href="/add-product">
          <Button>Add Products</Button>
        </Link>
      </div>
    </header>
  );
}
