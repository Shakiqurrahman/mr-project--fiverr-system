import { Pagination, PaginationItem } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import cashWithdrawal from "../assets/images/icons/cash-withdrawal.png";
import creditCard from "../assets/images/icons/credit-card.png";
import dollerBill from "../assets/images/icons/dollar-bill.png";
import prevBtn from "../assets/images/icons/Left Arrow.svg";
import nextBtn from "../assets/images/icons/Right Arrow.svg";
import PageHeaderWithText from "../components/PageHeaderWithText";

function Affiliate() {
  return (
    <>
      <PageHeaderWithText
        title="Affiliate Program"
        text={
          <p className="mt-5 max-w-[550px] text-center text-sm md:text-xl">
            Join the Mahfujurrahman535 Affiliate Program and earn up to $5 per
            new customer purchase
          </p>
        }
      />
      <div className="max-width flex flex-col-reverse justify-between gap-10 lg:flex-row">
        <div className="mt-6 w-full lg:w-3/4">
          <div className="grid grid-cols-3 gap-3 text-center text-sm sm:text-lg lg:gap-5 lg:text-xl">
            <div className="bg-[#FFEFEF] p-5 text-center">
              <img
                src={dollerBill}
                alt="Money Icon"
                className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
              />
              <p className=":mt-2">Balance</p>
              <p className="font-semibold">$00</p>
            </div>
            <Link className="bg-[#E3E3E3] p-5 text-center">
              <img
                src={creditCard}
                alt="Money Icon"
                className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
              />
              <p className="mt-2">Payment </p>
              <p className="font-semibold">Method</p>
            </Link>
            <Link className="bg-[#DCEEFA] p-5 text-center">
              <img
                src={cashWithdrawal}
                alt="Money Icon"
                className="mx-auto h-[40px] w-[40px] lg:h-[60px] lg:w-[60px]"
              />
              <p className="mt-2 text-center">Withdraw </p>
              <p className="text-center font-semibold">Request</p>
            </Link>
          </div>

          <div className="mt-10">
            <h3 className="text-base font-medium sm:text-xl">
              Affiliate link auto generated
            </h3>
            <div className="mt-3 flex">
              <input
                className="flex-shrink-1 w-full border-[2px] p-2 text-sm outline-none"
                type="text"
                placeholder="https://mahfujurrahman535.com/aff-auto/username/"
              />
              <button className="min-w-[100px] bg-secondary p-2 text-white">
                Copy
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-base font-medium sm:text-xl">
              Affiliate link custom generator
            </h3>
            <div className="mt-3 flex">
              <input
                className="flex-shrink-1 w-full border-[2px] p-2 text-sm outline-none"
                type="text"
                placeholder="https://mahfujurrahm535.com/"
              />
              <button className="min-w-[100px] bg-[#7C7C7C] p-2 text-white">
                Create
              </button>
            </div>
            <div className="mt-3 flex">
              <input
                className="flex-shrink-1 w-full border-[2px] p-2 text-sm outline-none"
                type="text"
                placeholder="https://mahfujurrahman535.com/aff-zl/username/"
              />
              <button className="min-w-[100px] bg-primary p-2 text-white">
                Copy
              </button>
            </div>
          </div>

          <div className="mt-10">
            <ul>
              <li className="mt-3 flex items-center gap-1 border-b border-gray-500 p-1 text-center text-sm sm:gap-2 sm:text-xl">
                <h1 className="w-[40%] text-start sm:w-[50%]">Created Links</h1>
                <h1 className="w-[18%] sm:w-[15%]">Clicks</h1>
                <h1 className="w-[18%] sm:w-[15%]">Join</h1>
                <h1 className="w-[18%] sm:w-[15%]">Sales</h1>
                <h1 className="w-[6%] sm:w-[5%]"></h1>
              </li>
              <li className="mt-3 flex items-center gap-1 border-b border-gray-500 p-1 text-center text-sm sm:gap-2">
                <p className="w-[40%] break-words text-start sm:w-[50%]">
                  https://mahfujurrahman535.com/aff-auto/username/
                </p>
                <p className="w-[18%] sm:w-[15%]">8</p>
                <p className="w-[18%] sm:w-[15%]">1</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <button className="w-[6%] sm:w-[5%]">
                  <RiDeleteBin6Line className="text-sm" />
                </button>
              </li>
              <li className="mt-3 flex items-center gap-1 border-b border-gray-500 p-1 text-center text-sm sm:gap-2">
                <p className="w-[40%] break-words text-start sm:w-[50%]">
                  https://mahfujurrahman535.com/aff-z3/username/
                </p>
                <p className="w-[18%] sm:w-[15%]">5</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <button className="w-[6%] sm:w-[5%]">
                  <RiDeleteBin6Line className="text-sm" />
                </button>
              </li>
              <li className="mt-3 flex items-center gap-1 border-b border-gray-500 p-1 text-center text-sm sm:gap-2">
                <p className="w-[40%] break-words text-start sm:w-[50%]">
                  https://mahfujurrahman535.com/aff-zN/username/
                </p>
                <p className="w-[18%] sm:w-[15%]">15</p>
                <p className="w-[18%] sm:w-[15%]">5</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <button className="w-[6%] sm:w-[5%]">
                  <RiDeleteBin6Line className="text-sm" />
                </button>
              </li>
              <li className="mt-3 flex items-center gap-1 border-b border-gray-500 p-1 text-center text-sm sm:gap-2">
                <p className="w-[40%] break-words text-start sm:w-[50%]">
                  https://mahfujurrahman535.com/aff-zl/username/
                </p>
                <p className="w-[18%] sm:w-[15%]">4</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <p className="w-[18%] sm:w-[15%]">0</p>
                <button className="w-[6%] sm:w-[5%]">
                  <RiDeleteBin6Line className="text-sm" />
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-10 flex justify-center">
            <Pagination
              count={10}
              renderItem={(item) => (
                <PaginationItem
                  slots={{
                    previous: prevBtnIcon,
                    next: nextBtnIcon,
                  }}
                  {...item}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-6 w-full bg-lightskyblue px-8 py-6 lg:w-1/4">
          <h1 className="text-lg font-semibold">Affiliate Program</h1>
          <ul>
            <li className="mt-4 list-disc">
              You must first create a link to start working as an affiliate, you
              can create the link with the URL of any page of our website, (try
              to create the link with the URL of the home page or any design
              page). You can create your affiliate link on this page&apos;s
              &quot;Affiliate link custom generator&quot; with the URL of your
              preferred page. You can also use the already created link on this
              page&apos;s &quot;Affiliate link auto generated&quot; for your
              affiliate marketing.
            </li>
            <li className="mt-4 list-disc">
              You can share this affiliate link with your friends or relatives
              or bring new clients by sharing this link on your social media or
              your website.
            </li>
            <li className="mt-4 list-disc">
              Your friends or relatives or any of your clients should come to
              our website through the affiliate link you have created, and sign
              up, then $5 will be added to your affiliate profile upon
              successful payment (design purchase or create) on our website.
            </li>
            <li className="mt-4 list-disc">
              If any client comes through your link, that client must sign up on
              our website within 30 days of his first click and must purchase or
              create something.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

const prevBtnIcon = () => {
  return <img src={prevBtn} alt="" className="h-8 w-8 rounded-full" />;
};
const nextBtnIcon = () => {
  return <img src={nextBtn} alt="" className="h-8 w-8 rounded-full" />;
};

export default Affiliate;
