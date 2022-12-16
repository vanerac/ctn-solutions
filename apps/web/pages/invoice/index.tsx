import {Invoice as InvoiceType, InvoiceStatus, useInvoiceControllerFindAll} from "../../../../libs/SDK";
import Router from "next/router";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import HierarchyBar from "../../components/HierarchyBar";
import {Badge, Checkbox, EyeOpenIcon, IconButton} from "evergreen-ui";
import {useState} from "react";

export default function Invoice() {

    const {data: invoices, error, mutate} = useInvoiceControllerFindAll({
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })


    const [selection, setSelection] = useState<InvoiceType[]>([])

    const statusEnum: { [K in InvoiceStatus]: "neutral" | "blue" | "green" | "red" | "yellow" | "automatic" | "orange" | "teal" | "purple" | undefined } = {
        draft: 'neutral',
        sent: 'blue',
        accepted: 'green',
        declined: 'red',
        cancelled: 'neutral',
        changes_requested: 'yellow',
        expired: 'neutral'
    }

    const select = (estimate: InvoiceType) => {
        if (selection.includes(estimate)) {
            setSelection(selection.filter(e => e !== estimate))
        } else {
            setSelection([...selection, estimate])
        }
    }

    if (error) return <div>failed to load</div>
    if (!invoices) return <div>loading...</div>

    return (
        <>
            <TopBar/>

            <div className="flex flex-row">

                <SideBar/>
                <div className="flex flex-col w-3/4">
                    <div className="flex flex-col">
                        <HierarchyBar items={[
                            {href: "/", name: "Home"},
                            {href: null, name: "Invoices"}]}/>
                    </div>
                    <div className='container w-3/4 mx-auto my-10 bg-white rounded-lg shadow-lg'>
                        <h1 className='text-3xl text-center my-5'>Invoices</h1>
                        <div className='flex justify-end px-5 py-3 border-b border-gray-200'>
                            <button
                                className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                onClick={() => Router.push('/invoice/new')}>New Invoice
                            </button>
                        </div>
                        <table className='w-full table-auto'>
                            <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'><
                                    Checkbox
                                    indeterminate={selection.length > 0 && selection.length < invoices.length}
                                    checked={selection.length === invoices.length}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelection(invoices)
                                        } else {
                                            setSelection([])
                                        }
                                    }}/>
                                </th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Title</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Value</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Status</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Date</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Due Date</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Customer</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoices.map((invoiceItem) => (
                                <tr key={invoiceItem.id} className="text-center justify-center">
                                    <td className='px-4 py-2 text-sm text-gray-600'>
                                        <Checkbox checked={selection.includes(invoiceItem)} onChange={(estimate) => {
                                            select(invoiceItem)
                                        }}/>
                                    </td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoiceItem.title}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoiceItem?.items?.reduce(
                                        (acc, curr) => acc + (curr.quantity * curr.unitPrice), 0)}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>
                                        <Badge color={statusEnum[invoiceItem.status]}>
                                            {invoiceItem.status}
                                        </Badge>
                                    </td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(invoiceItem.date).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(invoiceItem.dueDate).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoiceItem?.customer?.company?.legalname}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>
                                        <IconButton
                                            icon={EyeOpenIcon}
                                            onClick={() => Router.push(`/invoice/${invoiceItem.id}`)}>View
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>)

}
