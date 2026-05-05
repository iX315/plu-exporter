import Link from "next/link"

import type { Order } from "@/generated/prisma/client"
import { dbClient } from '@/utils/dbClient'

export const revalidate = 60

export default async function OrdersPage(props: PageProps<'/[lang]/orders'>) {
  const { lang } = await props.params
  const orders = await dbClient.order.findMany()

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="mb-8">
            <Link
              href={`/${lang}`}
              className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-600">No orders found</p>
          </header>
        </div>
      </div>
    )
  }

  // Group orders by type/status
  const ordersByStatus: Record<Order['type'], Order[]> = {
    ORDER: [],
    PROCESSING: [],
    SERVED: [],
  }

  orders.forEach(order => {
    ordersByStatus[order.type].push(order)
  })

  // Sort by datetime (newest first)
  Object.keys(ordersByStatus).forEach(key => {
    ordersByStatus[key as Order['type']].sort((a, b) => 
      new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    )
  })

  const statusColors: Record<Order['type'], string> = {
    ORDER: 'bg-blue-500',
    PROCESSING: 'bg-orange-500',
    SERVED: 'bg-green-500'
  }

  const statusLabels: Record<Order['type'], string> = {
    ORDER: 'Pending',
    PROCESSING: 'Processing',
    SERVED: 'Served'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Order Status</h1>
          <p className="mt-2 text-gray-600">Track your orders in real-time</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {(['ORDER', 'PROCESSING', 'SERVED'] as Order['type'][]).map((status) => (
            <div key={status} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <span className={`inline-block h-3 w-3 rounded-full mr-3 ${statusColors[status]}`} />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {statusLabels[status]}
                  </h2>
                  <span className="ml-auto text-sm text-gray-500">
                    {ordersByStatus[status].length} orders
                  </span>
                </div>
              </div>
              
              {ordersByStatus[status].length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {ordersByStatus[status].map((order) => (
                    <li key={order.uuid} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Order #{order.uuid}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PLU: {order.plu}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Customer: {order.customer}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(order.datetime).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          status === 'ORDER' ? 'bg-blue-100 text-blue-800' :
                          status === 'PROCESSING' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {statusLabels[status]}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No {statusLabels[status].toLowerCase()} orders
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
