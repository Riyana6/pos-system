import { useState } from "react";
import { login } from "../../https/index";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            email: "",
            password: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(formData);
    }

    const loginMutation = useMutation({
        mutationFn: (reqData) => login(reqData),
        onSuccess: (res) => {
            const { data } = res;
            console.log("Login successful:", data);
            const {_id, name, email, phone, role } = data.data;
            dispatch(setUser({_id, name, email, phone, role }));
            navigate("/");
            // Handle successful login, e.g., redirect or show success message
        },
        onError: (error) => {
            console.error("Login failed:", error);
            enqueueSnackbar(response.data.message, { variant: "error" });
        }
    });
  return (
    <div>
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="w-full mt-6 bg-yellow-400 text-lg py-3 text-gray-900 font-bold">
                Sign In
            </button>
        </form>
    </div>
  );
}