import {Customer, Invoice, InvoiceField, useCustomerControllerFindAll} from "../../../../libs/SDK";
import {useState} from "react";
import InvoiceFormField from "../invoice/InvoiceFormField";
import BillingInfo from "../form/BillingInfo";
import Breakdown from "../form/Breakdown";
// import {} from "@mantine/core";
import {Step, StepContent, StepLabel, Stepper, Typography} from '@mui/material';
import {Button} from "evergreen-ui";

export default function InvoiceForm({
                                        invoice,
                                        onSubmit,
                                    }:
                                        {
                                            invoice?: Invoice | null,
                                            onSubmit: (invoice: Invoice) => void,
                                        }
) {

    const {data: customers, error: customersError} = useCustomerControllerFindAll();
    const [customer, setCustomer] = useState<Customer | undefined>(customers?.find((c => c.id === invoice?.customer.id)));
    const [title, setTitle] = useState<string>(invoice?.title || "");
    const [description, setDescription] = useState<string>(invoice?.description || "");
    const [creationDate, setCreationDate] = useState<Date>(invoice?.date ? new Date(invoice?.date as unknown as string) : new Date());
    const [dueDate, setDueDate] = useState<Date>(invoice?.dueDate ? new Date(invoice?.dueDate as unknown as string) : new Date());

    const [fields, setFields] = useState<Array<InvoiceField | null>>(invoice?.items || [null]);

    const [notes, setNotes] = useState<string>(invoice?.notes || "");
    const [terms, setTerms] = useState<string>(invoice?.terms || "");
    const [tax, setTax] = useState<number>(invoice?.tax || 0);
    const [discount, setDiscount] = useState<number>(invoice?.globalDiscount || 0);

    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});


    const onFieldChange = (index: number, field: Invoice["items"][number]) => {
        const newFields = [...fields];
        newFields[index] = field;
        setFields(newFields);
    }

    const onFieldDelete = (index: number) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    }


    const onFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        console.log('Fields')
        console.log(fields)

        const newInvoice = {
            ...invoice,
            title: title,
            description: description,
            date: creationDate,
            dueDate: dueDate,
            items: fields,
            notes: notes,
            terms: terms,
            tax: tax,
            globalDiscount: discount,
            customer: customer,
            status: "draft",
            updatedAt: new Date(),
            createdAt: new Date(),

            billingAddress: customer?.company,
            shippingAddress: customer?.company,
            id: invoice?.id,
            owner: invoice?.owner,
        }

        onSubmit(newInvoice as Invoice);
    }

    return (
        <div className="w-full ml-5 container mx-auto justify-center item-center">
            <Stepper orientation="vertical" activeStep={activeStep}>
                <Step completed={completed[0] ?? false}>
                    <StepLabel error={completed[0] && !customer}>
                        <button onClick={() => setActiveStep(0)}>
                            <Typography color={
                                completed[0] && !customer ? "error" : "textPrimary"
                            }>
                                <div className="text-2xl font-bold">Customer Information</div>
                            </Typography>
                        </button>
                    </StepLabel>
                    <StepContent>

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
                        <div className="mt-2 flex flex-row justify-end">
                            <Button onClick={() => {
                                setActiveStep(1)
                                setCompleted({...completed, 0: true})
                            }}>Next</Button>
                        </div>

                    </StepContent>
                </Step>
                <Step completed={completed[1] ?? false}>
                    <StepLabel error={
                        completed[1] && fields.length === 0
                    }>
                        <button onClick={() => setActiveStep(1)}>
                            <div className="text-2xl font-bold">Invoice Items</div>
                        </button>
                    </StepLabel>
                    <StepContent>
                        {
                            fields.map((item, index) => (
                                <>

                                    <InvoiceFormField formData={item}
                                                      onChange={(data) => onFieldChange(index, data)}
                                                      onDelete={() => onFieldDelete(index)}/>
                                    <div className="my-4 border-b border-gray-200"/>
                                </>
                            ))
                        }

                        <Button
                            // className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            // type="button"
                            type={"reset"}
                            appearance={"primary"}
                            onClick={() => setFields([...fields, null])}
                        >
                            Add Field
                        </Button>
                        <div className="mt-2 flex flex-row justify-end">
                            <Button type={"reset"} appearance={"minimal"}
                                    onClick={() => setActiveStep(0)}>Back</Button>
                            <Button type={"reset"} onClick={() => {
                                setActiveStep(2)
                                setCompleted({...completed, 1: true})
                            }}>Next</Button>
                        </div>


                    </StepContent>
                </Step>
                <Step completed={completed[2] ?? false}>
                    <StepLabel>
                        <button onClick={() => setActiveStep(2)}>
                            <div className="mt-2 mb-2 text-2xl font-bold">Notes & terms</div>
                        </button>
                    </StepLabel>
                    <StepContent>
                        <div className="mt-6">
                            <div className="grid grid-cols-2 gap-4 p-8 bg-white border rounded shadow">
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
                        <div className="mt-2 flex flex-row justify-end">
                            <Button appearance={"minimal"} onClick={() => setActiveStep(1)}>Back</Button>
                            <Button onClick={() => {
                                setActiveStep(3)
                                setCompleted({...completed, 2: true})
                            }}>Next</Button>
                        </div>
                    </StepContent>
                </Step>
                <Step completed={completed[3] ?? false}>
                    <StepLabel>
                        <button onClick={() => setActiveStep(3)}>
                            <div className="text-2xl font-bold">Taxes & Discounts</div>
                        </button>
                        {/*<div className="my-4 border-b border-gray-200"/>*/}
                    </StepLabel>
                    <StepContent>
                        <div className="mt-6">
                            <div className="grid grid-cols-2 gap-4 p-8 bg-white border rounded shadow">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Tax</label>
                                    <input type="number" name="tax" id="tax" required
                                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                           value={tax}
                                           onChange={(e) => setTax(+e.target.value)}/>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Discount</label>
                                    <input type="number" name="discount" id="discount" required
                                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                           value={discount}
                                           onChange={(e) => setDiscount(+e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-row justify-end">
                            <Button appearance={"minimal"} onClick={() => setActiveStep(2)}>Back</Button>
                            <Button onClick={() => {
                                setActiveStep(4)
                                setCompleted({...completed, 3: true})
                            }}>Next</Button>
                        </div>
                    </StepContent>
                </Step>
                <Step completed={completed[4] ?? false}>
                    <StepLabel>
                        <button onClick={() => setActiveStep(4)}>
                            <div className="text-2xl font-bold">Total breakdown</div>
                        </button>
                    </StepLabel>
                    <StepContent>
                        <Breakdown tax={
                            tax
                        } discount={
                            discount
                        } total={
                            fields.reduce(
                                (acc, item) =>
                                    acc +
                                    ((
                                        (item?.unitPrice ?? 0) * (item?.quantity ?? 0)) ?? 0)
                                , 0)
                        }/>
                        <div className="mt-2 flex flex-row justify-end">
                            <Button appearance={"minimal"} onClick={() => setActiveStep(3)}>Back</Button>
                            <Button appearance={"primary"} intent={"success"} type={"submit"}
                                    onChange={() => onFormSubmit()}>Save</Button>
                        </div>
                    </StepContent>
                </Step>
            </Stepper>
            <Button type={"reset"} onChange={() => setActiveStep(0)}>
                Reset
            </Button>
        </div>
    )

}
