import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import {estimateControllerRemove, useEstimateControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";
import EstimateViewer from "../../../components/estimate/EstimateViewer";
import {Button, Dialog, EditIcon, HighlightIcon, Pane, TrashIcon} from "evergreen-ui";
import Signature from "../../../components/Signature";
import {useState} from "react";

export default function ViewEstimate() {

    const router = useRouter()
    const {id} = router.query
    const [showDialog, setShowDialog] = useState(false)

    const {data: estimate, error: estimateError, mutate: mutateEstimate} = useEstimateControllerFindOne(String(id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }

            }
        }
    })

    const deleteButton = async () => {
        await estimateControllerRemove(String(id))
        mutateEstimate()
    }

    if (!estimate) {
        return <div>loading...</div>
    }

    if (estimateError) {
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
                        {href: "/estimate", name: "Estimates"},
                        {href: null, name: String(estimate?.title)}]}/>

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
                    <EstimateViewer estimate={estimate}/>
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

                            <Signature onSave={() => {
                            }}/>
                        </Dialog>
                    </Pane>


                </div>
            </div>
        </div>
    )
}
