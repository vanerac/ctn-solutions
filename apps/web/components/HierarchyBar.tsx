import Link from "next/link";
import Router from "next/router";

export default function HierarchyBar({
                                         items
                                     }: {
    items: Array<{
        name: string,
        href?: string | null
    }>
}) {

    const previous = items.slice(0, -1);

    return (
        <span className="m-3">
            {items.length > 1 ? <button
                onClick={() => Router.push(previous[previous.length - 1].href as any)}

                className="mr-5 underline mr-2 text-blue-500 hover:underline hover:text-blue-500"
            >Back
            </button> : null}

            {items.map((item, index) => (
                <span key={index}>
                    <span>/ </span>
                    {item.href ? (
                        <Link
                            href={item.href}
                            className="underline mr-2 text-blue-500 hover:underline hover:text-blue-500"
                        >{item.name}</Link>) : (
                        <span
                            className="mr-2 text-gray-500"
                        >{item.name}</span>
                    )}

                </span>
            ))}
        </span>
    )


}
