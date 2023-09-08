import PageHeader from "../../components/PageHeader";
import SocialIcons from "../../components/SocialIcons";
import Form from "../../components/Form";
import ContactInfo from "../../components/ContactInfo";

const Contact = ({ name, email, location, socialLinks }) => {
  return (
    <section className="contact">
      <PageHeader title="Contact" description="Get in touch" />
      <div className="contactWrap container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <Form />
          </div>
          <div className="col-12 col-lg-6">
            <ContactInfo name={name} location={location} email={email} />
          </div>
        </div>
      </div>
      <SocialIcons
        name={name}
        github={socialLinks.github}
        linkedin={socialLinks.linkedin}
        instagram={socialLinks.instagram}
        twitter={socialLinks.twitter}
      />
    </section>
  );
};

export default Contact;
