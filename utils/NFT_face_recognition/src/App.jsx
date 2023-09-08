import * as faceapi from "face-api.js"
import './App.css';
import { useEffect, useRef, useState } from "react";


function App() {
  const myImage = useRef(null);
  const myImage2 = useRef(null);
  const myCanvas = useRef(null);
  const [ready, setReady] = useState(false);

  const dataImage = [
    {
      name: 'Women Unite #43',
      image: 'https://i.seadn.io/gae/c-FnFTrcuOvbKmTiODU-I5v34YV6_r9H8w7Z2UEwJtLWgZQrFYNGhgbnJz08VluezEpA_3OVEsrIeWsvne63tUeaRqi2Td1lUnKJ?auto=format&dpr=1&w=1000',
    },
    {
      name: 'Women Unite #119',
      image: 'https://i.seadn.io/gae/Cmwnry39_Rq6FBpQpLV5Bx_TlyBemm1olm3-3RllIO0KLptSunhSee2elBctBFdZIQNrpQZ2VES5R1g7wkXj1k8r01lp4HQ9rEyr?auto=format&dpr=1&w=1000'
    },
    {
      name: 'Women Unite #2',
      image: 'https://i.seadn.io/gae/sHnyTgIrNMgS6mtvYIaX4WnhmvnoWbZxod3gF3EGE6Tr-VonZatxkEIK2faV2i29MMY1jXg9Dgr9OzpzVEwwnvmlJmdEKTeD9uvV9A?auto=format&dpr=1&w=1000'
    }
  ]

  // const detect = async () => {
  //   const detections = await faceapi.detectAllFaces(myImage.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //   const displaySize = { width: myImage.current.width, height: myImage.current.height }
  //   faceapi.matchDimensions(myCanvas.current, displaySize)


  //   /* Display detected face bounding boxes */
  //   // resize the detected boxes in case your displayed image has a different size than the original
  //   const resizedDetections = faceapi.resizeResults(detections, displaySize)
  //   // draw detections into the canvas
  //   faceapi.draw.drawDetections(myCanvas.current, resizedDetections)


  //   /* Display face landmarks */
  //   const detectionsWithLandmarks = await faceapi
  //     .detectAllFaces(myImage.current, new faceapi.TinyFaceDetectorOptions())
  //     .withFaceLandmarks()
  //   // resize the detected boxes and landmarks in case your displayed image has a different size than the original
  //   const resizedResults = faceapi.resizeResults(detectionsWithLandmarks, displaySize)
  //   // draw detections into the canvas
  //   faceapi.draw.drawDetections(myCanvas.current, resizedResults)
  //   // draw the landmarks into the canvas
  //   faceapi.draw.drawFaceLandmarks(myCanvas.current, resizedResults);


  //   /* Display face expression results */
  //   const detectionsWithExpressions = await faceapi
  //     .detectAllFaces(myImage.current, new faceapi.TinyFaceDetectorOptions())
  //     .withFaceLandmarks()
  //     .withFaceExpressions()
  //     .withAgeAndGender()
  //   // resize the detected boxes and landmarks in case your displayed image has a different size than the original
  //   const resizedResults2 = faceapi.resizeResults(detectionsWithExpressions, displaySize)
  //   // draw detections into the canvas
  //   faceapi.draw.drawDetections(myCanvas.current, resizedResults2)
  //   // draw a textbox displaying the face expressions with minimum probability into the canvas
  //   const minProbability = 0.05
  //   faceapi.draw.drawFaceExpressions(myCanvas.current, resizedResults2, minProbability)


  //   resizedResults2.forEach(result => {
  //     const {
  //       age,
  //       gender,
  //       genderProbability
  //     } = result
  //     new faceapi.draw.DrawTextField(
  //       [
  //         `${faceapi.utils.round(age, 0)} years`,
  //         `${gender} (${faceapi.utils.round(genderProbability)})`
  //       ],
  //       result.detection.box.topRight
  //     ).draw(myCanvas.current)
  //   })

  // }

  const getDataImageDescriptor = (e) => {
    return Promise.all(
      dataImage.map(async (item) => {
        const descriptions = [];
        const img = await faceapi.fetchImage(item.image);
        console.log(img);
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()
        descriptions.push(detections[0].descriptor);
        return new faceapi.LabeledFaceDescriptors(item.name, descriptions);
      })
    );
  };

  const recognition = async () => {
    const dataDescriptors = await getDataImageDescriptor();
    const faceMatcher = new faceapi.FaceMatcher(dataDescriptors);
    // const img = await faceapi.fetchImage(`https://awsimages.detik.net.id/community/media/visual/2022/05/25/neymar.jpeg?w=1200`);
    // const fullFaceDescriptions = await faceapi
    //   .detectAllFaces(myImage, new faceapi.TinyFaceDetectorOptions())
    //   .withFaceLandmarks()
    //   .withFaceDescriptors()
    //   .withFaceExpressions()
    //   .withAgeAndGender()

    // const faceMatcher = new faceapi.FaceMatcher(fullFaceDescriptions);

    const results = await faceapi
      .detectAllFaces(myImage2.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withFaceExpressions()
      .withAgeAndGender()

    faceapi.matchDimensions(myCanvas.current, myImage2.current)

    const resizedResults2 = faceapi.resizeResults(results, myImage2.current)

    faceapi.draw.drawDetections(myCanvas.current, resizedResults2)
    faceapi.draw.drawFaceLandmarks(myCanvas.current, resizedResults2);
    faceapi.draw.drawDetections(myCanvas.current, resizedResults2)
    const minProbability = 0.05
    faceapi.draw.drawFaceExpressions(myCanvas.current, resizedResults2, minProbability)
    resizedResults2.forEach(result => {
      const {
        age,
        gender,
        genderProbability
      } = result
      new faceapi.draw.DrawTextField(
        [
          `${faceapi.utils.round(age, 0)} years`,
          `${gender} (${faceapi.utils.round(genderProbability)})`
        ],
        result.detection.box.topRight
      ).draw(myCanvas.current)
    })

    if(resizedResults2.length === 0){
      alert('Sorry, your image was not detected for checking!')
      return;
    }

    let labelName;
    resizedResults2.forEach(({ detection, descriptor }) => {
      const label = faceMatcher.findBestMatch(descriptor).toString()
      const options = { label }
      labelName = label;
      const drawBox = new faceapi.draw.DrawBox(detection.box, options)
      drawBox.draw(myCanvas.current)
    })

    const result = labelName.search('unknown');
        if (result !== -1) {
            alert('Your NFT is not detected!')
        } else {
          alert('Congratulation! You are eligible!')
        }
  };


  useEffect(() => {
    Promise.all([
      // faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
      faceapi.nets.ageGenderNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      // faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      // faceapi.nets.tinyYolov2.loadFromUri('/models')
    ]).then(() => {
      setReady(true);
    })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  const [selectedImage, setSelectedImage] = useState(null);
  const [testImage, setImageUrl] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [testImage2, setImageUrl2] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImage(file); // Store the selected file in state
    setImageUrl(URL.createObjectURL(file)); // Create a temporary URL for the image
  };
  const handleImageChange2 = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setSelectedImage2(file); // Store the selected file in state
    setImageUrl2(URL.createObjectURL(file)); // Create a temporary URL for the image
  };
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', gap: '1rem' }}>
        {/* <div style={{ display: 'grid' }}>
          <input style={{ marginBottom: '1rem' }} type="file" accept="image/*" onChange={handleImageChange} />
          <div style={{ display: "flex", justifyContent: "center" }} >
            {testImage && <img src={testImage} alt="Uploaded" style={{ width: "500px", height: "400px", border: "solid 2px black" }} ref={myImage} />}
          </div>
        </div> */}
        <div style={{ display: 'grid' }}>
          <input style={{ marginBottom: '1rem' }} type="file" accept="image/*" onChange={handleImageChange2} />
          <div style={{ display: "flex", justifyContent: "center" }} >
            {testImage2 && <img src={testImage2} alt="Uploaded" style={{ width: "500px", height: "400px", border: "solid 2px black" }} ref={myImage2} />}
            {testImage2 && <canvas ref={myCanvas} style={{ position: "absolute", width: "500px", height: "400px" }}></canvas>}
          </div>
        </div>
      </div>
      {testImage2 && ready && <button style={{ marginTop: '1rem' }} onClick={recognition}>Detect</button>}

    </div>
  );
}

export default App;
