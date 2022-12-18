import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import {invoiceControllerRemove, useInvoiceControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";
import InvoiceViewer from "../../../components/invoice/InvoiceViewer";
import Signature from "../../../components/Signature";
// import {Dialog} from "@mantine/core";
import {useRef, useState} from "react";
import {Button, Dialog, EditIcon, HighlightIcon, Pane, TrashIcon} from "evergreen-ui";

export default function ViewInvoice() {

    const router = useRouter()
    const {id} = router.query

    const [signature, setSignature] = useState<HTMLCanvasElement | null>(null)
    const [showDialog, setShowDialog] = useState(false)

    const {data: invoice, error: invoiceError, mutate: mutateInvoice} = useInvoiceControllerFindOne(String(id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }

            }
        }
    })

    const signatureRef = useRef(null)

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

                    <div className={"flex flex-row m-5 w-full"}>
                        <Button appearance={"primary"}
                                intent={""}
                                marginRight={42} size="medium"
                                iconBefore={EditIcon}
                                onClick={() => {
                                    Router.push(`/invoice/${id}/edit`)
                                }}>
                            Edit
                        </Button>
                        {/*    Deliete button*/}


                        <Button
                            appearance={"primary"}
                            intent={"success"}
                            marginRight={42} size="medium"
                            iconBefore={HighlightIcon}
                            className={"justify-self-start"}
                            onClick={() => {
                                setShowDialog(true)
                            }}>
                            Sign
                        </Button>
                        <Button appearance={"primary"}
                                intent={"danger"}
                                iconBefore={TrashIcon}
                                marginRight={42} size="medium"
                                onClick={deleteButton
                                }
                                className={"justify-self-end"}>

                            Delete
                        </Button>
                    </div>
                    <InvoiceViewer invoice={invoice}/>
                    <Pane>
                        <Dialog
                            isShown={showDialog}
                            onConfirm={() => setShowDialog(false)}
                            title="Sign"
                            intent="success"
                            onCloseComplete={() => setShowDialog(false)}
                            confirmLabel="Save"
                            onCancel={() => setShowDialog(false)}
                            shouldCloseOnEscapePress={true}
                        >

                            <Signature/>
                        </Dialog>
                    </Pane>
                </div>

            </div>
        </div>
    )
}
