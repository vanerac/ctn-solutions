import SideBar from "../components/Sidebar/SideBar";
import TopBar from "../components/TopBar";
import HierarchyBar from "../components/HierarchyBar";
import InvoiceForm from "../components/invoice/InvoiceForm";

function Home() {
    return (
        <>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                <HierarchyBar items={[
                    {href: null, name: "Home"}]}/>
                <InvoiceForm invoice={null} onSubmit={() => {
                }}/>
            </div>

        </>
    )
}

export default Home;
