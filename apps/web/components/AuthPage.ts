// Next.js
// Wrapped component that verifies that the user is logged in before rendering the wrapped component
// If the user is not logged in, they are redirected to the login page
// If the user is logged in, the wrapped component is rendered

import Router from "next/router";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

// get token from cookies

// if token is not present, redirect to login page

// @ts-ignore
export default function AuthPage({children}) {

    const [cookie, $setCookie] = useCookies(['token']);

    useEffect(() => {
        if (!cookie.token) {
            Router.push('/login');
        }
    })

    // if (!cookie.token) {
    //     Router.push('/login');
    //     return null;
    // }

    return children;
}
