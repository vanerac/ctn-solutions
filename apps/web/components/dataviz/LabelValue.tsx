export default function LabelValue({
                                       data, label
                                   }: {
    data: string | number
    label: string
}) {

    return (
        <div className="flex flex-row">
            <div className="flex flex-col">
                <div className="text-sm">{label}</div>
                <div className="text-2xl font-bold">{data}</div>
            </div>
        </div>
    );

}
