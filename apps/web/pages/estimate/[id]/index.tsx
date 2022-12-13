import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import {useEstimateControllerFindOne} from "../../../../../libs/SDK";
import Router, {useRouter} from "next/router";
import EstimateViewer from "../../../components/form/EstimateViewer";

export default function ViewEstimate() {

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

                    <EstimateViewer estimate={estimate}/>
                </div>

            </div>
        </div>
    )
}
