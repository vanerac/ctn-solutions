import SideBar from "../components/Sidebar/SideBar";
import TopBar from "../components/TopBar";
import HierarchyBar from "../components/HierarchyBar";
import InvoicesWidget from "../components/widgets/InvoicesWidget";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";


const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),

});

function Home() {
    return (
        <>
            <ApolloProvider client={client}>
                <TopBar/>
                <div className="flex flex-row">
                    <SideBar/>
                    <HierarchyBar items={[
                        {href: null, name: "Home"}]}/>

                    {/*<CurveGraph/>*/}
                    {/*<LabelValue data={123} label={"test"}/>*/}
                    <InvoicesWidget/>
                    {/*<DisplayPDF src={'../document.pdf'}/>*/}

                </div>
            </ApolloProvider>

        </>
    )
}

export default Home;
