import { useFetchAllUsersQuery } from "../Redux/api/allUserApiSlice";
import Profile from "./Profile";

const ProfileLayout = () => {
  //   const { userName } = useParams();
  const { data: users, isLoading, error } = useFetchAllUsersQuery();
  console.log("datasss", users);

  // if(users.userName === userName){
  //     return <Profile />;
  // } else {
  //     return <ErrorPage />;
  // }
  return <Profile />;
};

export default ProfileLayout;
