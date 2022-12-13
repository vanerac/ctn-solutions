import {useRouter} from "next/router";
import {useCustomerControllerFindOne} from "../../../../../libs/SDK";
import TopBar from "../../../components/TopBar";
import SideBar from "../../../components/Sidebar/SideBar";
import Link from "next/link";

export default function CustomerPage() {
    const router = useRouter()
    const {id} = router.query

    const {data, error} = useCustomerControllerFindOne(id as string)


    if (error) {
        return <div>failed to load</div>
    }

    if (!data) {
        return <div>loading...</div>
    }


    // Card with customer details
    // Add a button to edit the customer
    // Add a button to delete the customer
    return (
        <div>
            <TopBar/>
            <div className="flex flex-row">
                <SideBar/>

                <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl font-bold">Customer {data.email}</h1>
                        <div className="flex flex-row">
                            <Link href={`/customers/${data.id}/edit`}>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Edit
                                </button>
                            </Link>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}
