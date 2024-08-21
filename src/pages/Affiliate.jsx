import { Pagination, PaginationItem } from '@mui/material';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import cashWithdrawal from '../assets/images/icons/cash-withdrawal.png';
import creditCard from '../assets/images/icons/credit-card.png';
import dollerBill from '../assets/images/icons/dollar-bill.png';
import prevBtn from '../assets/images/icons/Left Arrow.svg';
import nextBtn from '../assets/images/icons/Right Arrow.svg';
import PageHeaderWithText from '../components/PageHeaderWithText';

function Affiliate() {
    return (
        <>
            <PageHeaderWithText
                title="Affiliate Program"
                text={
                    <p className="max-w-[550px] text-center text-sm md:text-xl mt-5">
                        Join the Mahfujurrahman535 Affiliate Program and earn up
                        to $5 per new customer purchase
                    </p>
                }
            />
            <div className="max-width flex md:flex-row flex-col-reverse justify-between gap-10">
                <div className="w-full md:w-2/4 lg:w-3/4 mt-6">
                    <div className="grid grid-cols-3 gap-3 lg:gap-5 text-center text-sm sm:text-lg lg:text-xl">
                        <div className="p-5 bg-[#FFEFEF] text-center">
                            <img
                                src={dollerBill}
                                alt="Money Icon"
                                className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] mx-auto"
                            />
                            <p className=":mt-2">Balance</p>
                            <p className="font-semibold">$00</p>
                        </div>
                        <Link className="p-5 bg-[#E3E3E3] text-center">
                            <img
                                src={creditCard}
                                alt="Money Icon"
                                className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] mx-auto"
                            />
                            <p className="mt-2">Payment </p>
                            <p className="font-semibold">Method</p>
                        </Link>
                        <Link className="p-5 bg-[#DCEEFA] text-center">
                            <img
                                src={cashWithdrawal}
                                alt="Money Icon"
                                className="h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] mx-auto"
                            />
                            <p className="mt-2 text-center">Withdraw </p>
                            <p className="font-semibold text-center">Request</p>
                        </Link>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-medium">
                            Affiliate link auto generated
                        </h3>
                        <div className="mt-3 flex">
                            <input
                                className="border-[2px] p-2 flex-shrink-1 w-full outline-none text-sm"
                                type="text"
                                placeholder="https://mahfujurrahman535.com/aff-auto/username/"
                            />
                            <button className="bg-[#7C7C7C] p-2 text-white min-w-[100px]">
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-xl font-medium">
                            Affiliate link custom generator
                        </h3>
                        <div className="mt-3 flex">
                            <input
                                className="border-[2px] p-2 flex-shrink-1 w-full outline-none text-sm"
                                type="text"
                                placeholder="https://mahfujurrahm535.com/"
                            />
                            <button className="bg-[#7C7C7C] p-2 text-white min-w-[100px]">
                                Create
                            </button>
                        </div>
                        <div className="mt-3 flex">
                            <input
                                className="border-[2px] p-2 flex-shrink-1 w-full outline-none text-sm"
                                type="text"
                                placeholder="https://mahfujurrahman535.com/aff-zl/username/"
                            />
                            <button className="bg-primary p-2 text-white min-w-[100px]">
                                Copy
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto mt-[50px]">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700">
                                <tr className="border-b border-gray-700 text-xl">
                                    <th
                                        scope="col"
                                        className="px-6 py-3 font-medium"
                                    >
                                        Created links
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center font-medium"
                                    >
                                        Clicks
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center font-medium"
                                    >
                                        Join
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center font-medium"
                                    >
                                        Sales
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b text-black border-gray-700 text-center">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap text-left"
                                    >
                                        https://mahfujurrahman535.com/aff-auto/username/
                                    </th>
                                    <td className="px-6 py-4">8</td>
                                    <td className="px-6 py-4">1</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="text-gray-500 text-sm">
                                        <FaTrashAlt />
                                    </td>
                                </tr>
                                <tr className="bg-white text-black border-b border-gray-700 text-center">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap text-left"
                                    >
                                        https://mahfujurrahman535.com/aff-z3/username/
                                    </th>
                                    <td className="px-6 py-4">5</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="text-gray-500 text-sm">
                                        <FaTrashAlt />
                                    </td>
                                </tr>
                                <tr className="bg-white text-black border-b  border-gray-700 text-center">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap text-left"
                                    >
                                        https://mahfujurrahman535.com/aff-zN/username/
                                    </th>
                                    <td className="px-6 py-4">15</td>
                                    <td className="px-6 py-4">5</td>
                                    <td className="px-6 py-4">2</td>
                                    <td className="text-gray-500 text-sm">
                                        <FaTrashAlt />
                                    </td>
                                </tr>
                                <tr className="bg-white text-black text-center ">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-black whitespace-nowrap text-left"
                                    >
                                        https://mahfujurrahman535.com/aff-zl/username/
                                    </th>
                                    <td className="px-6 py-4">4</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="px-6 py-4">0</td>
                                    <td className="text-gray-500 text-sm">
                                        <FaTrashAlt />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-10">
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
                <div className="w-full md:w-2/4 lg:w-1/4 mt-6 bg-lightskyblue py-6 px-8">
                    <ul>
                        <li className="list-disc mt-4">
                            You must first create a link to start working as an
                            affiliate, you can create the link with the URL of
                            any page of our website, (try to create the link
                            with the URL of the home page or any design page).
                            You can create your affiliate link on this
                            page&apos;s &quot;Affiliate link custom
                            generator&quot; with the URL of your preferred page.
                            You can also use the already created link on this
                            page&apos;s &quot;Affiliate link auto
                            generated&quot; for your affiliate marketing.
                        </li>
                        <li className="list-disc mt-4">
                            You can share this affiliate link with your friends
                            or relatives or bring new clients by sharing this
                            link on your social media or your website.
                        </li>
                        <li className="list-disc mt-4">
                            Your friends or relatives or any of your clients
                            should come to our website through the affiliate
                            link you have created, and sign up, then $5 will be
                            added to your affiliate profile upon successful
                            payment (design purchase or create) on our website.
                        </li>
                        <li className="list-disc mt-4">
                            If any client comes through your link, that client
                            must sign up on our website within 30 days of his
                            first click and must purchase or create something.
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
