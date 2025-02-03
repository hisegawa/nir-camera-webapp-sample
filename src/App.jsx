import { useRef, useState } from "react";
import "./App.css";

import styled from "styled-components";
import { Camera } from "react-camera-pro";

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;

  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;

  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  background: url("https://img.icons8.com/ios/50/000000/compact-camera.png");
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  ${(props) => (props.image ? `background-image:  url(${props.image});` : "")}
  ${(props) =>
    props.facingMode === "user" ? `transform: rotateY(180deg);` : ""}
`;

const ClosePreviewButton = styled(Button)`
  background: url(https://img.icons8.com/?size=100&id=8112&format=png&color=000000);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 1;
    cursor: default;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
  }
`;

function App() {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [facingMode, setFacingMode] = useState("user");
  const [image, setImage] = useState(null);

  if (image !== null) {
    return (
      <Wrapper>
        <ImagePreview image={image} facingMode={facingMode} />
        <Control>
          <ClosePreviewButton
            onClick={() => {
              if (image) {
                setImage(null);
              }
            }}
          ></ClosePreviewButton>
        </Control>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Camera
        ref={camera}
        aspectRatio="cover"
        numberOfCamerasCallback={setNumberOfCameras}
        facingMode={facingMode}
      />
      <Control>
        <TakePhotoButton
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              console.log(photo);
              setImage(photo);
            }
          }}
        />
        <ChangeFacingCameraButton
          disabled={numberOfCameras <= 1}
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              setFacingMode(result);
              console.log(result);
            }
          }}
        />
      </Control>
    </Wrapper>
  );
}

export default App;
