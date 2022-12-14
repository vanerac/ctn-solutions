export default function Breakdown({
                                      total,
                                      discount,
                                      tax,
                                  }: {
    total: number,
    discount: number,
    tax: number,
}) {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 gap-4 p-8 bg-white border rounded shadow">
                <div className="flex justify-between">
                    <div className="text-gray-700">Total</div>
                    <div className="text-gray-700">{total.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-gray-700">Discount</div>
                    <div className="text-gray-700 text-green-500">- {discount?.toFixed(2)}</div>
                </div>

                <div className="flex justify-between">
                    <div className="text-gray-700">Tax</div>
                    {/* Red text*/}
                    <div className="text-gray-700 text-red-500">+ {tax?.toFixed(2)}</div>
                </div>
                {/* Underline, bold and bigger text*/}
                <div className="flex justify-between">
                    <div className="text-gray-700 text-lg font-bold">Grand Total</div>
                    <div className="text-gray-700 text-lg font-bold">{((total - discount) + tax).toFixed(2)}</div>
                </div>

            </div>
        </div>
    )
}
