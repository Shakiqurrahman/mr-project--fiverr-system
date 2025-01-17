import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetAvailableChatUsersQuery } from "../Redux/api/inboxApiSlice";
import { setOnlineUsers } from "../Redux/features/userSlice";
import loading from "../assets/svg/loading.gif";
import AllConversation from "../components/chat/AllConversation";
import ChatBox from "../components/chat/ChatBox";
import { configApi } from "../libs/configApi";
import { connectSocket } from "../libs/socketService";

const InboxPage = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.user);
  const { conversationUser } = useSelector((state) => state.chat);
  const { data: availableUsers, isLoading } = useGetAvailableChatUsersQuery();

  const isAuthorized = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(
    user?.role,
  );
  const sectionRef = useRef(null);
  const [offSetTop, setOffSetTop] = useState(0);
  const [toggleBtn, setToggleBtn] = useState(true);

  const isAvailableForChat = availableUsers?.some(
    (availableUser) => availableUser?.id === user?.id,
  );

  useEffect(() => {
    // Function to update offsetTop
    const updateOffsetTop = () => {
      if (sectionRef.current) {
        try {
          setOffSetTop(sectionRef.current.offsetTop);
        } catch (error) {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("Something went wrong!");
      }
    };

    // Update offsetTop when component mounts
    updateOffsetTop();

    // Add resize event listener
    window.addEventListener("resize", updateOffsetTop);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateOffsetTop);
    };
  }, []);

  const socket = connectSocket(`${configApi.socket}`, token);
  // all avaliable users
  useEffect(() => {
    socket?.emit("view-online-users");
    socket?.on("online-users", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [socket, dispatch]);

  return (
    <section
      ref={sectionRef}
      className="max-width py-5"
      style={{ height: `calc(100vh - ${offSetTop}px)` }}
    >
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <img src={loading} alt="" />
        </div>
      ) : !isLoading && (isAuthorized || isAvailableForChat) ? (
        <div
          className={`${isAuthorized ? "" : "mx-auto max-w-[800px]"} relative flex h-full justify-center rounded-lg border shadow-md`}
        >
          {isAuthorized && (
            <div
              className={`${toggleBtn ? "block bg-white" : "hidden"} absolute left-0 top-0 z-[10] h-full w-full overflow-hidden rounded-lg md:static md:block md:w-1/3 md:rounded-bl-none md:rounded-br-none md:rounded-tr-none md:border-r`}
            >
              <AllConversation closeToggle={setToggleBtn} />
            </div>
          )}
          <div className={`${isAuthorized ? "w-full md:w-2/3" : "w-full"}`}>
            {!conversationUser && isAuthorized ? (
              <div className="flex h-full items-center justify-center">
                <div className="space-y-1 text-center">
                  <p className="uppercase tracking-[10px]">Welcome To</p>
                  <h1 className="text-3xl font-bold uppercase text-primary">
                    MR Project
                  </h1>
                </div>
              </div>
            ) : (
              <ChatBox openToggle={setToggleBtn} />
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-orange-600/5 p-4 sm:p-10 sm:py-14">
          <div className="mx-auto max-w-[800px]">
            <p className="text-center font-medium sm:text-lg">
              &quot; Before you send your message, please take a moment to{" "}
              <span className="text-nowrap rounded-lg bg-orange-600/15 px-2 py-1 font-semibold leading-loose">
                submit the contact form.
              </span>{" "}
              This ensures we have the details we need to get back to you.
              &quot;
            </p>
            <p className="group mt-8 text-center sm:text-lg">
              Ready to connect with us?
              <Link
                to="/contact"
                className="text-primary group-hover:underline"
              >
                {" "}
                Click here{" "}
              </Link>
              to visit our contact page!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default InboxPage;
