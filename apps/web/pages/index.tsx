import SideBar from "../components/Sidebar/SideBar";
import TopBar from "../components/TopBar";
import HierarchyBar from "../components/HierarchyBar";
import CurveGraph from "../components/dataviz/CurveGraph";


function Home() {
    return (
        <>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                <HierarchyBar items={[
                    {href: null, name: "Home"}]}/>

                <CurveGraph/>
                {/*<DisplayPDF src={'../document.pdf'}/>*/}

            </div>

        </>
    )
}

export default Home;
