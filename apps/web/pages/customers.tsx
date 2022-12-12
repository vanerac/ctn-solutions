import {
    Customer,
    customerControllerRemove,
    customerControllerUpdate,
    useCustomerControllerFindAll
} from "../../../libs/SDK";

export default function Customers() {
    // Tbale that displays all customers
    // Add a button to create a new customer: CompanyDetails component
    // Add buttons next to each row to edit and delete a customer
    // Use SWR to fetch the data

    // const dispatch = useAuthDispatch();
    // const [customers, setCustomers] = useState<Customer[]>();
    const {data: customers, error, mutate} = useCustomerControllerFindAll(
        // TODO: Error redirection on token expiration
        // {swr: {onError: (err) => console.log(err)}}
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

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-700">Customers</h1>
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th className="px-4 py-2">id</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">company</th>
                    <th className="px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer: Customer) => (
                    <tr key={customer.id}>
                        <td className="border px-4 py-2">{customer.id}</td>
                        <td className="border px-4 py-2">{customer.email}</td>
                        <td className="border px-4 py-2">{customer.company}</td>
                        <td className="border px-4 py-2">
                            <button className="px-2 py-1 bg-blue-500 text-white rounded"
                                    onClick={() => editCustomer(customer.id.toString(), customer)}>Edit
                            </button>
                            <button className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => deleteCustomer(customer.id.toString())}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )

}
