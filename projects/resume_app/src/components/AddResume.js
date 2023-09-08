import React from "react";
import Button from "./Button";
import Input from "./Input";
import { setGlobalState, useGlobalState } from '../utils/GlobalState';
import { useNavigate } from "react-router-dom";

export default function AddResume({
  personalDetails,
  experience,
  education,
  socialLinks,
  onChange,
  onChangeExperience,
  onChangeEducation,
  onChangeSocialLinks,
  addResume,
  addExperience,
  addEducation,
  addSocialLinks,
}) {
  const navigate = useNavigate();
  const [loadTx] = useGlobalState("loadTx");
  const [walletLogin] = useGlobalState("walletAddress");
  const [isDataExist] = useGlobalState("isDataExist");

  return (
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "antiquewhite",
          paddingTop: "20px",
        }}
      >
        CyProfile
      </h1>
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "antiquewhite",
          margin: "10% 0px 60px 0px",
        }}
      >
        Please Add your Resume to this DApp
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isDataExist &&
          <button className="profile-btn" onClick={() => {
            setGlobalState("showResume", true);
            navigate(`/${walletLogin}`);
          }}>View Profile</button>
        }
        <Button
          type="button"
          success
          dataBsToggle="modal"
          dataBsTarget="#staticBackdrop"
        >
          Add Basic Details
        </Button>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Add Basic Details
                </h5>
                <Button
                  type="button"
                  cls="btn-close"
                  dataBsDismiss="modal"
                  ariaLabel="Close"
                ></Button>
              </div>
              <div className="modal-body">
                <div className="modal-body">
                  <label className="label">Name</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="name"
                    placeholder="Rohan Verma"
                  ></Input>
                  <label className="label">Email</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="email"
                    placeholder="abc@gmail.com"
                  ></Input>
                  <label className="label">Tagline</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="tagline"
                    placeholder="I'm a Developer"
                  ></Input>
                  <label className="label">About Me</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="aboutMe"
                    placeholder="About Me"
                  ></Input>
                  <label className="label">Skills</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="skills"
                    placeholder="Python, SQL"
                  ></Input>
                  <label className="label">Location</label>
                  <Input
                    inputs={personalDetails}
                    onChange={onChange}
                    name="location"
                    placeholder="Delhi, India"
                  ></Input>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  success
                  dataBsDismiss="modal"
                  onClick={addResume}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="button"
          success
          dataBsToggle="modal"
          dataBsTarget="#staticBackdrop1"
        >
          Add Experience
        </Button>
        <div
          className="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel1">
                  Add Experience
                </h5>
                <Button
                  type="button"
                  cls="btn-close"
                  dataBsDismiss="modal"
                  ariaLabel="Close"
                ></Button>
              </div>
              <div className="modal-body">
                <div className="modal-body">
                  <label className="label">Job Title</label>
                  <Input
                    inputs={experience}
                    onChange={onChangeExperience}
                    name="jobTitle"
                    placeholder="Consultant"
                  ></Input>
                  <label className="label">Company</label>
                  <Input
                    inputs={experience}
                    onChange={onChangeExperience}
                    name="company"
                    placeholder="Google"
                  ></Input>
                  <label className="label">Start Date</label>
                  <Input
                    inputs={experience}
                    onChange={onChangeExperience}
                    type="date"
                    name="startDate"
                  ></Input>
                  <label className="label">End Date</label>
                  <Input
                    inputs={experience}
                    onChange={onChangeExperience}
                    type="date"
                    name="endDate"
                  ></Input>
                  <label className="label">Description</label>
                  <Input
                    inputs={experience}
                    onChange={onChangeExperience}
                    name="description"
                    placeholder="Description"
                  ></Input>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  success
                  dataBsDismiss="modal"
                  onClick={addExperience}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="button"
          success
          dataBsToggle="modal"
          dataBsTarget="#staticBackdrop2"
        >
          Add Education
        </Button>
        <div
          className="modal fade"
          id="staticBackdrop2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel2">
                  Add Education
                </h5>
                <Button
                  type="button"
                  cls="btn-close"
                  dataBsDismiss="modal"
                  ariaLabel="Close"
                ></Button>
              </div>
              <div className="modal-body">
                <div className="modal-body">
                  <label className="label">Degree</label>
                  <Input
                    inputs={education}
                    onChange={onChangeEducation}
                    name="degree"
                    placeholder="B.Tech in Mechanical"
                  ></Input>
                  <label className="label">Institution</label>
                  <Input
                    inputs={education}
                    onChange={onChangeEducation}
                    name="institution"
                    placeholder="IIT Delhi"
                  ></Input>
                  <label className="label">Start Date</label>
                  <Input
                    inputs={education}
                    onChange={onChangeEducation}
                    type="date"
                    name="startDate"
                  ></Input>
                  <label className="label">End Date</label>
                  <Input
                    inputs={education}
                    onChange={onChangeEducation}
                    type="date"
                    name="endDate"
                  ></Input>
                  <label className="label">Description</label>
                  <Input
                    inputs={education}
                    onChange={onChangeEducation}
                    name="description"
                    placeholder="Description"
                  ></Input>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  success
                  dataBsDismiss="modal"
                  onClick={addEducation}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="button"
          success
          dataBsToggle="modal"
          dataBsTarget="#staticBackdrop3"
        >
          Add SocialLinks
        </Button>
        <div
          className="modal fade"
          id="staticBackdrop3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel3">
                  Add Social Links
                </h5>
                <Button
                  type="button"
                  cls="btn-close"
                  dataBsDismiss="modal"
                  ariaLabel="Close"
                ></Button>
              </div>
              <div className="modal-body">
                <div className="modal-body">
                  <label className="label">Github</label>
                  <Input
                    inputs={socialLinks}
                    onChange={onChangeSocialLinks}
                    name="github"
                    placeholder="https://github.com/xyz"
                  ></Input>
                  <label className="label">Linkedin</label>
                  <Input
                    inputs={socialLinks}
                    onChange={onChangeSocialLinks}
                    name="linkedin"
                    placeholder="https://linkedin.com/xyz"
                  ></Input>
                  <label className="label">Instagram</label>
                  <Input
                    inputs={socialLinks}
                    onChange={onChangeSocialLinks}
                    name="instagram"
                    placeholder="https://instagram.com/xyz"
                  ></Input>
                  <label className="label">Twitter</label>
                  <Input
                    inputs={socialLinks}
                    onChange={onChangeSocialLinks}
                    name="twitter"
                    placeholder="https://twitter.com/xyz"
                  ></Input>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  success
                  dataBsDismiss="modal"
                  onClick={addSocialLinks}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loadTx &&
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "antiquewhite",
            margin: "1rem 0px 60px 0px",
          }}
        >
          Waiting...
        </p>
      }
    </>
  );
}
