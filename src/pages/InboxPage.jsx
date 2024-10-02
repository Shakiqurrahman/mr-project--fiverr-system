import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AllConversation from "../components/chat/AllConversation";
import ChatBox from "../components/chat/ChatBox";

const InboxPage = () => {
  const { user } = useSelector((state) => state.user);
  const { conversationUser } = useSelector((state) => state.chat);
  const isAdmin = user?.role === "ADMIN";
  const sectionRef = useRef(null);
  const [offSetTop, setOffSetTop] = useState(0);
  const [toggleBtn, setToggleBtn] = useState(true);
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
    </section>
  );
};

export default InboxPage;
