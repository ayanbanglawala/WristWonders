import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';
// import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
//   const navigate = useNavigate(); 

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Remove user data from localStorage
      localStorage.removeItem("user");

      // Clear user context
      setAuthUser(null);
      
      toast.success("Logged out successfully!");
      setAuthUser(null);
    //   navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

    

  };

  // Return both loading and logout function
  return { loading, logout };
};

export default useLogout;
