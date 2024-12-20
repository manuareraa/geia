import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Transition from "./components/Transition";
import "./App.css";
import { AppProvider } from "./AppContext";

import Home from "./pages/landing-site/Home";
import Stakeholders from "./pages/landing-site/Stakeholders";
import CaseStudies from "./pages/landing-site/CaseStudies";
import ProjectStories from "./pages/landing-site/ProjectStories";
import Team from "./pages/landing-site/Team";
import Contact from "./pages/landing-site/Contact";
import HowItWorks from "./pages/landing-site/HowItWorks";
import FAQ from "./pages/landing-site/FAQ";

import AdminLogin from "./pages/admin-panel/Login";
import AdminDashboard from "./pages/admin-panel/Dashboard";
import AllProjects from "./pages/admin-panel/Projects";
import Applications from "./pages/admin-panel/Applications";
import Stats from "./pages/admin-panel/Stats";
import ApplicationView from "./pages/admin-panel/ApplicationView";
import ProjectView from "./pages/admin-panel/ProjectView";

import ExploreProjects from "./pages/platform/ExploreProjects";
import UserProjectView from "./pages/platform/ProjectView";
import NewApplication from "./pages/platform/NewApplication";
import UserLogin from "./pages/platform/UserLogin";
import UserRegister from "./pages/platform/UserRegister";
import CreateNewProject from "./pages/admin-panel/CreateNewProject";

function App() {
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsExiting(true);
    const timeout = setTimeout(() => {
      setIsExiting(false);
    }, 500); // Set the duration to match the duration of your slide-out animation (0.5s in this example)
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AppProvider>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Transition
              trigger={location.pathname === "/"}
              // isExiting={isExiting}
              isExiting={isExiting}
            >
              <Home />
            </Transition>
          }
        />
        <Route
          path="/stakeholders"
          element={
            <Transition
              trigger={location.pathname === "/stakeholders"}
              isExiting={isExiting}
            >
              <Stakeholders />
            </Transition>
          }
        />
        <Route path="*" element={<Home />} />
        <Route
          path="/case-studies"
          element={
            <Transition
              trigger={location.pathname === "/case-studies"}
              isExiting={isExiting}
            >
              <CaseStudies />
            </Transition>
          }
        />
        <Route
          path="/project-stories"
          element={
            <Transition
              trigger={location.pathname === "/project-stories"}
              isExiting={isExiting}
            >
              <ProjectStories />
            </Transition>
          }
        />
        <Route
          path="/team"
          element={
            <Transition
              trigger={location.pathname === "/team"}
              isExiting={isExiting}
            >
              <Team />
            </Transition>
          }
        />
        <Route
          path="/contact"
          element={
            <Transition
              trigger={location.pathname === "/contact"}
              isExiting={isExiting}
            >
              <Contact />
            </Transition>
          }
        />
        <Route
          path="/howitworks"
          element={
            <Transition
              trigger={location.pathname === "/howitworks"}
              isExiting={isExiting}
            >
              <HowItWorks />
            </Transition>
          }
        />
        <Route
          path="/faq"
          element={
            <Transition
              trigger={location.pathname === "/faq"}
              isExiting={isExiting}
            >
              <FAQ />
            </Transition>
          }
        />

        {/* admin */}
        <Route
          path="/admin/login"
          element={
            <Transition
              trigger={location.pathname === "/admin/login"}
              isExiting={isExiting}
            >
              <AdminLogin />
            </Transition>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <Transition
              trigger={location.pathname === "/admin/dashboard"}
              isExiting={isExiting}
            >
              <AdminDashboard />
            </Transition>
          }
        />
        <Route
          path="/admin/dashboard/projects"
          element={
            <Transition
              trigger={location.pathname === "/admin/dashboard/projects"}
              isExiting={isExiting}
            >
              <AllProjects />
            </Transition>
          }
        />
        <Route
          path="/admin/dashboard/applications"
          element={
            <Transition
              trigger={location.pathname === "/admin/dashboard/applications"}
              isExiting={isExiting}
            >
              <Applications />
            </Transition>
          }
        />
        <Route
          path="/admin/dashboard/stats"
          element={
            <Transition
              trigger={location.pathname === "/admin/dashboard/stats"}
              isExiting={isExiting}
            >
              <Stats />
            </Transition>
          }
        />
        <Route
          path="/admin/create-new-project"
          element={
            <Transition
              trigger={location.pathname === "/admin/create-new-project"}
              isExiting={isExiting}
            >
              <CreateNewProject />
            </Transition>
          }
        />
        <Route
          path="/admin/dashboard/applications/view/:applicationId"
          element={<ApplicationView />}
        />
        <Route
          path="/admin/dashboard/projects/view/:projectId"
          element={<ProjectView />}
        />

        {/* platform */}
        <Route
          path="/platform/projects"
          element={
            <Transition
              trigger={location.pathname === "/platform/projects"}
              isExiting={isExiting}
            >
              <ExploreProjects />
            </Transition>
          }
        />
        <Route
          path="/platform/projects/view/:projectId"
          element={
            <Transition
              trigger={location.pathname.startsWith("/platform/projects/view/")}
              isExiting={isExiting}
            >
              <UserProjectView />
            </Transition>
          }
        />
        <Route
          path="/platform/projects/view/:projectId/redeem/qr/:qrcode"
          element={
            <Transition
              trigger={location.pathname.startsWith("/platform/projects/view/")}
              isExiting={isExiting}
            >
              <UserProjectView />
            </Transition>
          }
        />
        <Route
          path="/new-application"
          element={
            <Transition
              trigger={location.pathname.startsWith("/new-application")}
              isExiting={isExiting}
            >
              <NewApplication />
            </Transition>
          }
        />
        <Route
          path="/login"
          element={
            <Transition
              trigger={location.pathname.startsWith("/login")}
              isExiting={isExiting}
            >
              <UserLogin />
            </Transition>
          }
        />
        <Route
          path="/register"
          element={
            <Transition
              trigger={location.pathname.startsWith("/register")}
              isExiting={isExiting}
            >
              <UserRegister />
            </Transition>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
