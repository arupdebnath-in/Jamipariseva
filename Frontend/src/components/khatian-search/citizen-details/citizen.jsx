import React, { useState } from "react";
import DetailCard from "./detailcard";

const CitizenDetails = () => {
  const [UserData, setUserData] = useState(() => {
    // 1. Your baseline default values
    const defaultData = [
      { label: "Name", value: "Arup Debnath" },
      { label: "Email ID", value: "arup@gmail.com" },
      { label: "Mobile", value: "XXXXXX3801" },
      { label: "District", value: "Khowai" },
      { label: "Sub-Division", value: "Teliamura" },
      { label: "BAC/Block/MC/NP/AMC", value: "Teliamura" },
      { label: "VC/GP/Ward", value: "Ward No.4" },
      { label: "Police Station", value: "Teliamura" },
      { label: "Pincode", value: "799205" },
    ];

    // 2. Get the active login email key (Change 'activeUserEmail' to your actual session key name)
    const loginEmailKey = localStorage.getItem("activeUserEmail"); 
    
    if (loginEmailKey) {
      // 3. Fetch the user object using that email key
      const savedData = localStorage.getItem(loginEmailKey);

      if (savedData) {
        try {
          const parsedStorage = JSON.parse(savedData);

          // 4. Map the data onto your UI fields
          return defaultData.map((item) => {
            if (item.label === "Name") {
              const fullLocalName = `${parsedStorage.firstName || ""} ${parsedStorage.lastName || ""}`.trim();
              return { ...item, value: fullLocalName || item.value };
            }
            if (item.label === "Email ID") {
              return { ...item, value: loginEmailKey }; // Use the key itself as the email display
            }
            // Keep fields without local storage data as they are
            return item;
          });
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    }

    return defaultData;
  });

  return (
    <div className="border border-blue-100 rounded-t">
      <h2 className="text-xl font-bold bg-steal-blue px-5 py-2 text-white">
        Citizen Details
      </h2>

      <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-4 text-sm text-gray-600">
        {UserData.map((data, idx) => {
          return <DetailCard key={idx} label={data.label} value={data.value} />;
        })}
      </div>
    </div>
  );
};

export default CitizenDetails;