import Router, {useRouter} from "next/router";
import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import CompanyDetailsForm from "../../../components/CompanyDetailsForm";
import {Company, Customer, useCompanyControllerFindOne, useCustomerControllerFindOne} from "../../../../../libs/SDK";
import ContactForm from "../../../components/ContactForm";

export default function EditCustomerPage() {
    const router = useRouter()
    const {id} = router.query

    const {data: customer, error} = useCustomerControllerFindOne(String(id), {
            swr: {
                onError: (err) => {
                    if (err?.response?.status === 401) {
                        Router.push('/login');
                    }
                }
            }
        }
    )
    const {data: company, error: companyError} = useCompanyControllerFindOne(String(customer?.company), {
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })

    if (error) {
        return <div>failed to load</div>
    }

    if (!company) {
        return <div>loading...</div>
    }

    const handleCustomerEdit = (data: Customer) => {


    }

    const handleCompanyEdit = (data: Company) => {

    }

    return (
        <div>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                <ContactForm customerData={customer} submitAction={handleCustomerEdit}></ContactForm>
                <CompanyDetailsForm companyData={company} submitAction={handleCompanyEdit}></CompanyDetailsForm>
            </div>
        </div>
    )
}
