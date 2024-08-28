import { useParams } from "react-router-dom";
import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import Profile from "./Profile";
import ErrorPage from "./ErrorPage";

const ProfileLayout = () => {
  const { userName } = useParams();
  const { data: usersData } = useFetchAllUsersQuery();
  console.log(usersData);

  /**
   *** TODO: If you wanna get all users data by searching their username, you have to make profile page dynamic... 
   **/
  

  // Check if the userName exists in the list of usernames
  const userExists = usersData?.some(user => user.userName === userName);

  return userExists ? <Profile /> : <ErrorPage />;
};

export default ProfileLayout;
