import Education from "../../components/Education";
import PageHeader from "../../components/PageHeader";
import team from "../../images/team.png";
import p1 from "../../images/P1.png";
import quiz from "../../images/quiz.png";
import weather from "../../images/weather.png";
import bike from "../../images/bike.png";
import planner from "../../images/planner.png";

const bgcolor = [
  "#6c4bf4",
  "#ffcc33",
  "#f85781",
  "#f37737",
  "#29cbe0",
  "#3e67ff",
];

const image = [quiz, weather, bike, team, planner, p1];

const Educations = (educations) => {
  const ProjectList = () =>
    educations.educations.map((exp, i) => (
      <Education
        key={i}
        id={i + 1}
        title={exp.degree}
        institution={exp.institution}
        startDate={exp.startDate}
        endDate={exp.endDate}
        image={image[i]}
        color={bgcolor[i]}
        description={exp.description}
      />
    ));

  return (
    <section className="portfolio">
      <PageHeader title="Education" description="View my educations" />
      <div className="row">
        <ProjectList />
      </div>
    </section>
  );
};

export default Educations;
