import axios from "axios";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import {
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaSpinner,
  FaTiktok,
  FaTumblr,
  FaTwitter,
  FaYelp,
  FaYoutube,
} from "react-icons/fa";
// import nextDoorIcon from "../assets/images/nextdoor_icon.png";
import { LiaEditSolid } from "react-icons/lia";
import { PiNotionLogoBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../Redux/features/userSlice";
import defaultImg from "../assets/images/default_user.png";
import ActiveProjects from "../components/customer-profile/ActiveProjects";
import AllReviews from "../components/customer-profile/AllReviews";
import CompletedProjects from "../components/customer-profile/CompletedProjects";
import { configApi } from "../libs/configApi";

function Profile({ user = {}, slug }) {
  const dispatch = useDispatch();
  const { user: loggedUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'completed'
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showDesqEdit, setShowDesqEdit] = useState(false);
  const [description, setDescription] = useState(user?.description || "");
  useEffect(() => {
    // Update the state when the user prop changes
    setDescription(user?.description || "");
  }, [user]);

  // for user creating date making readable and formatted
  const date = new Date(user?.createdAt);
  const options = { year: "numeric", month: "long" };
  const monthYear = date.toLocaleDateString("en-US", options);

  const handleDesqEdit = () => {
    setShowDesqEdit(true);
  };

  const handleSave = async () => {
    if (user.description !== description) {
      try {
        setLoading(true);
        const { data } = await axios.post(`${configApi.api}update-user`, {
          email: user.email,
          description,
        });
        dispatch(setUser({ user: data.data }));
        setShowDesqEdit(false);
        setLoading(false);
      } catch (error) {
        console.error("Error updating description:", error);
      }
    } else {
      setShowDesqEdit(false);
    }
  };

  const handleCancel = () => {
    setShowDesqEdit(false);
    setDescription(user?.description || "");
  };

  console.log(user);

  const {
    facebook,
    instagram,
    twitter,
    google,
    linkedin,
    yelp,
    thumblr,
    youtube,
    nextdoor,
    pinterest,
    tiktok,
  } = user.SocialMediaLinks || {};

  return (
    <section className="max-width mt-10 flex flex-col gap-10 md:flex-row lg:gap-16">
      <div className="min-w-[260px] md:w-1/4">
        <div className="relative border border-gray-300 bg-[#edf7fd] p-4 py-6">
          <BsInfoCircle className="absolute right-4 top-4 text-base text-gray-500" />
          <div className="pb-4">
            <div className="relative mx-auto size-32 rounded-full border border-gray-300">
              <img
                className="h-full w-full rounded-full object-cover"
                src={user?.image ? user.image : defaultImg}
                alt="user image"
              />
              <span
                className={`absolute bottom-1.5 right-4 size-4 rounded-full border border-white bg-primary ${!isOnline && "hidden"}`}
              ></span>
            </div>
            <h2 className="mt-3 text-center text-lg font-semibold sm:text-xl">
              {user?.userName}
            </h2>
          </div>

          <div className="space-y-3 border-y border-gray-300 py-4">
            <div className="flex justify-between gap-1 text-sm">
              <span>From</span>
              <p className="font-semibold">{user?.country}</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Member Since</span>
              <p className="font-semibold">{monthYear}</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Language</span>
              <p className="font-semibold">{user?.language}</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Last Visited</span>
              <p className="font-semibold">Online</p>
            </div>
          </div>

          <div className="space-y-3 border-b border-gray-300 py-4">
            <div className="flex justify-between gap-1 text-sm">
              <span>Completed Projects</span>
              <p className="font-semibold">13</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Project Completion Rate</span>
              <p className="font-semibold">100%</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Avg. Rating Taken</span>
              <p className="font-semibold">4.9 Stars</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Avg. Rating Given</span>
              <p className="font-semibold">5 Stars</p>
            </div>
            <div className="flex justify-between gap-1 text-sm">
              <span>Last Project on</span>
              <p className="font-semibold">May 27, 2024</p>
            </div>
          </div>

          {/* social medias icons  */}
          <div className="relative">
            <p className="mb-4 pt-4 text-center">Social Media Links</p>
            {slug === loggedUser?.userName && (
              <Link className="absolute right-0 top-4" to="/social-media">
                <LiaEditSolid className="size-6 cursor-pointer text-xl" />
              </Link>
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 pb-4">
              {facebook && (
                <Link
                  to={facebook}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaFacebookF />
                </Link>
              )}

              {instagram && (
                <Link
                  to={instagram}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaInstagram />
                </Link>
              )}

              {twitter && (
                <Link
                  to={twitter}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaTwitter />
                </Link>
              )}

              {pinterest && (
                <Link
                  to={pinterest}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaPinterestP />
                </Link>
              )}

              {linkedin && (
                <Link
                  to={linkedin}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaLinkedinIn />
                </Link>
              )}
              {google && (
                <Link
                  to={google}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaGoogle />
                </Link>
              )}
              {thumblr && (
                <Link
                  to={thumblr}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaTumblr />
                </Link>
              )}
              {youtube && (
                <Link
                  to={youtube}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaYoutube />
                </Link>
              )}
              {tiktok && (
                <Link
                  to={tiktok}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaTiktok />
                </Link>
              )}
              {yelp && (
                <Link
                  to={yelp}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  <FaYelp />
                </Link>
              )}
              {nextdoor && (
                <Link
                  to={nextdoor}
                  target="_blank"
                  className="rounded-full border border-gray-400 bg-transparent p-2 text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  {/* <img
                    src={nextDoorIcon}
                    alt="Nextdoor"
                    className="size-5 flex-shrink- rounded-full"
                  /> */}
                  <PiNotionLogoBold />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* description  */}
        <div className="mt-6 border border-gray-300 bg-[#edf7fd] p-4 py-6">
          <div className="flex items-center justify-between gap-1 pb-3">
            <h2 className="text-base font-bold sm:text-lg">Description</h2>
            {!showDesqEdit && slug === loggedUser?.userName && (
              <LiaEditSolid
                onClick={handleDesqEdit}
                className="size-6 cursor-pointer text-xl"
              />
            )}
          </div>
          <div>
            {!showDesqEdit ? (
              <p className="border-t border-gray-300 pt-4 text-[15px] font-medium leading-relaxed">
                {description}
              </p>
            ) : (
              <p
                contentEditable
                suppressContentEditableWarning
                className="border border-gray-300 bg-white p-4 text-[15px] font-medium leading-relaxed outline-none"
                onBlur={(e) => setDescription(e.target.innerText)}
              >
                {description}
              </p>
            )}
          </div>
          {showDesqEdit && (
            <div className="flex gap-4">
              <button
                className="mt-4 w-full border border-primary bg-transparent px-4 py-2 font-semibold text-primary"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="mt-4 flex w-full items-center justify-center bg-primary px-4 py-2 font-semibold text-white"
                onClick={handleSave}
              >
                {loading ? (
                  <span className="animate-spin text-xl">
                    <FaSpinner />
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* projects  */}
      <div className="flex-1">
        <div className="flex justify-around gap-4">
          <h2
            className={`cursor-pointer text-lg font-semibold sm:text-xl ${
              activeTab === "active" && "text-primary underline"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Active Projects (4)
          </h2>
          <h2
            className={`cursor-pointer text-lg font-semibold sm:text-xl ${
              activeTab === "completed" && "text-primary underline"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Projects (13)
          </h2>
        </div>
        {/* activeProject */}
        {activeTab === "active" && <ActiveProjects />}
        {/* completedProjects */}
        {activeTab === "completed" && <CompletedProjects />}
        {/* All Reviews  */}
        <AllReviews />
      </div>
    </section>
  );
}

export default Profile;
