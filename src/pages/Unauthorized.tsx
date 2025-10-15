import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-center px-4">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="mb-6 text-red-500"
      >
        <ShieldAlert size={80} />
      </motion.div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h1>
      <p className="text-gray-500 mb-6 max-w-md">
        Sorry, you don’t have permission to view this page. Please log in with
        the appropriate account or contact an administrator.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="rounded-xl"
        >
          Go Back
        </Button>
        <Button
          onClick={() => navigate("/login")}
          className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
