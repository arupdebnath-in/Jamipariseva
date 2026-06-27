import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RevenueDetails = ({ verifiedKhatianList, setVerifiedKhatianList }) => {
  // State to store the selected payment option
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPayableAmount = verifiedKhatianList.reduce((sum, khatian) => {
    return sum + Number(khatian.payableAmount || 0);
  }, 0);

  const addServiceRequest = async () => {
    const serviceData = {
      citizen_id: "2823",
      role_id: "6",
      service_id: "12",
      payment_multipy_factor: [
        {
          count: 1,
        },
      ],
      rorinfo: [
        {
          search_value: "11/1",
          khatian_no: "11/1",
          mouja_val: "922855",
          search_type: "1",
          is_khatian_required: "1",
        },
      ],
      applicantinfo: {
        name: "Narendra Chandra Pal",
      },
    };
    // toast.success("New Service added");
    try {
      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/servicerequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        },
      );
      const data = await response.json();
      console.log("Service api response : ", data);

      if (data.success === true) {
        toast.success("Service Added");
      } else {
        toast.error("Service not added");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during service addition.");
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment option before proceeding.");
      return;
    }

    const paymentData = {
      Applicationnumber: "APP1234567890",
      amount: totalPayableAmount.toFixed(2),
      paymentMethod: paymentMethod,
      paymentDetails: {
        upiId: paymentMethod === "UPI" ? "user@bank" : "",
      },
    };

    try {
      const response = await fetch("http://localhost:8080/paymentgateway/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      console.log("Payment api response : ", data);

      if (data.status === "Success") {
        toast.success("Payment Successful");
        addServiceRequest();
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during payment processing.");
    }
  };

  const handleDelete = (id) => {
    setVerifiedKhatianList((prevList) =>
      prevList.filter((item) => item.id !== id),
    );
  };

  return (
    <div className="border border-blue-100 rounded-t">
      <h2 className="text-xl font-bold bg-steal-blue px-5 py-2 text-white">
        Revenue Details
      </h2>
      <div className="flex p-2 flex-col justify-center gap-5">
        <div className="flex flex-col">
          <div className="grid grid-cols-5 text-sm text-gray-600 bg-platinum">
            <div className="col-span-1 flex flex-col items-center justify-center font-bold border border-r-richblack-200">
              <h1>Serial Number</h1>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center font-bold border-b border-r border-t border-r-richblack-200">
              <h1>Khatian Number</h1>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center font-bold border-b border-r border-t border-r-richblack-200">
              <h1>Khatian Copy</h1>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center font-bold border-b border-r border-t border-r-richblack-200">
              <h1>Payable Amount(₹)</h1>
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center font-bold border-b border-r border-t border-r-richblack-200">
              <h1>Delete</h1>
            </div>
          </div>
          {verifiedKhatianList.map((khatian, idx) => {
            return (
              <div
                key={khatian.id || idx}
                className="grid grid-cols-5 text-sm text-gray-600 bg-munsell"
              >
                <div className="col-span-1 flex flex-col items-center justify-center border-l border-b border-r border-richblack-200">
                  <div>
                    <h1>{idx + 1}</h1>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center border-b border-r border-richblack-200">
                  <div>
                    <h1>{khatian.khatianNumber}</h1>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col justify-center items-center w-full border-b border-r border-richblack-200">
                  Yes
                </div>
                <div className="col-span-1 flex flex-col justify-center items-center w-full border-b border-r border-richblack-200">
                  {khatian.payableAmount}
                </div>
                <div className="col-span-1 flex flex-col items-center justify-center border-b border-r border-richblack-200">
                  <h1 className="w-7 h-7 m-2 cursor-pointer active:scale-95">
                    <img
                      src="/delete.png"
                      alt="Delete"
                      onClick={() => {
                        handleDelete(khatian.id);
                      }}
                    />
                  </h1>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border border-blue-50 p-5">
          <div>
            <div className="font-bold">
              Total Amount Payable ₹{totalPayableAmount}
            </div>
          </div>
          <div className="flex gap-5 h-10 items-center my-10">
            <div className="font-bold">Choose Payment Option:</div>
            {/* Added value and onChange to bind the dropdown to state */}
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-blue-50 flex justify-center items-center h-10 px-10 focus:outline-none"
            >
              <option value="">--select--</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center m-5">
          <button
            className="bg-ufo-green text-white px-3 active:scale-95 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePayment}
            disabled={!paymentMethod}
          >
            Save & Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueDetails;
