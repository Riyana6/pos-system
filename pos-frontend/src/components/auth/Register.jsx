import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../https/userRequests";
import { enqueueSnackbar } from "notistack";

export default function Register({setIsRegister}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleRoleSelection = (selectedRole) => {
        setFormData({...formData, role: selectedRole});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(formData);
    };

    const registerMutation = useMutation({
        mutationFn: (reqData) => register(reqData),
        onSuccess: (res) => {
            const { data } = res;
            enqueueSnackbar(data.message, { variant: "success" });
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: ""
            });

            setTimeout(() => {
               setIsRegister(false);
            }, 1500);
        },
        onError: (error) => {
            const { response } = error;
            console.error("Register failed:", error);
            enqueueSnackbar(response.data.message, { variant: "error" });
        }
    });
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">
                    Employee Name
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        name="name"
                        placeholder="Enter employee name"
                        className="bg-transparent flex-1 text-white focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                    Employee Email
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter employee email"
                        className="bg-transparent flex-1 text-white focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">
                    Employee Phone
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input
                        type="number"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                        placeholder="Enter employee phone"
                        className="bg-transparent flex-1 text-white focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-[#ababab] mb-2 text-sm font-medium">
                    Password
                </label>
                <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
                    <input
                        type="text"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        placeholder="Enter password"
                        className="bg-transparent flex-1 text-white focus:outline-none"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
                    Choose your role
                </label>

                <div className="flex item-center gap-3 mt-4">
                    {["Waiter", "Cashier", "Admin"].map((role) => (
                        <button
                            key={role}
                            type="button"
                            onClick={() => handleRoleSelection(role)}
                            className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] ${formData.role === role ? "bg-indigo-700" : ""}   `}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            <button type="submit" className="w-full mt-6 bg-yellow-400 text-lg py-3 text-gray-900 font-bold">
                Sign Up
            </button>
        </form>
    </div>
  );
}