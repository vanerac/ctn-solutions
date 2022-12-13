import {Company, companyControllerCreate, Customer, customerControllerCreate} from "../../../../libs/SDK";
import {useState} from "react";
import CompanyDetailsForm from "../../components/CompanyDetailsForm";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import ContactForm from "../../components/ContactForm";
import Router from "next/router";

export default function CreateCustomer() {
    // legalname: string;
    //   taxid: string;
    //   address: string;
    //   city: string;
    //   state: string;
    //   zip: string;
    //   siret: string;
    //   ape: string;
    //   legalform: string;
    //   phone: string;
    //   email: string;
    //   website: string;
    //   logo: string;
    //   description: string;
    //   industry: string;

    // Contact details
    // id: number;
    //  email: string;
    //  company: number;

    const [company, setCompany] = useState<Company>()
    const [customer, setCustomer] = useState<Customer>()


    // Use tailwind to style the form

    // On the right side of the form, display the company details
    // On the left side of the form, display the contact details

    const handleCustomerCreation = async (e: Customer) => {
        if (!company) {
            throw new Error("Company is not set")
        }
        e.company = company.id
        const customer = await customerControllerCreate(e)

        setCustomer(customer)

    }

    const handleCompanyCreation = async (e: Company) => {
        const company = await companyControllerCreate(e)
        setCompany(company)
    }

    console.log("Company", company)

    if (customer) {
        Router.push("/customers/" + customer.id)
    }

    return (
        <>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>
                {!company ?
                    <CompanyDetailsForm companyData={company} submitAction={handleCompanyCreation}/> :
                    <ContactForm customerData={customer} submitAction={handleCustomerCreation}/>}
                {/*<CompanyDetails submitAction={handleCompanyCreation}></CompanyDetails>*/}
                {/*<ContactForm submitAction={handleCustomerCreation}></ContactForm>*/}

            </div>
        </>
    )


}
