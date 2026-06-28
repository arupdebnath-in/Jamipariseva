import React from "react";

const APITEST = () => {
  const handleclick = async () => {
    console.log("Clicked");
    const payload = {
      khatianNo: "122",
      villageCode: "922842",
      districtCode: "272",
    };

    try {
      const res = await fetch(
        "http://localhost:8085/khatian_services/esign/frskhatian",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      
      const data = await res.json();
      
      if (data && data.base64Document) {
        // Trigger the file download
        downloadBase64Pdf(data.base64Document, `khatian_${payload.khatianNo}.pdf`);
      } else {
        console.error("No document data found in response");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  // Helper function to handle the binary conversion and download trigger
  const downloadBase64Pdf = (base64String, fileName) => {
    // 1. Clean the string if it contains data URI metadata (e.g., "data:application/pdf;base64,")
    const cleanBase64 = base64String.replace(/^data:application\/pdf;base64,/, "");

    // 2. Decode base64 to raw binary data held in a string
    const byteCharacters = atob(cleanBase64);
    
    // 3. Create an array of byte values
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    // 4. Convert byte values into a real typed byte array
    const byteArray = new Uint8Array(byteNumbers);
    
    // 5. Wrap the array into a Blob object explicitly typed as a PDF
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // 6. Create a temporary object URL pointing to the Blob
    const blobUrl = URL.createObjectURL(blob);

    // 7. Create a temporary anchor element and force a download click
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    
    document.body.appendChild(link);
    link.click();
    
    // 8. Clean up the DOM and release memory
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div>
      <button
        className="bg-ufo-green rounded-full px-5 py-3"
        onClick={handleclick}
      >
        click
      </button>
    </div>
  );
};

export default APITEST;