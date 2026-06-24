import React, { useEffect, useState } from "react";

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
            request_for: "pending",
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
        service_id: "12",
        citizen_id: "2823",
        role_id: "6",
        request_id: application.request_id,
      };

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

      if (result?.data?.download_url) {
        window.open(result.data.download_url, "_blank");
      } else {
        alert("Download URL not received");
      }
    } catch (error) {
      console.error(error);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow rounded-lg">
      <div className="bg-steal-blue text-white p-4 text-xl font-bold">
        Download Certified Copy
      </div>

      <div className="p-6">
        {applications.length === 0 ? (
          <p>No approved applications found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Request ID</th>
                <th className="border p-2">Service Name</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((app) => (
                <tr key={app.request_id}>
                  <td className="border p-2">{app.request_id}</td>
                  <td className="border p-2">{app.service_name}</td>
                  <td className="border p-2">{app.status}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDownload(app)}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DownloadCertificate;
