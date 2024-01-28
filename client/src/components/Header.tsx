import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="px-4 md:px-8 py-4 flex justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <p className="font-medium text-lg">Home</p>
        </Link>
        <Link href="/billings">
          <p className="font-medium text-lg">Billings</p>
        </Link>
        <Link href="/products">
          <p className="font-medium text-lg">Products</p>
        </Link>
        <Link href="/add-product">
          <Button>Add Products</Button>
        </Link>
      </div>
    </header>
  );
}
