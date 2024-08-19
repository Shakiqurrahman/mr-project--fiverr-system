import defaultImg from "../assets/images/default_user.png";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useFetchData } from "../fetch/useFetch";

function Profile() {
    const [userData, setUserData] = useState({
        fullName: "",
        country: "",
        email: ""
    });

    const fetchDataFromApi = useCallback(async () => {
        const endpoint = `${configApi.api}get-singel-user`;
        const res = await fetchData({ endpoint, token });
        try {

            if (res?.success) {
                const apiData = res.data;

                // Update the form with either API data or fallback to localStorage data
                setForm((prev) => ({
                    ...prev,
                    country: apiData?.country ?? dataFromLocalStorage?.country,
                    email: apiData?.email ?? dataFromLocalStorage?.email,
                    userName: apiData?.userName ?? dataFromLocalStorage?.userName,
                    fullName: apiData?.fullName ?? dataFromLocalStorage?.fullName,
                    address: apiData?.address ?? dataFromLocalStorage?.address,
                    city: apiData?.city ?? dataFromLocalStorage?.city,
                    image: apiData?.image ?? dataFromLocalStorage?.image,
                    industryName: apiData?.industryName ?? dataFromLocalStorage?.industryName,
                    number: apiData?.number ?? dataFromLocalStorage?.number,
                    language: apiData?.language ?? dataFromLocalStorage?.language,
                    description: apiData?.description ?? dataFromLocalStorage?.description,
                }));
            } else {
                toast.error("Profile not updated");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch profile data");
        }
    }, [token, dataFromLocalStorage]);

    // Fetch data when the component mounts or token changes
    useEffect(() => {
        if (token) {
            fetchDataFromApi();
        }
    }, []);



    return (
        <section className="my-20 max-w-[500px] flex flex-col items-center mx-auto rounded-2xl p-10 border shadow-xl">
            <div className="rounded-full border overflow-hidden w-32">
                <img className="w-full" src={defaultImg} alt="user image" />
            </div>
            <h2 className="mt-2 text-xl font-semibold">{userData.fullName}</h2>
            <p className="text-sm mb-1 text-primary">{userData.country}</p>
            <p className="text-[15px] font-medium">Email: {userData.email}</p>
        </section>
    );
}

export default Profile;
