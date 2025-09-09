import { getOrderById } from "@/actions/orders";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Typ för de dynamiska params som kommer från URL:en
interface OrderDetailsPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderDetailsPage({
  params,
}: OrderDetailsPageProps) {
  const order = await getOrderById(params.orderId);

  if (!order) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl text-sky-600 font-bold mb-8">Orderdetaljer</h1>
        <p className="text-red-500">
          Kunde inte hitta order med ID: {params.orderId}
        </p>
        <div className="mt-8">
          <Link href="/admin/orders">
            <Button>Tillbaka till ordrar</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl text-sky-600 font-bold mb-8">Orderdetaljer</h1>

      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Order-ID: {order.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Användare:</strong> {order.user?.email || "Okänd"}
          </p>
          <p>
            <strong>Totalt pris:</strong> {order.totalPrice} kr
          </p>
          <p>
            <strong>Skapad:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <h3 className="text-lg font-semibold mt-4">Beställda filmer:</h3>
          <ul className="space-y-2">
            {order.movies.length > 0 ? (
              order.movies.map((item) => (
                <li key={item.id} className="p-2 border rounded-md">
                  <p>{item.movie.title}</p>
                  <p className="text-sm text-gray-500">Pris: {item.price} kr</p>
                </li>
              ))
            ) : (
              <p>Inga filmer hittades för denna order.</p>
            )}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/admin/orders">
            <Button>Tillbaka till ordrar</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
