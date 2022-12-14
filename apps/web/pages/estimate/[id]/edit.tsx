import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import EstimateForm from "../../../components/form/EstimateForm";
import {Estimate, estimateControllerUpdate, useEstimateControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";

export default function EditEstimate() {

    const router = useRouter()
    const {id} = router.query

    const {data: estimate, error: estimateError, mutate: mutateEstimate} = useEstimateControllerFindOne(String(id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })

    if (!estimate) {
        return <div>loading...</div>
    }

    if (estimateError) {
        return <div>failed to load</div>
    }

    const handleEstimateUpdate = async (data: Estimate) => {
        console.log(data);
        await estimateControllerUpdate(String(id), data);
        await mutateEstimate();
    }

    return <div>
        <TopBar/>
        <div className="flex flex-row">
            <SideBar/>
            <div className="flex flex-col">
                <HierarchyBar items={[
                    {href: "/", name: "Home"},
                    {href: "/estimate", name: "Estimates"},
                    {href: "/estimate/" + id, name: String(estimate?.title)},
                    {href: null, name: "Edit"}
                ]}/>

                <div className="flex flex-row">
                    <EstimateForm estimate={estimate} onSubmit={handleEstimateUpdate}/>
                </div>
            </div>
        </div>
    </div>
}
