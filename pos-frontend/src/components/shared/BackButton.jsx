import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="bg-[#025cca] p-3 font-bold rounded-full text-white text-xl"
        >
            <IoArrowBackOutline />
        </button>
    );
}