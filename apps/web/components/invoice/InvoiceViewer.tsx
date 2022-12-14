import {Invoice} from "../../../../libs/SDK";
import Breakdown from "../form/Breakdown";

export default function InvoiceViewer({
                                          invoice,
                                      }: {
                                          invoice: Invoice,
                                      }
) {


    // Display customer info as card
    // Display invoice items as table
    // Display total as card
    return (
        <div className="flex flex-col">
            <div className="w-full p-8 bg-white border rounded shadow">
                <h1 className="text-3xl font-bold mb-6 text-center">Invoice</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <p>{invoice.customer.email}</p>

                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Name
                    </label>
                    <p>{invoice.customer.firstname} {invoice.customer.lastname}</p>

                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Phone
                    </label>
                    <p>{invoice.customer.phone}</p>

                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Address
                    </label>
                    <p>{invoice.customer.company?.address}</p>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Invoice Items
                    </label>
                    <table className="table-auto w-full border-collapse border border-gray-200">
                        <thead>
                        <tr>
                            <th className="border border-gray-200 px-4 py-2">Title</th>
                            <th className="border border-gray-200 px-4 py-2">Description</th>
                            <th className="border border-gray-200 px-4 py-2">Quantity</th>
                            <th className="border border-gray-200 px-4 py-2">Price</th>
                            <th className="border border-gray-200 px-4 py-2">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {invoice.items.map(item => (
                            <tr>
                                <td className="border border-gray-200 px-4 py-2 underline">{item.title}</td>
                                <td className="border border-gray-200 px-4 py-2">{item.description}</td>
                                <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                                <td className="border border-gray-200 px-4 py-2">{item.unitPrice}</td>
                                <td className="border border-gray-200 px-4 py-2 font-bold text-gray-700 center">{item.unitPrice * item.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-6">
                    <Breakdown total={
                        invoice.items.reduce((acc, item) => {
                            return acc + (item.unitPrice * item.quantity)

                        }, 0)
                    }
                               tax={invoice.tax}
                               discount={invoice.globalDiscount}
                    />
                </div>

            </div>
        </div>
    )
}
