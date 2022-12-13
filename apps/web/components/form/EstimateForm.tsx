import {Customer, Estimate, EstimateField, useCustomerControllerFindAll} from "../../../../libs/SDK";
import {useState} from "react";
import FormField from "./FormField";
import BillingInfo from "./BillingInfo";

export default function EstimateForm({
                                         estimate,
                                         onSubmit,
                                     }:
                                         {
                                             estimate?: Estimate | null,
                                             onSubmit: (estimate: Estimate) => void,
                                         }
) {

    const {data: customers, error: customersError} = useCustomerControllerFindAll();
    const [customer, setCustomer] = useState<Customer>();
    const [title, setTitle] = useState<string>(estimate?.title || "");
    const [description, setDescription] = useState<string>(estimate?.description || "");
    const [creationDate, setCreationDate] = useState<Date>(estimate?.date || new Date());
    const [dueDate, setDueDate] = useState<Date>(estimate?.dueDate || new Date());

    const [fields, setFields] = useState<Estimate["items"]>(estimate?.items || []);

    const [notes, setNotes] = useState<string>(estimate?.notes || "");
    const [terms, setTerms] = useState<string>(estimate?.terms || "");
    const [tax, setTax] = useState<number>(estimate?.tax || 0);
    const [discount, setDiscount] = useState<number>(estimate?.globalDiscount || 0);

    const [itemName, setItemName] = useState<string>("");
    const [itemDescription, setItemDescription] = useState<string>("");
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    const onFieldChange = (index: number, field: Estimate["items"][number]) => {
        const newFields = [...fields];
        newFields[index] = field;
        setFields(newFields);
    }

    const onFieldDelete = (index: number) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    }

    const onFieldAdd = (data: EstimateField) => {
        const newFields = [...fields];
        newFields.push(data);
        setFields(newFields);
    }

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    const [fieldData, setFieldData] = useState([null, null, null, null, null, null, null, null, null, null]);

    return (
        // Start with the card container and the first part, the customer info
        <div className="container mx-auto justify-center item-center">
            <form onSubmit={onFormSubmit}>
                <div className="card p-4">
                    <div className="text-3xl font-bold mb-2">Estimate Creation</div>
                    <div className="text-2xl font-bold">Customer Information</div>
                    <div className="my-4 border-b border-gray-200"/>

                    <BillingInfo/>
                    <div className="my-4 border-b border-gray-200">
                        <div className="text-2xl font-bold">Estimate Items</div>
                        {
                            fieldData.map((item, index) => (
                                <>
                                    <div className="my-4 border-b border-gray-200"/>
                                    <FormField/>
                                </>
                            ))
                        }


                    </div>
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => setFieldData([...fieldData, null])}
                    >
                        Add Field
                    </button>


                    <div className="mt-2 mb-2 text-2xl font-bold">Notes & terms</div>
                    <div className="my-4 border-b border-gray-200"/>
                    {/* Notes, Terms */}
                    <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                                <textarea id="notes" name="notes" rows={3}
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          defaultValue={""}/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Terms</label>
                                <textarea id="terms" name="terms" rows={3}
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          defaultValue={""}/>
                            </div>
                        </div>
                    </div>

                    <div className="text-2xl font-bold">Taxes & Discounts</div>
                    <div className="my-4 border-b border-gray-200"/>

                    {/* Tax and discount */}
                    <div className="mt-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tax</label>
                                <input type="number" name="tax" id="tax" required
                                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                       value={tax}
                                       onChange={(e) => setTax(e.target.value)}/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Discount</label>
                                <input type="number" name="discount" id="discount" required
                                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                       value={discount}
                                       onChange={(e) => setDiscount(e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    <div className="text-2xl font-bold">Total breakdown</div>
                    <div className="my-4 border-b border-gray-200"/>

                    {/* Total, give the total, before and after taxes & discounts*/}
                    {/* Display only, fields should not be inputs*/}
                    <div className="mt-6">
                        <div className="grid grid-cols-1 gap-4 p-8 bg-white border rounded shadow">
                            {/*  Display as a rows (Field: Value) */}
                            {/*  Grand Total is underlined and strong color   */}
                            {/*  Total is bold color  */}
                            {/*  Tax & discount are slightly offset and light colored  */}
                            {/*  These data are display only, <input> tags should not be used  */}

                            {/* Format as goes:

                                   total
                                    - discount
                                    + tax
                                  --------
                                 grand total

                        */}


                            {/* TODO: Add details under each category*/}
                            <div className="flex justify-between">
                                <div className="text-gray-700">Total</div>
                                <div className="text-gray-700">10000.00</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-gray-700">Discount</div>
                                <div className="text-gray-700 text-green-500">-10.00</div>
                            </div>

                            <div className="flex justify-between">
                                <div className="text-gray-700">Tax</div>
                                {/* Red text*/}
                                <div className="text-gray-700 text-red-500">+20.00</div>
                            </div>
                            {/* Underline, bold and bigger text*/}
                            <div className="flex justify-between">
                                <div className="text-gray-700 text-lg font-bold">Grand Total</div>
                                <div className="text-gray-700 text-lg font-bold">12312.00</div>
                            </div>

                        </div>
                    </div>


                    {/* Submit */}
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                        <button type="button"
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </button>

                    </div>
                </div>
            </form>

        </div>
    );


}
