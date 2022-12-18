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
import {toaster} from "evergreen-ui";

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

    if (!customer && !company) {
        return <div>loading...</div>
    }

    const handleCustomerEdit = async (data: Customer) => {
        console.log(data);
        await customerControllerUpdate(String(id), data)
        toaster.success('Update successful', {duration: 3, description: 'Customer updated successfully'})
        await mutateCustomer();
    }

    const handleCompanyEdit = async (data: Company) => {

        console.log(data)
        await companyControllerUpdate(String(customer?.company?.id), data)
        toaster.success('Update successful', {duration: 3, description: 'Company updated successfully'})
        await mutateCompany()

    }

    return (
        <div>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                <div className="flex flex-col">
                    <HierarchyBar items={[
                        {href: "/", name: "Home"},
                        {href: "/customers", name: "Customers"},
                        {href: "/customers/" + id, name: customer?.email ?? "Loading..."},
                        {href: null, name: "Edit"}
                    ]}/>


                    <div className="flex flex-row">
                        <ContactForm customerData={customer} submitAction={handleCustomerEdit}></ContactForm>
                        <CompanyDetailsForm companyData={customer?.company ?? undefined}
                                            submitAction={handleCompanyEdit}></CompanyDetailsForm>
                    </div>
                </div>
            </div>
        </div>
    )
}
