import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import HierarchyBar from "../../../components/HierarchyBar";
import {estimateControllerRemove, useEstimateControllerFindOne} from "../../../../../libs/SDK";
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

                    <EstimateViewer estimate={estimate}/>
                </div>
                {/*Edit button*/}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 h-10"
                        onClick={() => {
                            Router.push(`/estimate/${id}/edit`)
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
