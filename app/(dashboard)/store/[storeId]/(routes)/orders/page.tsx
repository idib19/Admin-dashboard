import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn, OrderColumn2 } from "./components/columns"
import { OrderClient } from "./components/client";


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // const formattedOrders: OrderColumn[] = orders.map((item) => ({
  //   id: item.id,
  //   phone: item.phone,
  //   address: item.address,
  //   products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
  //   totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
  //     return total + Number(item.product.price)
  //   }, 0)),
  //   isPaid: item.isPaid,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

  const formattedOrders2: OrderColumn2[] = orders.map((item) => ({
    id: item.id,
    tel: item.phone,
    name: item.name,
    // address: item.address,
    // products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    price: formatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    status: item.isPaid,
    date: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders2} />
      </div>
    </div>
  );
};

export default OrdersPage;
