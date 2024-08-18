import defaultImg from "../assets/images/default_user.png";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { func } from "./function";

function Profile() {
    // const [userData, setUserData] = useState(null);
    // console.log(userData);

    // useEffect(() => {
    //     const token = Cookies.get('authToken');
    //     if (token) {
    //         try {
    //             const parsedToken = JSON.parse(token);
    //             setUserData(parsedToken.data?.data); // Assuming your user data is inside `data` in the token
    //         } catch (error) {
    //             console.error('Failed to parse token', error);
    //         }
    //     }
    // }, []);

    // if (!userData) {
    //     return <p>Loading...</p>;
    // }

    useEffect(() => {
            const functionwrapper = async() => await func();
            functionwrapper();
        }, []);

    return (
        <section className="my-20 max-w-[500px] flex flex-col items-center mx-auto rounded-2xl p-10 border shadow-xl">
            <div className="rounded-full border overflow-hidden w-32">
                <img className="w-full" src={defaultImg} alt="user image" />
            </div>
            <h2 className="mt-2 text-xl font-semibold ">John Doe</h2>
            <p className="text-sm mb-1 text-primary">San Francisco, California</p>
            <p className="text-[15px] font-medium">Email: test@gmail.com</p>
        </section>
    );
}

export default Profile;
