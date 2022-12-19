import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import Router, {useRouter} from "next/router";
import {useInvoiceControllerFindOne} from "../../../../../libs/SDK";
import DisplayPDF from "../../../components/PDF/DisplayPDF";

export default function SignInvoice() {

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

                    <DisplayPDF src={invoice?.exports[0].export.document?.url as string}
                                signatureAnchors={invoice?.exports[0].export?.document?.signatures?.map(sig => sig.anchors)}/>


                </div>
            </div>
        </div>
    )
}
