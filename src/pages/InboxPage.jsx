import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AllConversation from "../components/chat/AllConversation";
import ChatBox from "../components/chat/ChatBox";

const InboxPage = () => {
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "ADMIN";
  const sectionRef = useRef(null);
  const [offSetTop, setOffSetTop] = useState(0);
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
        className={`${isAdmin ? "" : "mx-auto max-w-[800px]"} flex h-full justify-center rounded-lg border shadow-md`}
      >
        {isAdmin && (
          <div className="hidden w-1/3 overflow-hidden rounded-tl-lg border-r md:block">
            <AllConversation />
          </div>
        )}
        <div className={`${isAdmin ? "w-full md:w-2/3" : "w-full"}`}>
          <ChatBox />
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
