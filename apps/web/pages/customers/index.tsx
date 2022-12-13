import {
    Customer,
    customerControllerRemove,
    customerControllerUpdate,
    useCustomerControllerFindAll
} from "../../../../libs/SDK";
import Router from "next/router";
import SideBar from "../../components/Sidebar/SideBar";
import TopBar from "../../components/TopBar";

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

    const editCustomer = async (id: string, data: Customer) => {
        await customerControllerUpdate(id, data)
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

            <div className="flex">

                <SideBar/>

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
                            <th className='px-4 py-2 text-sm font-medium text-gray-600'>Name</th>
                            <th className='px-4 py-2 text-sm font-medium text-gray-600'>Address</th>
                            <th className='px-4 py-2 text-sm font-medium text-gray-600'>City</th>
                            <th className='px-4 py-2 text-sm font-medium text-gray-600'>Country</th>
                            <th className='px-4 py-2 text-sm font-medium text-gray-600'>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}
                                className='hover:bg-gray-100'>
                                <td className='px-4 py-2 text-sm font-medium text-gray-600'>{customer.email}</td>
                                <td className='px-4 py-2 text-sm font-medium text-gray-600'>{customer.email}</td>
                                <td className='px-4 py-2 text-sm font-medium text-gray-600'>{customer.email}</td>
                                <td className='px-4 py-2 text-sm font-medium text-gray-600'>{customer.email}</td>
                                <td className='flex justify-center'>
                                    <button
                                        className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                        onClick={() => Router.push(`/customers/${customer.id}`)}>Edit
                                    </button>
                                    <button
                                        className='px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600'
                                        onClick={() => deleteCustomer(customer.id.toString())}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
        ;

}
