import AboutMe from "../../components/AboutMe";
import PageHeader from "../../components/PageHeader";

const About = ({ name, location, aboutMe, email, skills, socialLinks }) => {
  return (
    <section className="about">
      <PageHeader title="About Me" description="Let me introduce myself" />
      <AboutMe
        name={name}
        location={location}
        aboutMe={aboutMe}
        email={email}
        skills={skills}
        socialLinks={socialLinks}
      />
    </section>
  );
};

export default About;
