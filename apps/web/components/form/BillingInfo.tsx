import {Customer} from "../../../../libs/SDK";
import {useState} from "react";

export default function BillingInfo() {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | undefined>();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [creationDate, setCreationDate] = useState<Date>(new Date());
    const [dueDate, setDueDate] = useState<Date>(new Date());


    return (
        <div className="grid grid-cols-2 gap-4 p-8 bg-white border rounded shadow">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Customer</label>
                    <select
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                            const customerId = e.target.value;
                            const customer = customers?.find(customer => customer.id == +customerId);
                            setCustomer(customer);
                        }}
                    >
                        <option>Select a customer</option>
                        {customers?.map(customer => (
                            <option key={customer.id} value={customer.id}>{customer.firstname}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" required
                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" required
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                    <input type="date" name="creationDate" id="creationDate" required
                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           value={creationDate.toISOString().split("T")[0]}
                           onChange={(e) => setCreationDate(e.target.value as any)}/>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" required
                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           value={dueDate.toISOString().split("T")[0]}
                           onChange={(e) => setDueDate(e.target.value as any)}/>
                </div>
            </div>
        </div>
    )
}
