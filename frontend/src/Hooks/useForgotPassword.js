import React, { useState } from 'react';
import toast from 'react-hot-toast';

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const forgotPassword = async ({ email, password, cPassword }) => {
        setLoading(true);

        try {
            const response = await fetch('/api/auth/forgotpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, cPassword }),
            });

            const data = await response.json();

            if (!response.ok || !data) {
                toast.error("Password isn't changed!");
                return;
            }

            toast.success('Password reset link sent to your email');
        } catch (error) {
            console.error(error);
            toast.error("Password isn't changed!");
        } finally {
            setLoading(false);
        }
    };

    return { loading, forgotPassword };
};

export default useForgotPassword;
