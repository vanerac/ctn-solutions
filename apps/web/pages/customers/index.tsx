import {customerControllerRemove, useCustomerControllerFindAll} from "../../../../libs/SDK";
import Router from "next/router";
import SideBar from "../../components/Sidebar/SideBar";
import TopBar from "../../components/TopBar";
import HierarchyBar from "../../components/HierarchyBar";

export default function Customers() {
    // Tbale that displays all customers
    // Add a button to create a new customer: CompanyDetails component
    // Add buttons next to each row to edit and delete a customer
    // Use SWR to fetch the data

    // const dispatch = useAuthDispatch();
    // const [customers, setCustomers] = useState<Customer[]>();
    const {data: customers, error, mutate} = useCustomerControllerFindAll(
        // TODO: Error redirection on token expiration
        {
            swr: {
                onError: (err) => {
                    if (err?.response?.status === 401) {
                        Router.push('/login');
                    }
                }
            }
        }
    );

    if (error) return <div>failed to load</div>
    if (!customers) return <div>loading...</div>

    console.log(customers);


    const deleteCustomer = async (id: string) => {

        await customerControllerRemove(id);
        // setCustomers(customers?.filter((customer) => customer.id !== +id));
        await mutate();
    }

    // Use tailwind to style the table
    // Same style as the products table

    // Parent div is a container, it should fill 75% of the screen width, but should be responsive
    // Table should be responsive as well
    // Parent div should have a light border radius and a light drop shadow
    // There should be a border color around the container and the table

    // Cable contains rows that, when hovered, slightly stand out
    // Each row contains 4 columns: Name, Address, City, Country
    // Each row contains 2 buttons: Edit, Delete
    // Edit button should open a modal with the CompanyDetails component
    // Delete button should delete the customer from the database

    // Add a button to create a new customer: CompanyDetails component
    // Button is above the table, and should be aligned to the right


    return (
        // Div that horizonally aligns the sidebar and the table
        <>
            <TopBar/>

            <div className="flex flex-row">

                <SideBar/>
                <div className="flex flex-col w-3/4">
                    <div className="flex flex-col">
                        <HierarchyBar items={[
                            {href: "/", name: "Home"},
                            {href: null, name: "Customers"}]}/>
                    </div>


                    <div className='container w-3/4 mx-auto my-10 bg-white rounded-lg shadow-lg'>
                        <h1 className='text-3xl text-center my-5'>Customers</h1>

                        <div className='flex justify-end px-5 py-3 border-b border-gray-200'>
                            <button
                                className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                onClick={() => Router.push('/customers/new')}>New customer
                            </button>
                        </div>
                        <table className='w-full table-auto'>
                            <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Firstname</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Lastname</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Email</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Phone</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Company ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}
                                    className='hover:bg-gray-100'>
                                    <td className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>{customer.firstname}</td>
                                    <td className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>{customer.lastname}</td>
                                    <td className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>{customer.email}</td>
                                    <td className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>{customer.phone}</td>
                                    <td className='px-4 py-2 text-sm font-medium text-gray-600 text-center'>{customer.company?.legalname}</td>
                                    <td className='flex justify-center'>
                                        <button
                                            className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                            onClick={() => Router.push(`/customers/${customer.id}`)}>View
                                        </button>
                                        <button
                                            className='px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600'
                                            onClick={() => deleteCustomer(String(customer?.id))}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    )
        ;

}
