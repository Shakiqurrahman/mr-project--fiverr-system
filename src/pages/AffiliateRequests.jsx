import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  useGetWithdrawRequestDataQuery,
  useWithdrawRequestActionMutation,
} from "../Redux/api/affiliateApiSlice";
import WithdrawUserDetails from "../components/WithdrawUserDetails";

const AffiliateRequests = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState(null);

  const { data } = useGetWithdrawRequestDataQuery();

  const [withdrawAction] = useWithdrawRequestActionMutation();

  const convertDateTime = (createdAt) => {
    const date = new Date(createdAt);

    let formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    formattedDate = formattedDate.replace("am", "AM").replace("pm", "PM");

    const finalFormattedDate = formattedDate.replace(",", "").trim();

    return finalFormattedDate;
  };

  const handleDetails = (info) => {
    setOpenDetails(true);
    setDetails(info);
  };

  const handleRequestAction = async (id, status) => {
    if ((id, status)) {
      const data = {
        id: id,
        action: status,
      };
      try {
        const res = await withdrawAction(data).unwrap();
        toast.success("Request Successfull!");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <>
      <div className="max-width my-10">
        <div className="overflow-x-auto shadow-btn-shadow">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Widthdrawal Info</th>
                <th className="p-3">Requested On</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="even:*:bg-gray-200">
              {data?.length === 0 && <p className="p-3">No Requests found!</p>}
              {data?.length > 0 &&
                data?.map((item, i) => (
                  <tr key={i}>
                    <td className="p-3">
                      <button
                        className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white"
                        onClick={() => handleDetails(item?.AffiliateProfile)}
                      >
                        Details
                      </button>
                    </td>
                    <td className="p-3">{convertDateTime(item?.createdAt)}</td>
                    <td className="p-3 font-semibold">${item?.ammount}</td>
                    <td className="p-3">
                      {item?.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                            className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white"
                            onClick={() =>
                              handleRequestAction(item?.id, "APPROVED")
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="rounded-[30px] bg-revision px-8 py-1 font-semibold text-white"
                            onClick={() =>
                              handleRequestAction(item?.id, "REJECTED")
                            }
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {item?.status === "APPROVED" && (
                        <button className="w-[120px] cursor-default rounded-[30px] border border-ongoing bg-ongoing/20 py-1 text-center text-sm font-semibold text-ongoing">
                          Approved
                        </button>
                      )}
                      {item?.status === "REJECTED" && (
                        <button className="w-[120px] cursor-default rounded-[30px] border border-revision bg-revision/20 py-1 text-center text-sm font-semibold text-revision">
                          Rejected
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {openDetails && details && (
        <WithdrawUserDetails
          info={details}
          close={setOpenDetails}
          reset={setDetails}
        />
      )}
    </>
  );
};

export default AffiliateRequests;
