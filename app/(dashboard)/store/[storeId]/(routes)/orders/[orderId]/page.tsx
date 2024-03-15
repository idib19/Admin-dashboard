import prismadb from "@/lib/prismadb";
import { OrderDetails } from "./components/orderDetails";

const OrderDetailsPage = async ({
    params
  }: {
    params: { orderId: string }
  }) => {
  
    // get specific order data
    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId
      },
      include: {
        orderItems: {
          include: {
            product: {
              include : {
                images : true 
              }
            }
          }
        }
      }
    });


  
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
           <OrderDetails order={order}  />
        </div>
      </div>
    );
  };
  
  export default OrderDetailsPage;
  