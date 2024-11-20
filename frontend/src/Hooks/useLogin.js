import React, { useState } from 'react'
import { useAuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [loading, setLoading] = useState();
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    const login = async ({email, password}) => {
        const success = handleaInputError(email, password)
        if (!success) {
            return
        }
        setLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            
            if (response.ok) {
                toast.success("Login successful!");
                localStorage.setItem("user", JSON.stringify(data))
                setAuthUser(data)
                navigate("/");
            }
            else{
                toast.error(data.message || "Login failed!");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login};
}

export default useLogin

function handleaInputError(email, password) {
    if (!email || !password) {
        toast.error("All fields are required!");
        return false;
    }
    return true;
}