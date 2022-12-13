import {useRouter} from "next/router";
import Link from "next/link";
import React from "react";

// @ts-ignore
export default function NavLink({href, children, activeClassName}) {
    const router = useRouter()

    let className = children.props.className || ''
    if (router.pathname === href) {
        className = `${className} ${activeClassName}`
    }

    return <Link href={href}>{React.cloneElement(children, {className})}</Link>

}
