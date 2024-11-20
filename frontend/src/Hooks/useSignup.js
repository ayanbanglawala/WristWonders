import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const signup = async ({ fName, lName, phone, email, password, cPassword }) => {
        const success = handleaInputError({ fName, lName, phone, email, password, cPassword })
        if (!success) {
            return
        }
        setLoading(true);
        try {
            console.log("HELL");
            
            // Perform server-side validation and API call to signup user
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fName, lName, phone, email, password, cPassword }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                toast.success("Signup successful!")
                navigate("/")
            } else {
                toast.error(data.message || "Signup failed!");
            }
            if (data.error) {
                throw new Error(data.error) // rethrow the error for other error handling
            }
            localStorage.setItem("user", JSON.stringify(data))
            setAuthUser(data);
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, signup}
}

export default useSignup

function handleaInputError({ fName, lName, phone, email, password, cPassword }) {
    if (!fName || !lName || !phone || !email || !password || !cPassword ) {
        toast.error("All fields are required!");
        return false;
    }
    if (password !== cPassword) {
        toast.error("Passwords do not match!");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return false;
    }
    return true;
}