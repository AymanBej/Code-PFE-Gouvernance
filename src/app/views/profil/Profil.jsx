import React, { useEffect, useState } from "react";
import "./Profil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/material";
import { Breadcrumb } from "app/components";
import { Button, styled } from "@mui/material";

function Profil() {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1)
  }));
  const [activeTab, setActiveTab] = useState("account-general");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setuserid] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    console.log("Fetching data...");
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem("authToken");

        const url = "https://graph.microsoft.com/beta/me";
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });

        const fetchedData = await response.json();
        console.log("Fetched data:", fetchedData); // Log the fetched data
        setData(fetchedData);
        setuserid(fetchedData.id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data has been updated:", data);
  }, [data]);

  useEffect(() => {
    console.log("Data has been updated:", data);
    if (data.id) {
      fetchAvatar(data.id);
    }
  }, [data]);

  const fetchAvatar = async (userId) => {
    try {
      const accessToken = localStorage.getItem("authToken");
      const url = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        const blob = await response.blob();
        const avatarUrl = URL.createObjectURL(blob);
        setAvatarUrl(avatarUrl);
      } else {
        console.error("Failed to fetch avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  return (
    <div
      style={{
        marginBottom: "5%",
        margin: "auto",
        width: "80%",
        fontFamily: "DM Sans",
        padding: "2%"
      }}
    >
      <Box marginBottom={"2%"} className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Profil" }]} />
      </Box>
      <div className="container light-style flex-grow-1 container-p-y">
        <div className="card overflow-hidden">
          <div className="row no-gutters row-bordered row-border-light">
            <div className="col-md-3 pt-0">
              <div className="list-group list-group-flush account-settings-links">
                <a
                  className={`list-group-item list-group-item-action ${
                    activeTab === "account-general" ? "active" : ""
                  }`}
                  data-toggle="list"
                  href="#account-general"
                  onClick={() => handleTabClick("account-general")}
                >
                  Général
                </a>

                <a
                  className={`list-group-item list-group-item-action ${
                    activeTab === "account-info" ? "active" : ""
                  }`}
                  data-toggle="list"
                  href="#account-info"
                  onClick={() => handleTabClick("account-info")}
                >
                  Informations
                </a>

                <a
                  className={`list-group-item list-group-item-action ${
                    activeTab === "account-notifications" ? "active" : ""
                  }`}
                  data-toggle="list"
                  href="#account-notifications"
                  onClick={() => handleTabClick("account-notifications")}
                >
                  Notifications
                </a>
              </div>
            </div>
            <div className="col-md-9">
              <div className="tab-content">
                <div
                  className={`tab-pane fade ${
                    activeTab === "account-general" ? "active show" : ""
                  }`}
                  id="account-general"
                >
                  <div className="card-body media align-items-center">
                    {loading ? (
                      <span>Loading...</span>
                    ) : (
                      <img
                        src={avatarUrl || "https://via.placeholder.com/150"}
                        alt=""
                        className="d-block ui-w-80"
                      />
                    )}
                  </div>
                  <hr className="border-light m-0" />

                  <div className="card-body">
                    <div className="form-group">
                      <label className="form-label">Nom</label>
                      <br />
                      <label type="text" className="form-control">
                        {data.surname}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Prénom</label>
                      <label type="text" className="form-control">
                        {data.givenName}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <label type="text" className="form-control">
                        {data.mail}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Société</label>
                      <label type="text" className="form-control">
                        {data.companyName}
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "account-info" ? "active show" : ""}`}
                  id="account-info"
                >
                  <div className="card-body pb-2">
                    <div className="form-group">
                      <label className="form-label">Nom Société</label>
                      <label type="text" className="form-control">
                        {data.companyName}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Métier</label>
                      <label type="text" className="form-control">
                        {data.jobTitle}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Departement</label>
                      <label type="text" className="form-control">
                        {data.department}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">city</label>
                      <label type="text" className="form-control">
                        {data.officeLocation}
                      </label>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Contacts</h6>
                    <div className="form-group">
                      <label className="form-label">Téléphone</label>
                      <label type="text" className="form-control">
                        {data.mobilePhone}
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="form-label">code postal</label>
                      <label type="text" className="form-control">
                        {data.postalCode}
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "account-notifications" ? "active show" : ""
                  }`}
                  id="account-notifications"
                >
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Activité</h6>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" defaultChecked />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label">
                          {" "}
                          M'envoyer un e-mail lorsque quelqu'un commente mon article
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" defaultChecked />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label">
                          {" "}
                          M'envoyer un e-mail lorsque quelqu'un répond à mon sujet de forum
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label">
                          {" "}
                          M'envoyer un e-mail lorsque quelqu'un me suit
                        </span>
                      </label>
                    </div>
                  </div>
                  <hr className="border-light m-0" />
                  <div className="card-body pb-2">
                    <h6 className="mb-4">Profillication</h6>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" defaultChecked />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label"> Nouvelles et annonces</span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label">
                          {" "}
                          Mises à jour hebdomadaires des produits
                        </span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="switcher">
                        <input type="checkbox" className="switcher-input" defaultChecked />
                        <span className="switcher-indicator">
                          <span className="switcher-yes"></span>
                          <span className="switcher-no"></span>
                        </span>
                        <span className="switcher-label"> Newsletter hebdomadaire du blog</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
