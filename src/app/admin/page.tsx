import { columns } from "@/components/Table/columns";
import { DataTable } from "@/components/Table/data-table";
import { Product } from "@/types/Product.types";

async function getData(): Promise<Product[]> {
  const response = await fetch("http://localhost:8080/api/products");
  const data = await response.json();

  return data;
}

export default async function Admin() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
