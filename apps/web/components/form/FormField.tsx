import {useEffect, useState} from "react";
import {EstimateField} from "../../../../libs/SDK";

export default function FormField({
                                      formData,
                                      onChange,
                                      onDelete,
                                  }: {
    formData?: EstimateField | null,
    onChange?: (data: EstimateField) => void,
    onDelete?: () => void,
}) {


    // formData.title
    // formData.description
    // formData.quantity
    // formData.unitPrice
    // formData.discount
    // formData.tax

    const [title, setTitle] = useState<string>(formData?.title ?? "");
    const [description, setDescription] = useState<string>(formData?.description ?? "");
    const [quantity, setQuantity] = useState<number>(formData?.quantity ?? 0);
    const [unitPrice, setUnitPrice] = useState<number>(formData?.unitPrice ?? 0);
    const [discount, setDiscount] = useState<number>(formData?.discount ?? 0);
    const [tax, setTax] = useState<number>(formData?.tax ?? 0);


    useEffect(() => {
        const obj = Object.assign(
            formData ?? {},
            {
                title: title,
                description: description,
                quantity: quantity,
                unitPrice: unitPrice,
                discount: discount,
                tax: tax,
            }
        )
        if (onChange) {
            onChange(obj as any);
        }
    }, [title, description, quantity, unitPrice, discount, tax])


    return (
        <div className="grid grid-cols-2 gap-4  p-8 bg-white border rounded shadow">
            <div className="col-span-3">
                <table className="table-auto border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Item
                            Title
                        </th>
                        {/*<th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Description</th>*/}
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Quantity</th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Unit
                            Price
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Total
                            Price
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Details</span>

                            <input type="text" name="itemName" id="itemName" required
                                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                            <textarea name="itemDescription" id="itemDescription" required
                                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}/>
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Quantity</span>
                            <input type="number" name="quantity" id="quantity" required
                                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   value={quantity}
                                   onChange={(e) => setQuantity(e.target.value as any)}/>
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Unit Price</span>
                            <input type="number" name="unitPrice" id="unitPrice" required
                                   className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   value={unitPrice}
                                   onChange={(e) => setUnitPrice(e.target.value as any)}/>
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Total Price</span>
                            <p className="text-gray-700">{(unitPrice * quantity).toFixed(2)}</p>
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span
                                className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Delete</span>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        if (onDelete) {
                                            onDelete();
                                        }
                                    }}>
                                Delete
                            </button>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </div>
        </div>

    )
}
