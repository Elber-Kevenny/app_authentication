import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardProps } from "../types/props.js";
import { getUser, logoutUser } from "../fetch/api.js";

interface User {
  username: string;
}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await getUser("/api/dashboard");
        setUser(response);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Verifying authentication......</p>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Access denied</h2>
        <p>You need to sign in to view this page.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  const handleNotImplemented = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    alert("It hasn't been implemented yet; only the logout button works.");
  };

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      await logoutUser("/api/logout");
      navigate("/login");
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
        <a
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 font-monospace fw-bold"
          href="#"
          onClick={handleNotImplemented}
        >
          Journey Doc
        </a>
        <div className="navbar-nav flex-row ms-auto align-items-center me-3">
          <span className="text-light me-3">
            Hello, <strong>{user ? user.username : ""}</strong>
          </span>
          <a
            className="btn btn-outline-light btn-sm"
            id="logout"
            href="/logout"
            onClick={handleLogout}
          >
            Log out
          </a>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            className="col-md-3 col-lg-2 d-md-block collapse p-3"
            style={{ minHeight: "100vh", backgroundColor: "#212529" }}
          >
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item mb-1">
                <a
                  href="#"
                  className="nav-link active rounded text-white"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  onClick={handleNotImplemented}
                >
                  <i className="bi bi-house-door me-2"></i>
                  Home
                </a>
              </li>
              <li className="nav-item mb-1">
                <a
                  href="#"
                  className="nav-link rounded text-white-50"
                  onClick={handleNotImplemented}
                >
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Documents
                </a>
              </li>
              <li className="nav-item mb-1">
                <a
                  href="#"
                  className="nav-link rounded text-white-50"
                  onClick={handleNotImplemented}
                >
                  <i className="bi bi-person me-2"></i>
                  Profile
                </a>
              </li>
              <li className="nav-item mb-1">
                <a
                  href="#"
                  className="nav-link rounded text-white-50"
                  onClick={handleNotImplemented}
                >
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </a>
              </li>
            </ul>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Overview</h1>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleNotImplemented}
              >
                <i className="bi bi-plus-circle me-1"></i>
                New Document
              </button>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted fw-normal mb-1">Documents</h6>
                      <h4 className="mb-0 font-monospace">12</h4>
                    </div>
                    <i
                      className="bi bi-folder-check text-primary"
                      style={{ fontSize: "2rem", opacity: 0.3 }}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted fw-normal mb-1">
                        Account Status
                      </h6>
                      <span className="badge bg-success fs-6">Active</span>
                    </div>
                    <i
                      className="bi bi-shield-check text-success"
                      style={{ fontSize: "2rem", opacity: 0.3 }}
                    ></i>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-xl-3">
                <div className="card border-0 shadow-sm p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted fw-normal mb-1">
                        Current Session
                      </h6>
                      <h6
                        className="mb-0 text-truncate font-monospace"
                        style={{ maxWidth: "120px" }}
                      >
                        Active Session
                      </h6>
                    </div>
                    <i
                      className="bi bi-key text-warning"
                      style={{ fontSize: "2rem", opacity: 0.3 }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <h5 className="card-title mb-0 fw-bold">Recent Activity</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Action</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>System Login Successful</td>
                        <td>Today at {currentTime}</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            Success
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
