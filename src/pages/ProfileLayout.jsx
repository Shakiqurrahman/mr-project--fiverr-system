import { useParams } from "react-router-dom";
import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import ErrorPage from "./ErrorPage";
import Profile from "./Profile";

const ProfileLayout = () => {
  const { userName } = useParams();
  const { data: usersData } = useFetchAllUsersQuery();
  console.log(usersData);
  const user = usersData?.find(user => user.userName === userName);

  // Check if the userName exists in the list of usernames
  const userExists = usersData?.some(user => user.userName.toLowerCase().trim() === userName.toLowerCase().trim() );

  return userExists ? <Profile user={user} slug={userName}/> : <ErrorPage />;
};

export default ProfileLayout;
