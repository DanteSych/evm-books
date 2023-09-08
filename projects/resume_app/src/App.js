import "./App.css";
import Header from "./components/Header";
import AnimatedRoutes from "./components/AnimatedRoutes";
import React, { useState, useEffect, useRef } from "react";
// import getWeb3 from "./getWeb3";
import ResumeContract from "./contracts/bsc_abi.json";
import AddResume from "./components/AddResume";
import { ethers } from "ethers";
import { setGlobalState, useGlobalState } from './utils/GlobalState';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    location: "",
    tagline: "",
    email: "",
    skills: [],
    aboutMe: "",
  });
  const [experience, setExperience] = useState({
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "Present",
    description: "",
  });
  const [education, setEducation] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "Present",
    description: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });
  // const [showResume, setShowResume] = useState(false);

  const onChange = (e) =>
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  const onChangeExperience = (e) =>
    setExperience({ ...experience, [e.target.name]: e.target.value });
  const onChangeEducation = (e) =>
    setEducation({ ...education, [e.target.name]: e.target.value });
  const onChangeSocialLinks = (e) =>
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });

  const ResumeContractContractRef = useRef(null);
  // const web3 = useRef(null);
  // const [currentAccount, setCurrentAccount] = useState("");
  const [isLogin] = useGlobalState("isLogin");
  const [walletLogin] = useGlobalState("walletAddress");
  const [showResume] = useGlobalState("showResume");
  const [isDataExist] = useGlobalState("isDataExist");

  const [isFirstUseEffectCompleted, setIsFirstUseEffectCompleted] =
    useState(false);

  useEffect(() => {
    if (walletLogin === null) return;
    async function fetchData() {
      try {
        // const web = await getWeb3();
        // web3.current = web;
        // setCurrentAccount(walletLogin);
        // const networkId = await web.eth.net.getId();
        // console.log(networkId);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ResumeContractContract = new ethers.Contract(ResumeContract.contractAddress, ResumeContract.abi, signer);
        // const ResumeContractContract = await new web.eth.Contract(
        //   ResumeContract.abi,
        //   ResumeContract.networks[networkId] &&
        //   ResumeContract.networks[networkId].address
        // );
        ResumeContractContractRef.current = ResumeContractContract;
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.log(error);
      }
    }
    fetchData().then(() => setIsFirstUseEffectCompleted(true));
  }, [walletLogin]);

  const addResume = async () => {
    if (walletLogin === null) {
      alert(
        `Please connect your wallet first.`
      );
      return;
    }
    const tx = await ResumeContractContractRef.current
      .addResume(
        personalDetails.name,
        personalDetails.tagline,
        personalDetails.location,
        personalDetails.email,
        personalDetails.skills.split(","),
        personalDetails.aboutMe
      );

    setGlobalState("loadTx", true);
    await tx.wait().then(async () => {
      setPersonalDetails({
        name: "",
        location: "",
        tagline: "",
        email: "",
        skills: [],
        aboutMe: "",
      });
      resetState();
      setGlobalState("loadTx", false);
      alert(
        `Resume successfully added.`
      );
      await getDataProfile();
    })
  };

  const addExperience = async () => {
    if (walletLogin === null) {
      alert(
        `Please connect your wallet first.`
      );
      return;
    }
    if (
      experience.startDate < experience.endDate ||
      experience.endDate === "Present"
    ) {
      const tx = await ResumeContractContractRef.current
        .addExperience(
          experience.jobTitle,
          experience.company,
          experience.startDate.toString(),
          experience.endDate.toString(),
          experience.description
        );

      setGlobalState("loadTx", true);
      await tx.wait().then(async () => {
        setExperience({
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "Present",
          description: "",
        });
        alert(
          `Experience successfully added.`
        );
        resetState();
        setGlobalState("loadTx", false);
        await getDataProfile();
      })
    } else {
      alert(new Error("Start Date should be less than end date"));
    }
  };

  const addEducation = async () => {
    if (walletLogin === null) {
      alert(
        `Please connect your wallet first.`
      );
      return;
    }
    if (
      education.startDate < education.endDate ||
      education.endDate === "Present"
    ) {
      const tx = await ResumeContractContractRef.current
        .addEducation(
          education.degree,
          education.institution,
          education.startDate.toString(),
          education.endDate.toString(),
          education.description
        );

      setGlobalState("loadTx", true);
      await tx.wait().then(async () => {
        setEducation({
          degree: "",
          institution: "",
          startDate: "",
          endDate: "Present",
          description: "",
        });
        alert(
          `Education successfully added.`
        );
        resetState();
        setGlobalState("loadTx", false);
        await getDataProfile();
      })
    } else {
      alert(new Error("Start Date should be less than end date"));
    }
  };

  const addSocialLinks = async () => {
    if (walletLogin === null) {
      alert(
        `Please connect your wallet first.`
      );
      return;
    }
    const tx = await ResumeContractContractRef.current
      .addSocialLinks(
        socialLinks.github,
        socialLinks.linkedin,
        socialLinks.instagram,
        socialLinks.twitter
      );

    setGlobalState("loadTx", true);
    await tx.wait().then(async () => {
      setSocialLinks({
        github: "",
        linkedin: "",
        instagram: "",
        twitter: "",
      });
      alert(
        `Social Links successfully added.`
      );
      resetState();
      setGlobalState("loadTx", false);
      await getDataProfile();
    })
  };

  // ====================== GET DATA PROFILE FUNCTION ======================

  // const [educationLength, setEducationLength] = useState(0);
  // const [experienceLength, setExperienceLength] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [personalDetail, setPersonalDetail] = useState({});
  const [socialLink, setSocialLink] = useState({});

  const getDataProfile = async () => {
    console.log(walletLogin);
    if (isFirstUseEffectCompleted && ResumeContractContractRef.current) {
      console.log(ResumeContractContractRef.current);
      try {
        await ResumeContractContractRef.current
          .getResume(walletLogin)
          .then((data) => {
            console.log(data);
            setPersonalDetail(data);
            if (data[0] === "") return;
            setGlobalState("showResume", true);
            setGlobalState("isDataExist", true);
            navigate(`/${walletLogin}`);
          });
        console.log('test');
        getExperienceLength();
        getEducationLength();
        getSocialLinks();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getSocialLinks = async () => {
    try {
      let data = await ResumeContractContractRef.current
        .getSocialLinks(walletLogin)
      console.log(data);
      setSocialLink(data)
    } catch (error) {
      console.log(error);
    }
  };

  const getExperienceLength = async () => {
    // await ResumeContractContractRef.current
    //   .getExperienceLength(currentAccount)
    //   .call({ from: currentAccount }, (err, data) =>
    //     setExperienceLength(data)
    //   );
    try {
      let data = await ResumeContractContractRef.current
        .getExperienceLength(walletLogin)
      // setExperienceLength(data.toNumber())

      for (let i = 0; i < data.toNumber(); i++) {
        getExperience(i);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getExperience = async (i) => {
    try {
      let data = await ResumeContractContractRef.current
        .getExperience(walletLogin, i);

      setExperiences((experience) => [...experience, data])
    } catch (error) {
      console.log(error);
    }
  };

  const getEducationLength = async () => {
    try {
      let data = await ResumeContractContractRef.current
        .getEducationLength(walletLogin)
      // setEducationLength(data.toNumber());

      for (let i = 0; i < data.toNumber(); i++) {
        getEducation(i);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEducation = async (i) => {
    try {
      let data = await ResumeContractContractRef.current
        .getEducation(walletLogin, i);

      setEducations((education) => [...education, data])
    } catch (error) {
      console.log(error);
    }
  };

  const changeWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("wallet_requestPermissions", [{
      eth_accounts: {}
    }]).then(async () => {
      await provider.send("eth_requestAccounts", []);
    }).then(async () => {
      const signer = provider.getSigner();
      const wallet_address = await signer.getAddress();
      localStorage.setItem('savedWallet', wallet_address);
      setGlobalState("walletAddress", wallet_address);
      setGlobalState("isLogin", true);
    });
  }

  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      if (window.ethereum.selectedAddress === null) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const wallet_address = await signer.getAddress();
        localStorage.setItem('savedWallet', wallet_address);
        setGlobalState("walletAddress", wallet_address);
        setGlobalState("isLogin", true);
      } else {
        changeWallet();
      }
    } else if (!window.ethereum) {
      alert(
        `Please install MetaMask browser extension to interact.`
      );
    }
  };

  const resetState = async () => {
    setExperiences([]);
    setEducations([]);
  }

  useEffect(() => {
    if (walletLogin === null) return;
    getDataProfile();
  }, [walletLogin, isFirstUseEffectCompleted]);

  useEffect(() => {
    if (!isDataExist) {
      console.log('state has been reset');
      resetState();
    };
  }, [isDataExist]);

  useEffect(() => {
    if (window.location.pathname.indexOf('0x') > -1) {
      var ret = window.location.pathname.replace('/', '');
      setGlobalState("walletAddress", ret);
      // console.log('show');
    } else if (window.location.pathname === '/') {
      // console.log('nothing');
    } else {
      // console.log('wrong');
    }
  }, [window.location]);

  // useEffect(() => {
  //   const targetNetworkId = "0x61";

  //   const checkNetwor = async () => {
  //     const currentChainId = await window.ethereum.request({
  //       method: "eth_chainId",
  //     });

  //     console.log(currentChainId);

  //     if (currentChainId === targetNetworkId) return true;

  //     alert(
  //       `Please make sure your network using Bsc.`
  //     );
  //   }


  //   checkNetwor();
  // }, []);

  return (
    <>
      {!showResume &&
        <>
          {!isLogin ?
            <button className="connect-btn" onClick={connectWalletHandler}>Connect Wallet</button>
            :
            <button className="connect-btn" onClick={() => {
              setGlobalState("isLogin", false);
              setGlobalState("showResume", false);
              setGlobalState("isDataExist", false);
              setGlobalState("walletAddress", null);
              localStorage.removeItem('savedWallet');
              navigate(`/`);
            }}>Disconnect</button>
          }
        </>
      }
      {showResume ? (
        <>
          <Header />
          <AnimatedRoutes
            personalDetail={personalDetail}
            experiences={experiences}
            educations={educations}
            socialLinks={socialLink}
          />
        </>
      ) : (
        <>
          <AddResume
            personalDetails={personalDetails}
            experience={experience}
            education={education}
            socialLinks={socialLinks}
            onChange={onChange}
            onChangeExperience={onChangeExperience}
            onChangeEducation={onChangeEducation}
            onChangeSocialLinks={onChangeSocialLinks}
            addResume={addResume}
            addExperience={addExperience}
            addEducation={addEducation}
            addSocialLinks={addSocialLinks}
          />
        </>
      )}
    </>
  );
}

export default App;
