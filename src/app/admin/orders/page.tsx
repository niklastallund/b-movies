import { getAllOrders, deleteOrder } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import CreateOrderForm from "@/components/forms/create-order-form";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="container mx-auto p-8 space-y-10">
      <h1 className="text-4xl text-sky-600 font-bold">Admin: Ordrar</h1>

      {/* Komponent för att skapa en ny order */}
      <CreateOrderForm />

      {/* Lista med befintliga ordrar */}
      <div className="space-y-4">
        <h2 className="text-2xl text-sky-600 font-semibold">
          Befintliga ordrar
        </h2>
        {orders.length > 0 ? (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex items-center justify-between rounded-xl border bg-card p-4 shadow-sm"
              >
                <div>
                  {/* Länk till orderspecifikationssidan */}
                  <Link href={`/admin/orders/${order.id}`}>
                    <h3 className="font-medium text-blue-600 hover:underline">
                      Order-ID:{" "}
                      {typeof order.id === "string"
                        ? order.id.substring(0, 8) + "..."
                        : order.id}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Användare: {order.user?.email || "Okänd"}
                  </p>
                </div>

                {/* Form för att ta bort en order */}
                <form action={deleteOrder}>
                  <input type="hidden" name="id" value={order.id} />
                  <Button
                    type="submit"
                    className="bg-red-800  text-gray-50"
                    size="sm"
                  >
                    Ta bort
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Inga ordrar hittades.</p>
        )}
      </div>
    </div>
  );
}
