import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AllConversation from "../components/chat/AllConversation";
import ChatBox from "../components/chat/ChatBox";
import { useGetAvailableChatUsersQuery } from "../Redux/api/inboxApiSlice";

const InboxPage = () => {
  const { user } = useSelector((state) => state.user);
  const { conversationUser } = useSelector((state) => state.chat);
  const { data: availableUsers, isLoading } = useGetAvailableChatUsersQuery();

  const isAdmin = user?.role === "ADMIN";
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
          console.error("Error accessing offsetTop:", error);
        }
      } else {
        console.warn("sectionRef.current is null in updateOffsetTop");
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

  return (
    <section
      ref={sectionRef}
      className="max-width py-10"
      style={{ height: `calc(100vh - ${offSetTop}px)` }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : !isLoading && (isAdmin || isAvailableForChat) ? (
        <div
          className={`${isAdmin ? "" : "mx-auto max-w-[800px]"} relative flex h-full justify-center rounded-lg border shadow-md`}
        >
          {isAdmin && (
            <div
              className={`${toggleBtn ? "block bg-white" : "hidden"} absolute left-0 top-0 z-[10] h-[calc(100%_+_2px)] w-full overflow-hidden rounded-lg md:static md:block md:h-full md:w-1/3 md:rounded-bl-none md:rounded-br-none md:rounded-tr-none md:border-r`}
            >
              <AllConversation closeToggle={setToggleBtn} />
            </div>
          )}
          <div className={`${isAdmin ? "w-full md:w-2/3" : "w-full"}`}>
            {!conversationUser && isAdmin ? (
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
