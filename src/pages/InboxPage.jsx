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
    if (sectionRef.current) {
      setOffSetTop(sectionRef.current.offsetTop);
      window.addEventListener("resize", () => {
        setOffSetTop(sectionRef.current.offsetTop);
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-width py-10"
      style={{ height: `calc(100vh - ${offSetTop}px)` }}
    >
      <div
        className={`${isAdmin ? "" : "mx-auto max-w-[600px]"} flex h-full justify-center rounded-lg border shadow-md`}
      >
        {isAdmin && (
          <div className="w-1/3 rounded-tl-lg overflow-hidden">
            <AllConversation />
          </div>
        )}
        <div className={`${isAdmin ? "w-2/3" : "w-full"}`}>
          <ChatBox />
        </div>
      </div>
    </section>
  );
};

export default InboxPage;
