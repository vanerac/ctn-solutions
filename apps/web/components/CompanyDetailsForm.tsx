import {FormEvent, useState} from "react";
import {Company, companyControllerCreate, companyControllerUpdate} from "../../../libs/SDK";


export default function CompanyDetailsForm({
                                               companyData, submitAction
                                           }: { companyData?: Company, submitAction: (data: Company) => void }) {


    // Company details
    const [companyName, setCompanyName] = useState(companyData?.legalname ?? "");
    const [companyAddress, setCompanyAddress] = useState(companyData?.address ?? "");
    const [companySiret, setCompanySiret] = useState(companyData?.siret ?? "");
    const [companyTaxId, setCompanyTaxId] = useState(companyData?.taxid ?? "");
    const [companyWebsite, setCompanyWebsite] = useState(companyData?.website ?? "");
    const [companyLogo, setCompanyLogo] = useState(companyData?.logo ?? "");
    const [legalForm, setLegalForm] = useState(companyData?.legalform ?? "");
    const [apeCode, setApeCode] = useState(companyData?.ape ?? "");
    const [description, setDescription] = useState(companyData?.description ?? "");
    const [companyCity, setCompanyCity] = useState(companyData?.city ?? "");
    const [companyState, setCompanyState] = useState(companyData?.state ?? "");
    const [companyZip, setCompanyZip] = useState(companyData?.zip ?? "");
    const [companyIndustry, setCompanyIndustry] = useState(companyData?.industry ?? "");


    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        submitAction({
            legalname: companyName,
            address: companyAddress,
            siret: companySiret,
            taxid: companyTaxId,
            website: companyWebsite,
            logo: companyLogo,
            legalform: legalForm,
            ape: apeCode,
            description: description,
            id: companyData?.id as number,
            city: companyCity,
            state: companyState,
            zip: companyZip,
            industry: companyIndustry
        })

        // alert("Company details Saved");

    }

    const createCompany = async () => {

        return await companyControllerCreate(
            {
                id: companyData?.id as number,
                legalname: companyName as string,
                siret: companySiret as string,
                taxid: companyTaxId as string,
                website: companyWebsite as string,
                logo: companyLogo as string,
                legalform: legalForm as string,
                description: description as string,
                address: companyAddress as string,
                state: companyAddress as string,
                ape: apeCode as string,
                city: companyAddress as string,
                zip: companyAddress as string,
                industry: apeCode as string,
            }
        );

    }

    const updateCompany = async () => {
        return await companyControllerUpdate(
            String(companyData?.id),
            {
                legalname: companyName,
                siret: companySiret,
                taxid: companyTaxId,
                website: companyWebsite,
                logo: companyLogo,
                legalform: legalForm,
                description: description,
                address: companyAddress,
                state: companyAddress,
                ape: apeCode,
                city: companyAddress,
                zip: companyAddress,
                industry: apeCode,
            }
        );
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
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyName"
                        type="text"
                        placeholder="Company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companySiret">
                        Company Siret
                    </label>
                    <input
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companySiret"
                        // validate format="### ### ### ####"
                        type="number"
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
                        required={true}
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
                    <select
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                        id="legalForm"
                        value={legalForm}
                        onChange={(e) => setLegalForm(e.target.value)}
                    >
                        <option value={undefined}>Choose Form</option>
                        <option value="SARL">SARL</option>
                        <option value="SAS">SAS</option>
                        <option value="SASU">SASU</option>
                        <option value="EURL">EURL</option>
                        <option value="SA">SA</option>
                        <option value="SNC">SNC</option>
                        <option value="SC">SC</option>
                        <option value="EI">AE</option>
                        <option value="EIU">EIU</option>
                        <option value="EIRL">EIRL</option>
                    </select>


                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="apeCode">
                        APE code
                    </label>
                    <input
                        required={true}
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
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyAddress">
                        Industry
                    </label>
                    <select
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-white"
                        id="industry"
                        value={companyIndustry}
                        onChange={(e) => setCompanyIndustry(e.target.value)}
                    >
                        <option value={undefined}>Choose Industry</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Banking">Banking</option>
                        <option value="Construction">Construction</option>
                        <option value="Education">Education</option>
                        <option value="Energy">Energy</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Finance">Finance</option>
                        <option value="Food">Food</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Media">Media</option>
                        <option value="Mining">Mining</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Retail">Retail</option>
                        <option value="Technology">Technology</option>
                        <option value="Telecommunications">Telecommunications</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Travel">Travel</option>
                    </select>
                    

                </div>
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Address</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyAddress">
                        Address
                    </label>
                    <input
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyAddress"
                        type="text"
                        placeholder="Company address"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyZipCode">
                        Zip code
                    </label>
                    <input
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyZipCode"
                        type="text"
                        placeholder="Company zip code"
                        value={companyZip}
                        onChange={(e) => setCompanyZip(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyCity">
                        City
                    </label>
                    <input
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyCity"
                        type="text"
                        placeholder="Company city"
                        value={companyCity}
                        onChange={(e) => setCompanyCity(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="companyCountry">
                        State
                    </label>
                    <input
                        required={true}
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="companyCountry"
                        type="text"
                        placeholder="Company country"
                        value={companyState}
                        onChange={(e) => setCompanyState(e.target.value)}
                    />
                </div>

            </div>
            <div className="flex justify-center">
                {companyName == '' ||
                companyAddress == '' ||
                companySiret == '' ||
                companyTaxId == '' ||
                legalForm == '' ||
                apeCode == '' ||
                companyZip == '' ||
                companyCity == '' ||
                companyState == ''
                    ? (
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-gray-500 rounded-full hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    )}


            </div>
        </form>


    );
}
