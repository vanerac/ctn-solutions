import {Customer} from "../../../../libs/SDK";

export default function BillingInfo({
                                        customers,
                                        selectedCustomer,
                                        setCustomer,

                                        title,
                                        setTitle,

                                        description,
                                        setDescription,

                                        creationDate,
                                        setCreationDate,

                                        dueDate,
                                        setDueDate,
                                    }: {
    customers?: Customer[],
    selectedCustomer: Customer | undefined,
    setCustomer: (customer: Customer | undefined) => void,

    title: string,
    setTitle: (title: string) => void,

    description: string,
    setDescription: (description: string) => void,

    creationDate: Date,
    setCreationDate: (creationDate: Date) => void,

    dueDate: Date,
    setDueDate: (dueDate: Date) => void,
}) {


    console.log(selectedCustomer?.company);

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
                            <option key={customer.id} value={customer.id}
                                    selected={selectedCustomer?.id == customer.id}>{customer.firstname}</option>
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
                           value={creationDate?.toISOString()?.split("T")[0] ?? ""}
                           onChange={(e) => setCreationDate(new Date(e.target.value))}/>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input type="date" name="dueDate" id="dueDate" required
                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           value={dueDate?.toISOString()?.split("T")[0] ?? ""}
                           onChange={(e) => setDueDate(new Date(e.target.value))}/>
                </div>
            </div>

            {/*/!* Address*!/*/}
            {/*<div className="col-span-2">*/}
            {/*    <label className="block text-sm font-medium text-gray-700">Address</label>*/}
            {/*    <input type="text" name="address" id="address" required*/}
            {/*           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
            {/*           value={selectedCustomer?.company?.address ?? ""}*/}
            {/*           disabled/>*/}
            {/*</div>*/}
            {/*<div className="col-span-2">*/}
            {/*    <label className="block text-sm font-medium text-gray-700">City</label>*/}
            {/*    <input type="text" name="city" id="city" required*/}
            {/*           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
            {/*           value={selectedCustomer?.company?.city ?? ""}*/}
            {/*           disabled/>*/}

            {/*</div>*/}
            {/*<div className="col-span-2">*/}
            {/*    <label className="block text-sm font-medium text-gray-700">Zip</label>*/}
            {/*    <input type="text" name="country" id="country" required*/}
            {/*           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
            {/*           value={selectedCustomer?.company?.zip ?? ""}*/}
            {/*           disabled/>*/}

            {/*</div>*/}


        </div>
    )
}
