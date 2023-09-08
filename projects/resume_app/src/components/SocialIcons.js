const SocialIcons = ({ name, github, linkedin, instagram, twitter }) => {
  const styles = {
    icon: {
      textDecoration: "none",
      fontSize: "22px",
      padding: "10px",
      transition: "0.2s ease-in",
    },
  };

  return (
    <div className="socialIcons" style={styles.socialIcons}>
      <a className="icon" target="blank" style={styles.icon} href={github}>
        <i
          className="fa-brands fa-github"
          aria-hidden="true"
          title={`${name} GitHub Profile`}
        ></i>
      </a>
      <a className="icon" target="blank" style={styles.icon} href={linkedin}>
        <i
          className="fa-brands fa-linkedin"
          aria-hidden="true"
          title={`${name}  LinkedIn Profile`}
        ></i>
      </a>
      <a className="icon" target="blank" style={styles.icon} href={instagram}>
        <i
          className="fa-brands fa-instagram"
          aria-hidden="true"
          title={`${name}  Instagram Profile`}
        ></i>
      </a>
      <a className="icon" target="blank" style={styles.icon} href={twitter}>
        <i
          className="fa-brands fa-twitter"
          aria-hidden="true"
          title={`${name}  Twitter Profile`}
        ></i>
      </a>
    </div>
  );
};

export default SocialIcons;
