import React, { useEffect, useState } from "react";

const ApplicationStatus = (request_for) => {
  const [applicationList, setApplicationList] = useState([]);

  const handleclick = async (request_for, request_id = "") => {
    const apiData = {
      citizen_id: "2823",
      role_id: "6",
      request_for: request_for,
      request_id: request_id,
    };

    try {
      const res = await fetch(
        "http://localhost:8081/jamipariseva/api/request",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(apiData),
        },
      );
      const resData = await res.json();
      setApplicationList(resData.data || []);
      console.log("Fetched Data:", resData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleclick("list");
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "--";

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const strHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${strHours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div className="rounded-t border border-steal-blue flex flex-col overflow-hidden">
      <div className="bg-steal-blue text-white p-2 font-bold">
        Application Status
      </div>
      <div>
        <button
          className="px-5 py-2 bg-steal-blue text-white  rounded-full m-2 active:scale-95"
          onClick={() => {
            handleclick("list");
          }}
        >
          All
        </button>
        <button
          className="px-5 py-2 bg-cyber-pink text-white  rounded-full m-2 active:scale-95"
          onClick={() => {
            handleclick("pending");
          }}
        >
          Pending
        </button>
        <button
          className="px-5 py-2 bg-ufo-green  text-white rounded-full m-2 active:scale-95"
          onClick={() => {
            handleclick("success");
          }}
        >
          Success
        </button>
      </div>

      <div className="m-2 flex flex-col divide-y divide-richblack-200 border border-richblack-200">
        {/* Table Header Row */}
        <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] bg-platinum divide-x divide-richblack-200 text-sm">
          <div className="col-span-2 flex justify-center items-center p-2 font-bold text-center">
            Serial Number
          </div>
          <div className="col-span-2 flex justify-center items-center p-2 font-bold text-center">
            Request ID
          </div>
          <div className="col-span-3 flex justify-center items-center p-2 font-bold text-center">
            Service Name
          </div>
          <div className="col-span-3 flex justify-center items-center p-2 font-bold text-center">
            Application Date
          </div>
          <div className="col-span-3 flex justify-center items-center p-2 font-bold text-center">
            Payment Info
          </div>
          <div className="col-span-1 flex justify-center items-center p-2 font-bold text-center">
            Status
          </div>
          <div className="col-span-2 flex justify-center items-center p-2 font-bold text-center">
            Acknowledgement
          </div>
          <div className="col-span-1 flex justify-center items-center p-2 font-bold text-center">
            E-challan
          </div>
        </div>

        {applicationList.map((application, idx) => (
          <div
            key={application.request_id || idx}
            className="grid grid-cols-[repeat(17,minmax(0,1fr))] justify-center bg-white divide-x divide-richblack-200 text-sm items-stretch"
          >
            <div className="col-span-2 flex justify-center items-center p-2">
              {idx + 1}
            </div>
            <div className="col-span-2 flex justify-center items-center p-2 break-all text-center">
              {application.request_id || "--"}
            </div>
            <div className="col-span-3 flex justify-center items-center p-2 text-center">
              {application.service_name || "Certified Copy of Serveyed Khatian"}
            </div>
            <div className="col-span-3 flex justify-center items-center p-2 text-center">
              {formatDate(application.created_at)}
            </div>
            <div className="col-span-3 flex flex-col justify-center text-xs p-2 space-y-0.5">
              <div>
                <span className="font-semibold">Payment Order Number: </span>{" "}
                {application.payment_order_no || "NA"}
              </div>
              <div>
                <span className="font-semibold">Payment Date: </span>{" "}
                {application.payment_date || "NA"}
              </div>
              <div>
                <span className="font-semibold">GRN: </span>{" "}
                {application.grn_no || "NA"}
              </div>
              <div>
                <span className="font-semibold">Amount: </span> ₹
                {application.amount || "30"}
              </div>
            </div>
            <div className="col-span-1 flex justify-center items-center p-2 text-center">
              {application.status || "--"}
            </div>
            <div className="col-span-2 flex justify-center items-center p-2 text-center">
              {application.acknowledgement ? "Available" : "--"}
            </div>
            <div className="col-span-1 flex justify-center items-center p-2 text-center">
              {application.e_challan ? "Available" : "--"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationStatus;
