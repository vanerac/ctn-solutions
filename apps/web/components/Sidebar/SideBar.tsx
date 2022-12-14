import React from "react";
import NavLink from "./NavLink";
// NavLink
// Path: apps/web/components/NavLink.tsx

export default function SideBar() {
    // Sidebar that turns into a hamburger menu on mobile
    // Sidebar should be responsive
    // Sidebar should have a light border radius and a light drop shadow
    // Sidebar should have a border color around it
    // Sidebar should have a background color
    // Sidebar should have a light border color around each menu item
    // Sidebar should have a light border color around the hamburger menu
    // When a menu item is hovered, it should slightly stand out
    // When a menu item is active, it should have a different background color

    // It should have a button to close the sidebar when it's open on mobile
    // It should have a button to open the sidebar when it's closed on mobile
    // NavLink uses <Link> tags to navigate to the correct page, so no <a> tag should be used in between the <NavLink> tags

    const links = [
        {href: '/', text: 'Dashboard'},
        {href: '/customers', text: 'Customers'},
        {href: '/estimate', text: 'Estimate'},
        // {href: '/orders', text: 'Orders'},
        // {href: '/invoices', text: 'Invoices'},
        // {href: '/payments', text: 'Payments'},
    ];

    return (
        <div className="w-64 drop-shadow-xl">
            <nav>
                {links.map((link) => (
                    <NavLink href={link.href} activeClassName="bg-blue-100">
                        <span
                            className="block py-2 px-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 border rounded-lg">{link.text}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );

}
