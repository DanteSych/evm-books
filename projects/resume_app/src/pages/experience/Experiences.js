import Experience from "../../components/Experience";
import PageHeader from "../../components/PageHeader";
import team from "../../images/team.png";
import p1 from "../../images/P1.png";
import quiz from "../../images/quiz.png";
import weather from "../../images/weather.png";
import bike from "../../images/bike.png";
import planner from "../../images/planner.png";

const bgcolor = [
  "#f37737",
  "#29cbe0",
  "#6c4bf4",
  "#ffcc33",
  "#f85781",
  "#3e67ff",
];

const image = [team, planner, p1, quiz, bike, weather];

const Experiences = (experiences) => {
  const ProjectList = () =>
    experiences.experiences.map((exp, i) => (
      <Experience
        key={i}
        id={i + 1}
        title={exp.jobTitle}
        company={exp.company}
        startDate={exp.startDate}
        endDate={exp.endDate}
        image={image[i]}
        color={bgcolor[i]}
        description={exp.description}
      />
    ));

  return (
    <section className="portfolio">
      <PageHeader title="Experience" description="View my experiences" />
      <div className="row">
        <ProjectList />
      </div>
    </section>
  );
};

export default Experiences;
