import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

const HelpdeskBtn = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-4 right-4 bg-gradient-to-r from-[#6499E9] to-[#A6F6FF] text-white rounded-full shadow-2xl flex items-center justify-center w-12 h-12 hover:scale-110 transition-all duration-300"
      title="Help Desk"
    >
      <HelpCircle size={36} className="text-white" />
    </Link>
  );
};

export default HelpdeskBtn;