import {useEstimateControllerFindAll} from "../../../../libs/SDK";
import Router from "next/router";
import TopBar from "../../components/TopBar";
import SideBar from "../../components/Sidebar/SideBar";
import HierarchyBar from "../../components/HierarchyBar";

export default function Estimate() {

    const {data: estimates, error, mutate} = useEstimateControllerFindAll({
        swr: {
            onError: (err) => {
                if (err?.response?.status === 401) {
                    Router.push('/login');
                }
            }
        }
    })

    if (error) return <div>failed to load</div>
    if (!estimates) return <div>loading...</div>

    return (
        <>
            <TopBar/>

            <div className="flex flex-row">

                <SideBar/>
                <div className="flex flex-col w-3/4">
                    <div className="flex flex-col">
                        <HierarchyBar items={[
                            {href: "/", name: "Home"},
                            {href: null, name: "Estimates"}]}/>
                    </div>
                    <div className='container w-3/4 mx-auto my-10 bg-white rounded-lg shadow-lg'>
                        <h1 className='text-3xl text-center my-5'>Estimates</h1>
                        <div className='flex justify-end px-5 py-3 border-b border-gray-200'>
                            <button
                                className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                onClick={() => Router.push('/estimate/new')}>New Estimate
                            </button>
                        </div>
                        <table className='w-full table-auto'>
                            <thead className='bg-gray-100'>
                            <tr>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Title</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Value</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Status</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Date</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Due Date</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Customer</th>
                                <th className='px-4 py-2 text-sm font-medium text-gray-600'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {estimates.map((estimate) => (
                                <tr key={estimate.id}>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{estimate.title}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{estimate?.items?.reduce(
                                        (acc, curr) => acc + (curr.quantity * curr.unitPrice), 0)}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{estimate.status}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(estimate.date).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{new Date(estimate.dueDate).toDateString()}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>{estimate.customer.id}</td>
                                    <td className='px-4 py-2 text-sm text-gray-600'>
                                        <button
                                            className='px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600'
                                            onClick={() => Router.push(`/estimate/${estimate.id}`)}>View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </>)

}
