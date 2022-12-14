import {useInvoiceControllerFindAll} from "../../../../libs/SDK";
import Router from "next/router";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import HierarchyBar from "../../components/HierarchyBar";

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
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoice.title}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoice?.items?.reduce(
                                        (acc, curr) => acc + (curr.quantity * curr.unitPrice), 0)}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoice.status}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(invoice.date).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(invoice.dueDate).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{invoice.customer.id}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>
                                        <button
                                            className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                            onClick={() => Router.push(`/invoice/${invoice.id}`)}>View
                                        </button>
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
