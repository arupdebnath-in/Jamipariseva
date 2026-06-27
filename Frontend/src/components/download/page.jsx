import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DownloadCertificate = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            citizen_id: "2823",
            role_id: "6",
            request_for: "list",
          }),
        },
      );

      const result = await response.json();
      setApplications(result.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDownload = async (application) => {
    try {
      setLoading(true);

      const payload = {
        service_id: "10",
        citizen_id: "2823",
        role_id: "6",
        request_id: application.request_id,
      };
      console.log(payload);

      const response = await fetch(
        "http://localhost:8081/jamipariseva/api/download",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      console.log(result);

      if (result?.data?.pdf_url) {
        window.open(result.data.pdf_url, "_blank");
        fetchApplications();
      } else {
        toast.error("Download URL not received");
      }
    } catch (error) {
      console.error(error);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow">
      <div className="bg-steal-blue text-white p-4 text-xl font-bold rounded-t">
        Download Certified Copy
      </div>
      <div className="p-2">
        <div className="border border-richblack-200 divide-y divide-richblack-200">
          <div className="grid grid-cols-4 divide-x divide-richblack-200">
            <div className="p-2 flex justify-center items-center font-bold">
              Request ID
            </div>
            <div className="p-2 flex justify-center items-center font-bold">
              Service Name
            </div>
            <div className="p-2 flex justify-center items-center font-bold">
              Status
            </div>
            <div className="p-2 flex justify-center items-center font-bold">
              Action
            </div>
          </div>
          {applications.map((app) => (
            <div
              key={app.request_id}
              className="grid grid-cols-4 divide-x divide-richblack-200"
            >
              <div className="p-2 flex justify-center items-center">
                {app.request_id}
              </div>
              <div className="p-2 flex justify-center items-center">
                {app.service_name || "Certified Copy of Khatian"}
              </div>
              <div className="p-2 flex justify-center items-center">
                {app.status}
              </div>
              <div className="p-2 flex justify-center items-center">
                <button
                  onClick={() => handleDownload(app)}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadCertificate;
