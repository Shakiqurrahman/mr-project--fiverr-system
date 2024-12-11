import React, { useState } from "react";
import WithdrawUserDetails from "../components/WithdrawUserDetails";

const AffiliateRequests = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [details, setDetails] = useState(null);

  const handleDetails = (info) => {
    setOpenDetails(true);
    setDetails(info || {});
  };
  return (
    <>
      <div className="max-width my-10">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left shadow-btn-shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Widthdrawal Info</th>
                <th className="p-3">Requested On</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="even:*:bg-gray-200">
              <tr>
                <td className="p-3">
                  <button
                    className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white"
                    onClick={() => handleDetails()}
                  >
                    Details
                  </button>
                </td>
                <td className="p-3">17 Feb 2023, 10:05 AM</td>
                <td className="p-3 font-semibold">$10</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white">
                      Accept
                    </button>
                    <button className="rounded-[30px] bg-revision px-8 py-1 font-semibold text-white">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <button
                    className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white"
                    onClick={() => handleDetails()}
                  >
                    Details
                  </button>
                </td>
                <td className="p-3">17 Feb 2023, 10:05 AM</td>
                <td className="p-3 font-semibold">$15</td>
                <td className="p-3">
                  <button className="w-[120px] cursor-default rounded-[30px] border border-ongoing bg-ongoing/20 py-1 text-center text-sm font-semibold text-ongoing">
                    Approved
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-3">
                  <button
                    className="rounded-[30px] bg-primary px-8 py-1 font-semibold text-white"
                    onClick={() => handleDetails()}
                  >
                    Details
                  </button>
                </td>
                <td className="p-3">17 Feb 2023, 10:05 AM</td>
                <td className="p-3 font-semibold">$20</td>
                <td className="p-3">
                  <button className="w-[120px] cursor-default rounded-[30px] border border-revision bg-revision/20 py-1 text-center text-sm font-semibold text-revision">
                    Rejected
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openDetails && details && (
        <WithdrawUserDetails close={setOpenDetails} reset={setDetails} />
      )}
    </>
  );
};

export default AffiliateRequests;
