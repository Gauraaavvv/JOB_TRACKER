import React from "react"

function RegisterForm() {
    const [form, setForm] = React.useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            const data = await res.json();
            console.log(data)
            if (res.ok) {
                localStorage.setItem("token", data.token);
                alert("Account created successfully!");
            } else {
                alert("Registration failed: " + data.message);
            }
        } catch (err) {
            alert("Network error: " + err.message)
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-88 bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl shadow-black/60 animate-vibrate"
        >
            <h2 className="text-xl font-bold text-center text-blue-400 mb-2">
                Create Account
            </h2>
            <div>
                <label className="block text-center text-xs font-semibold tracking-wide text-slate-300 mb-1.5">
                    Full Name
                </label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Gaurav Sharma"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-center focus:outline-none focus:border-blue-500 text-sm transition-all"
                />
            </div>
            <div>
                <label className="block text-center text-xs font-semibold tracking-wide text-slate-300 mb-1.5">
                    Email Address
                </label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-center focus:outline-none focus:border-blue-500 text-sm transition-all"
                />
            </div>
            <div>
                <label className="block text-center text-xs font-semibold tracking-wide text-slate-300 mb-1.5">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white text-center focus:outline-none focus:border-blue-500 text-sm transition-all"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold p-2.5 rounded-lg transition-all text-sm mt-2 shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95"
            >
                Register
            </button>
        </form>
    )
}
export default RegisterForm