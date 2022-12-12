// Form that lets user fill in the company details.
// Required fields are:
// - Company name
// - Company address
// - Company Siret
// - Company Tax ID
// - Company website
// - Company Logo
// - Legal form
// - Optional fields ares:
// - APE code
// - Description
// In a second section, the user can fill in the company's contact details.
// Required fields are:
// - Company contact name
// - Company contact email
// - Company contact phone number
import {FormEvent, useState} from "react";
import {companyControllerCreate} from "../../../libs/SDK";


export default function CompanyDetails() {
    // Set as a single page form

    // Company details
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companySiret, setCompanySiret] = useState("");
    const [companyTaxId, setCompanyTaxId] = useState("");
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [legalForm, setLegalForm] = useState("");
    const [apeCode, setApeCode] = useState("");
    const [description, setDescription] = useState("");

    // Contact details
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");


    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        await companyControllerCreate(
            {
                email: contactEmail,
                legalname: companyName,
                siret: companySiret,
                taxid: companyTaxId,
                website: companyWebsite,
                logo: companyLogo,
                legalform: legalForm,
                description: description,
                address: companyAddress,
                phone: contactPhone,
                state: companyAddress,
                ape: apeCode,
                city: companyAddress,
                zip: companyAddress,
                industry: apeCode,
            }
        )
        alert("Company created")
    }

    // Use Tailwind CSS to style the form
    // Use same style as login form
    // Slit vertically in two sections
    // First section is company details, on the left
    // Second section is contact details, on the right
    return (
        <form onSubmit={handleSubmit} className="w-2/3 p-8 bg-white border rounded shadow">
            <h1 className="text-3xl font-bold mb-6 text-center">Company details</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyName">
                        Company name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyName"
                        type="text"
                        placeholder="Company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyAddress">
                        Company address
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyAddress"
                        type="text"
                        placeholder="Company address"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companySiret">
                        Company Siret
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companySiret"
                        type="text"
                        placeholder="Company Siret"
                        value={companySiret}
                        onChange={(e) => setCompanySiret(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyTaxId">
                        Company Tax ID
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border
                        rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyTaxId"
                        type="text"
                        placeholder="Company Tax ID"
                        value={companyTaxId}
                        onChange={(e) => setCompanyTaxId(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyWebsite">
                        Company website
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyWebsite"
                        type="text"
                        placeholder="Company website"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyLogo">
                        Company Logo
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyLogo"
                        type="text"
                        placeholder="Company Logo"
                        value={companyLogo}
                        onChange={(e) => setCompanyLogo(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="legalForm">
                        Legal form
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="legalForm"
                        type="text"
                        placeholder="Legal form"
                        value={legalForm}
                        onChange={(e) => setLegalForm(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="apeCode">
                        APE code
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="apeCode"
                        type="text"
                        placeholder="APE code"
                        value={apeCode}
                        onChange={(e) => setApeCode(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                        Description
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">Contact details</h1>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="contactName"
                        type="text"
                        placeholder="Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                        Phone number
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="contactPhone"
                        type="text"
                        placeholder="Phone number"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="contactEmail"
                        type="text"
                        placeholder="Email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-green-400 hover:bg-green-500 focus:outline-none my-6"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </form>


    );
}
