import React, { useState } from "react";
import toast from "react-hot-toast";

const KhatianVerification = ({ setShowReveneuDetails, lgd_village_code , verifiedKhatianList , setVerifiedKhatianList}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [searchByValue, setSearchByValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [khatianNumber, setKhatianNumber] = useState(""); // Fixed typo in state setter name

  const searchByOptions = [
    {
      id: 1,
      name: "Khatian No.",
      placevalue: "Khatian Number (e.g., 11/1)",
    },
    {
      id: 2,
      name: "Plot No.",
      placevalue: "Plot Number (e.g., 542)",
    },
    {
      id: 3,
      name: "Owner Name",
      placevalue: "Name (First Last)",
    },
  ];

  const verifyHandler = async () => {
    if (!searchBy) {
      return toast.error("Please select what you want to search by first.");
    }
    if (!searchByValue.trim()) {
      return toast.error("Please enter a value to verify.");
    }

    let postData = {};

    if (searchBy === "Khatian No.") {
      postData = {
        search_by: "khatian",
        khatian_no: searchByValue.trim(),
        lgd_village_code: lgd_village_code,
      };
    } else if (searchBy === "Plot No.") {
      postData = {
        search_by: "plot",
        plot_no: searchByValue.trim(),
        lgd_village_code: lgd_village_code,
      };
    } else if (searchBy === "Owner Name") {
      postData = {
        search_by: "owner_name",
        owner_name: searchByValue.trim(),
        lgd_village_code: lgd_village_code,
      };
    }

    try {
      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/ror/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        },
      );

      const responseData = await response.json();

      if (responseData?.data?.verified) {
        setIsVerified(true);
        setKhatianNumber(responseData?.data?.khatian_no || "1000"); 
        toast.success("Khatian Verified Successfully");
      } else {
        setIsVerified(false);
        setKhatianNumber("");
        toast.error("Khatian is Not Verified");
      }
    } catch (error) {
      console.error("Api Error : ", error);
      setIsVerified(false);
      setKhatianNumber("");
      toast.error("An error occurred during verification");
    }
  };

  const handleSearchBy = (e) => {
    setSearchBy(e.target.value);
    setSearchByValue("");
    setIsVerified(false);
    setKhatianNumber("");
  };

  const handleSearchByValue = (e) => {
    setSearchByValue(e.target.value);
  };

  const saveHandler = () => {
    if (!isVerified) {
      return toast.error("Khatian is Not Verified");
    }

    const isDuplicate = verifiedKhatianList.some(
      (item) => item.khatianNumber === khatianNumber
    );

    if (isDuplicate) {
      return toast.error(`Khatian No. ${khatianNumber} is already added to the list.`);
    }
    // -------------------------

    const newKhatian = {
      id: crypto.randomUUID(),
      khatianNumber: khatianNumber,
      payableAmount: "30"
    };

    setVerifiedKhatianList([...verifiedKhatianList, newKhatian]);
    setShowReveneuDetails(true);
  };

  const currentPlaceholder =
    searchByOptions.find((opt) => opt.name === searchBy)?.placevalue ||
    "Select option first";

  const handlekeydown = (e) =>{
    if(e.key === "Enter"){
      e.preventDefault();
      verifyHandler();
    }
  };

  return (
    <div>
      <div className="mt-10 bg-steal-blue px-6 rounded-t-[4px] py-3 text-white font-bold text-xl">
        ROR / Khatian Verification
      </div>
      <div className="bg-white border border-steal-blue grid grid-cols-6 pt-5 pb-5">
        {/* Search By */}
        <div className="flex flex-col items-center justify-between gap-y-2 border-r-richblack-200 border pb-2 col-span-2">
          <label
            htmlFor="inputType"
            className="text-center font-semibold bg-richblack-600 w-full text-white"
          >
            Search By:
          </label>
          <select
            id="inputType"
            value={searchBy}
            className="w-fit bg-richblack-25 py-2 m-2 px-4 rounded-md"
            onChange={handleSearchBy}
          >
            <option value="">--select--</option>
            {searchByOptions.map((element) => (
              <option key={element.id} value={element.name}>
                {element.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input field */}
        <div className="flex flex-col items-center gap-y-2 border-r-richblack-200 border pb-2 col-span-2">
          <label
            htmlFor="inputText"
            className="text-center font-semibold bg-richblack-600 w-full text-white"
          >
            {searchBy ? `Enter ${searchBy}` : "Enter Value"}
          </label>
          <input
            type="text"
            id="inputText"
            value={searchByValue}
            placeholder={currentPlaceholder}
            onChange={handleSearchByValue}
            onKeyDown={handlekeydown}
            disabled={!searchBy}
            className="w-fit bg-richblack-25 py-2 m-2 px-4 rounded-md disabled:opacity-50"
          />
        </div>

        {/* Verify Action */}
        <div className="flex flex-col items-center justify-between gap-y-2 border-r-richblack-200 border pb-2">
          <div className="text-center font-semibold bg-richblack-600 w-full text-white">
            Verify {searchBy || ""}
          </div>
          <button
            type="button"
            onClick={verifyHandler}
            className="bg-ufo-green px-4 py-2 text-sm rounded-md m-2 text-white font-bold active:scale-95"
          >
            Verify
          </button>
        </div>

        {/* Save Action */}
        <div className="flex flex-col items-center justify-between gap-y-2 border-r-richblack-200 border pb-2">
          <div className="text-center font-semibold bg-richblack-600 w-full text-white">
            Save
          </div>
          <button
            type="button"
            onClick={saveHandler}
            className="bg-neon-cyan px-4 py-2 text-sm rounded-md m-2 text-white font-bold active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default KhatianVerification;