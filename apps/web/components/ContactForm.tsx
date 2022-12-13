import {useState} from "react";
import {Customer} from "../../../libs/SDK";

export default function ContactForm({
                                        customerData,
                                        submitAction,
                                    }: {
    customerData?: Customer,
    submitAction: (customer: Customer) => void
}) {

    const [contactPhone, setContactPhone] = useState(customerData?.phone ?? "");
    const [contactEmail, setContactEmail] = useState(customerData?.email ?? "");
    const [contactFirstName, setContactFirstName] = useState(customerData?.firstname ?? "");
    const [contactLastName, setContactLastName] = useState(customerData?.lastname ?? "");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        submitAction({
            phone: contactPhone,
            email: contactEmail,
            firstname: contactFirstName,
            lastname: contactLastName,
            company: null,
            id: null
        })
        // await customerControllerCreate(
        //     {
        //         phone: contactPhone,
        //         email: contactEmail,
        //         firstname: contactFirstName,
        //         lastname: contactLastName,
        //         company: null,
        //         id: null
        //
        //     })
    }

    return (
        <form onSubmit={handleSubmit} className="w-2/3 p-8 bg-white border rounded shadow">
            <h1 className="text-3xl font-bold mb-6 text-center">Contact details</h1>
            <div className="grid grid-cols-2 gap-4">
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
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        First name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="contactFirstName"
                        type="text"
                        placeholder="First name"
                        value={contactFirstName}
                        onChange={(e) => setContactFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Last name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="contactLastName"
                        type="text"
                        placeholder="Last name"
                        value={contactLastName}
                        onChange={(e) => setContactLastName(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                {contactFirstName == '' ||
                contactEmail == '' ||
                contactPhone == '' ||
                contactLastName == ''
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

    )
}
