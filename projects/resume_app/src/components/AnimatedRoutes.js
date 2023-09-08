import { Routes, Route, useLocation } from "react-router-dom";

import Landing from "../pages/landing/Landing";
import About from "../pages/about/About";
import Experiences from "../pages/experience/Experiences";
import Educations from "../pages/education/Educations";
import Contact from "../pages/contact/Contact";

const AnimatedRoutes = ({
  personalDetail,
  experiences,
  educations,
  socialLinks,
}) => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/:wallet"
        element={
          <Landing
            name={personalDetail["0"]}
            tagline={personalDetail["1"]}
            socialLinks={socialLinks}
          />
        }
      />
      <Route
        path="/:wallet/about"
        element={
          <About
            name={personalDetail["0"]}
            location={personalDetail["2"]}
            email={personalDetail["3"]}
            skills={personalDetail["4"]}
            aboutMe={personalDetail["5"]}
            socialLinks={socialLinks}
          />
        }
      />
      <Route
        path="/:wallet/experience"
        element={<Experiences experiences={experiences} />}
      />
      <Route
        path="/:wallet/education"
        element={<Educations educations={educations} />}
      />
      <Route
        path="/:wallet/contact"
        element={
          <Contact
            name={personalDetail["0"]}
            location={personalDetail["2"]}
            email={personalDetail["3"]}
            socialLinks={socialLinks}
          />
        }
      />
    </Routes>
  );
};

export default AnimatedRoutes;
