import {Customer, Estimate, useCustomerControllerFindAll} from "../../../../libs/SDK";
import {useState} from "react";
import FormField from "./FormField";
import BillingInfo from "./BillingInfo";
import Breakdown from "./Breakdown";

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
    const [customer, setCustomer] = useState<Customer | undefined>(customers?.find((c => c.id === estimate?.customer)));
    const [title, setTitle] = useState<string>(estimate?.title || "");
    const [description, setDescription] = useState<string>(estimate?.description || "");
    const [creationDate, setCreationDate] = useState<Date>(estimate?.date || new Date());
    const [dueDate, setDueDate] = useState<Date>(estimate?.dueDate || new Date());

    const [fields, setFields] = useState<Estimate["items"]>(estimate?.items || []);

    const [notes, setNotes] = useState<string>(estimate?.notes || "");
    const [terms, setTerms] = useState<string>(estimate?.terms || "");
    const [tax, setTax] = useState<number>(estimate?.tax || 0);
    const [discount, setDiscount] = useState<number>(estimate?.globalDiscount || 0);


    const onFieldChange = (index: number, field: Estimate["items"][number]) => {
        const newFields = [...fields];
        newFields[index] = field;
        setFields(newFields);
    }


    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEstimate = {
            ...estimate,
            title: title,
            description: description,
            date: creationDate,
            dueDate: dueDate,
            items: fields,
            notes: notes,
            terms: terms,
            tax: tax,
            globalDiscount: discount,
            customer: customer?.id as any,
            status: "draft",
            updatedAt: new Date(),
            createdAt: new Date(),

            // Todo: missing fields
            // billingAddress: customer?.billingAddress,
            // shippingAddress: customer?.shippingAddress,
            // id: estimate?.id,
            // owner: estimate?.owner,
        }

        onSubmit(newEstimate as Estimate);
    }

    const [fieldData, setFieldData] = useState([null, null]);

    return (
        // Start with the card container and the first part, the customer info
        <div className="container mx-auto justify-center item-center">
            <form onSubmit={onFormSubmit}>
                <div className="card p-4">
                    <div className="text-3xl font-bold mb-2">Estimate Creation</div>
                    <div className="text-2xl font-bold">Customer Information</div>
                    <div className="my-4 border-b border-gray-200"/>

                    <BillingInfo
                        customers={customers}
                        selectedCustomer={customer}
                        setCustomer={setCustomer}
                        title={title}
                        setTitle={setTitle}
                        creationDate={creationDate}
                        description={description}
                        dueDate={dueDate}
                        setCreationDate={setCreationDate}
                        setDescription={setDescription}
                        setDueDate={setDueDate}
                    />
                    <div className="my-4 border-b border-gray-200">
                        <div className="text-2xl font-bold">Estimate Items</div>
                        {
                            fieldData.map((item, index) => (
                                <>
                                    <div className="my-4 border-b border-gray-200"/>
                                    <FormField formData={item} onChange={(data) => onFieldChange(index, data)}/>
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
                                          defaultValue={""}
                                          onChange={(e) => setNotes(e.target.value)}
                                          value={notes}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Terms</label>
                                <textarea id="terms" name="terms" rows={3}
                                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          defaultValue={""}
                                          onChange={(e) => setTerms(e.target.value)}
                                          value={terms}
                                />
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
                                       onChange={(e) => setTax(e.target.value as any)}/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Discount</label>
                                <input type="number" name="discount" id="discount" required
                                       className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                       value={discount}
                                       onChange={(e) => setDiscount(e.target.value as any)}/>
                            </div>
                        </div>
                    </div>

                    <div className="text-2xl font-bold">Total breakdown</div>
                    <div className="my-4 border-b border-gray-200"/>

                    {/* Total, give the total, before and after taxes & discounts*/}
                    {/* Display only, fields should not be inputs*/}
                    <Breakdown tax={20} discount={10} total={1000}/>


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
