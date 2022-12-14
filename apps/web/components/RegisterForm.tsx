import {authControllerRegister} from "../../../libs/SDK";
import {FormEvent, useState} from "react";
import {useRouter} from "next/router";

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await authControllerRegister({email, password})
            router.push('/')
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="w-1/3 p-8 bg-white border rounded shadow">
                <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-xs italic text-red-500">{error}</p>}
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>

                <hr className="mb-6 border-t"/>
                <div className="text-center">
                    <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="/login"
                    >
                        Already have an account? Login here.
                    </a>
                </div>

            </form>
        </div>
    )
}
