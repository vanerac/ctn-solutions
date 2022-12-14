import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import {invoiceControllerRemove, useInvoiceControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";
import InvoiceViewer from "../../../components/invoice/InvoiceViewer";

export default function ViewInvoice() {

    const router = useRouter()
    const {id} = router.query

    const {data: invoice, error: invoiceError, mutate: mutateInvoice} = useInvoiceControllerFindOne(String(id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }

            }
        }
    })

    const deleteButton = async () => {
        await invoiceControllerRemove(String(id))
        mutateInvoice()
    }

    if (!invoice) {
        return <div>loading...</div>
    }

    if (invoiceError) {
        return <div>failed to load</div>
    }

    return (
        <div>
            <TopBar/>

            <div className="flex flex-row">
                <SideBar/>
                <div className="flex flex-col">
                    <HierarchyBar items={[
                        {href: "/", name: "Home"},
                        {href: "/invoice", name: "Invoices"},
                        {href: null, name: String(invoice?.title)}]}/>

                    <InvoiceViewer invoice={invoice}/>
                </div>
                {/*Edit button*/}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                        onClick={() => {
                            Router.push(`/invoice/${id}/edit`)
                        }}>
                    Edit
                </button>
                {/*    Deliete button*/}
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                        onClick={deleteButton
                        }
                >
                    Delete
                </button>


            </div>
        </div>
    )
}
