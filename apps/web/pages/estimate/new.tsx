import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import HierarchyBar from "../../components/HierarchyBar";
import EstimateForm from "../../components/form/EstimateForm";
import {Estimate, estimateControllerCreate} from "../../../../libs/SDK";


export default function NewEstimate() {


    const handleEstimateCreate = async (data: Estimate) => {
        console.log(data);
        await estimateControllerCreate(data);
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
                        {href: null, name: "Create"}
                    ]}/>


                    <div className="flex flex-row">
                        <EstimateForm estimate={null} onSubmit={handleEstimateCreate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
