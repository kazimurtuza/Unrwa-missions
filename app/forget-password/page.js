"use client";
import axiosClient from "@/app/axiosClient";
import { setCookie } from 'cookies-next';
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Changed from 'next/navigation' to 'next/router'
import { useEffect, useState } from "react";

function Login() {
    const router = useRouter();
    const [settings, setSettings] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get('settings');
                console.log(data);
                setSettings(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const submitForm = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setErrorMessage('');

        const info = {
            email: email
        };

        try {
            const response = await axiosClient.post("forget-password", info);

            console.log(response.data);

            // if (data.status === 422) {
            //     setErrorMessage('Invalid Credentials');
            // }
            if (response.data.code) {
                setSuccessMessage(response.data.result);
                setCookie("forgetPasswordEmail",email);
                router.push('/forget-password/email-verify', { scroll: false });
            } else {
                setErrorMessage(response.data.error);
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
            <main className="user-page">
                    <div className='px-4 sm:px-6 lg:px-8 w-full'>
                        <div className='font-sans antialiased bg-grey-lightest'>
                            {/* Content */}
                            <div className='w-full bg-grey-lightest min-h-screen flex items-center justify-center py-16'>
                                <div className='container max-w-[650px] px-2 sm:px-4 mx-auto'>
                                <a href='/' className='max-w-[120px] mx-auto mb-2.5 block'>
                                {settings.app_logo && (
                                    <Image
                                    src={
                                        '/'+settings.app_logo
                                    }

                                    blurDataURL={
                                        '/'+settings.app_logo
                                    }

                                    width={307}
                                    height={221}
                                    alt='Image'
                                    placeholder="blur"
                                    className='cursor-pointer object-cover mx-auto my-5 w-80'
                                />
                                )}
                                </a>
                                    <div className='mx-auto bg-white rounded-xl shadow'>
                                        <div className='px-8 py-10'>
                                            <h2 className='text-[24px] sm:text-[28px] text-grey-darker' style={{marginBottom: '30px'}}>
                                            <span style={{fontWeight: '700', display: 'block'}}>Forgot Password</span>
                                            <span style={{fontSize: '60%', display: 'block'}}>Please enter your email address</span>
                                        </h2>
                                            {successMessage && (
                                                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
                                                    <strong className="font-bold">Success!</strong>
                                                    <span className="block sm:inline">{successMessage}</span>
                                                </div>
                                            )}
                                            {errorMessage && (
                                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                                                    <strong className="font-bold">Error!</strong>
                                                    <span className="block sm:inline">{errorMessage}</span>
                                                </div>
                                            )}
                                            <form onSubmit={submitForm}>
                                                <div className='mb-4'>
                                                    <label className='block text-grey-darker text-sm font-bold mb-2' htmlFor='email-address'>
                                                        Email Address
                                                    </label>
                                                    <input
                                                        className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                        id='email'
                                                        type='email'
                                                        placeholder='Your email address'
                                                        value={email}
                                                        onChange={e => setEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div className='flex items-center justify-between mt-8'>
                                                    <button className='bg-main duration-300 leading-normal transition hover:opacity-80 text-white font-bold py-3 px-7 rounded' type="submit">
                                                        Send Email
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;
