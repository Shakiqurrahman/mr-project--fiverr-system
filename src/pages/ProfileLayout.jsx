import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProfileLayout = () => {
  const { userName } = useParams();
  const { data: usersData, refetch, isLoading } = useFetchAllUsersQuery();
  const user = usersData?.find(
    (user) =>
      user.userName.toLowerCase().trim() === userName.toLowerCase().trim(),
  );

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  return isLoading ? (
    <div className="min-h-[calc(100vh_-_136px)] max-width flex justify-center items-center">
      <AiOutlineLoading3Quarters  className="text-4xl animate-spin"/>
    </div>
  ) : user ? (
    <Profile user={user} slug={userName} />
  ) : (
    <ErrorPage />
  );
};

export default ProfileLayout;
