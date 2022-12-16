import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import InvoiceForm from "../../../components/invoice/InvoiceForm";
import {Invoice, invoiceControllerUpdate, useInvoiceControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";
import {toaster} from "evergreen-ui";

export default function EditInvoice() {

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

    if (!invoice) {
        return <div>loading...</div>
    }

    if (invoiceError) {
        return <div>failed to load</div>
    }

    const handleInvoiceUpdate = async (data: Invoice) => {
        console.log(data);
        await invoiceControllerUpdate(String(id), data);
        toaster.success('Update successful', {duration: 3, description: 'Invoice updated successfully'})
        Router.push('/invoice/' + id);
    }

    return <div>
        <TopBar/>
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex flex-col">
                <HierarchyBar items={[
                    {href: "/", name: "Home"},
                    {href: "/invoice", name: "Invoices"},
                    {href: "/invoice/" + id, name: String(invoice?.title)},
                    {href: null, name: "Edit"}
                ]}/>

                <div className="flex flex-row">
                    <InvoiceForm invoice={invoice} onSubmit={handleInvoiceUpdate}/>
                </div>
            </div>
        </div>
    </div>
}
