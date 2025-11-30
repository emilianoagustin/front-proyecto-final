import { ProductTable } from "@/components/Table/product-table";
import { NavBar } from "@/components/navbar";

export default async function AdminPage() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
        <h1 className="text-2xl font-bold">Products</h1>
        <ProductTable />
      </div>
    </>
  );
}
