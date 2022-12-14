import Router, {useRouter} from "next/router";
import {useCompanyControllerFindOne, useCustomerControllerFindOne} from "../../../../../libs/SDK";
import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import CustomerDetails from "../../../components/CustomerDetails";
import HierarchyBar from "../../../components/HierarchyBar";

export default function CustomerPage() {
    const router = useRouter()
    const {id} = router.query

    const {data: customerData, error: customerError} = useCustomerControllerFindOne(String(id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })
    const {data: companyData, error: companyError} = useCompanyControllerFindOne(String(customerData?.company?.id), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })


    if (customerError || companyError) {
        return <div>failed to load</div>
    }

    if (!customerData || !companyData) {
        return <div>loading...</div>
    }


    // Card with customer details
    // Add a button to edit the customer
    // Add a button to delete the customer
    return (
        <div>
            <TopBar/>

            <div className="flex flex-row">
                <SideBar/>
                <div className="flex flex-col">
                    <HierarchyBar items={[
                        {href: "/", name: "Home"},
                        {href: "/customers", name: "Customers"},
                        {href: null, name: customerData?.email}]}/>

                    <CustomerDetails customer={customerData} companyData={companyData}/>
                </div>

            </div>
        </div>
    )

}
