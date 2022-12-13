import {useState} from "react";

export default function FormField() {

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemPrice, setItemPrice] = useState(0);


    return (
        <div className="grid grid-cols-2 gap-4  p-8 bg-white border rounded shadow">

            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input type="text" name="itemName" id="itemName" required
                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       value={itemName}
                       onChange={(e) => setItemName(e.target.value)}/>
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="itemDescription" id="itemDescription" required
                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       value={itemDescription}
                       onChange={(e) => setItemDescription(e.target.value)}/>

            </div>
            
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input type="number" name="quantity" id="quantity" required
                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       value={itemQuantity}
                       onChange={(e) => setItemQuantity(e.target.value as any)}/>
            </div>
            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input type="number" name="unitPrice" id="unitPrice" required
                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       value={itemPrice}
                       onChange={(e) => setItemPrice(e.target.value as any)}/>
            </div>

            <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Total Price</label>
                <p className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    {itemQuantity * itemPrice}
                </p>
            </div>
        </div>
    )
}
