import Router, {useRouter} from "next/router";
import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import CompanyDetailsForm from "../../../components/CompanyDetailsForm";
import {
    Company,
    companyControllerUpdate,
    Customer,
    customerControllerUpdate,
    useCompanyControllerFindOne,
    useCustomerControllerFindOne
} from "../../../../../libs/SDK";
import ContactForm from "../../../components/ContactForm";
import HierarchyBar from "../../../components/HierarchyBar";

export default function EditCustomerPage() {
    const router = useRouter()
    const {id} = router.query

    const {data: customer, error: customerError, mutate: mutateCustomer} = useCustomerControllerFindOne(String(id), {
            swr: {
                onError: (err) => {
                    if (err?.response?.status === 401) {
                        Router.push('/login');
                    }
                }
            }
        }
    )
    const {
        data: company,
        error: companyError,
        mutate: mutateCompany
    } = useCompanyControllerFindOne(String(customer?.company), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })

    // if (customerError || companyError) {
    //     return <div>failed to load</div>
    // }

    if (!customer || !company) {
        return <div>loading...</div>
    }

    const handleCustomerEdit = async (data: Customer) => {
        console.log(data);
        await customerControllerUpdate(String(id), data)
        await mutateCustomer();
    }

    const handleCompanyEdit = async (data: Company) => {

        console.log(data)
        await companyControllerUpdate(String(customer?.company), data)
        await mutateCompany()

    }

    return (
        <div>
            <TopBar/>
            <div className="flex flex-row">
                <button
                    onClick={() => Router.push("/customers/" + id)}

                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                >Back
                </button>
            </div>
            <div className="flex flex-row">
                <SideBar/>
                <div className="flex flex-col">
                    <HierarchyBar items={[
                        {href: "/", name: "Home"},
                        {href: "/customers", name: "Customers"},
                        {href: "/customers/" + id, name: customer?.email},
                        {href: null, name: "Edit"}
                    ]}/>


                    <div className="flex flex-row">
                        <ContactForm customerData={customer} submitAction={handleCustomerEdit}></ContactForm>
                        <CompanyDetailsForm companyData={company} submitAction={handleCompanyEdit}></CompanyDetailsForm>
                    </div>
                </div>
            </div>
        </div>
    )
}