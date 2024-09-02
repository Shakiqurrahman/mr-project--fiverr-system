import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";

const ProfileLayout = () => {
  const { userName } = useParams();
  const { data: usersData, refetch } = useFetchAllUsersQuery();
  const user = usersData?.find(
    (user) =>
      user.userName.toLowerCase().trim() === userName.toLowerCase().trim(),
  );

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  return user ? (
    <Profile user={user} slug={userName} />
  ) : (
    <ErrorPage message="User not found." />
  );
};

export default ProfileLayout;
