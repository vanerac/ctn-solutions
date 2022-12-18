import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import HierarchyBar from "../../components/HierarchyBar";
import InvoiceForm from "../../components/invoice/InvoiceForm";
import {Invoice, invoiceControllerCreate} from "../../../../libs/SDK";
import Router from "next/router";
import {toaster} from "evergreen-ui";


export default function NewInvoice() {


    const handleInvoiceCreate = async (data: Invoice) => {
        console.log(data);
        const invoice = await invoiceControllerCreate(data);
        toaster.success('Create successful', {duration: 3, description: 'Invoice created successfully'})
        Router.push('/invoice/' + invoice.id);
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
                        {href: null, name: "Create"}
                    ]}/>


                    <div className="flex flex-row">
                        <InvoiceForm invoice={null} onSubmit={handleInvoiceCreate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
