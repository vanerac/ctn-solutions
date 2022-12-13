import SideBar from "../components/Sidebar/SideBar";
import TopBar from "../components/TopBar";
import HierarchyBar from "../components/HierarchyBar";

function Home() {
    return (
        <>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                <HierarchyBar items={[
                    {href: null, name: "Home"}]}/>
            </div>

        </>
    )
}

export default Home;
