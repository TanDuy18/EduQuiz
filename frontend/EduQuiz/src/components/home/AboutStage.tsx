import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import studentAnimation from "../../assets/Home/STUDENT.lottie";
import Mission1 from "../../assets/Home/Misson1.png";
import Mission2 from "../../assets/Home/Misson2.png";
import Mission3 from "../../assets/Home/Misson3.png";
import Success from "../../assets/Home/Success.png";

const missions = [Mission1, Mission2, Mission3];
const DELAYS = [1600, 1600, 1600, 3500];

export default function AboutStage() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setStep((s) => (s + 1) % 4), DELAYS[step]);
    return () => clearTimeout(timer);
  }, [step]);

  const activeMission = Math.min(step, 2);

  return (
    <div className="eq-stage">
      <DotLottieReact src={studentAnimation} loop autoplay />

      <div className="eq-mission-card">
        {missions.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className={`eq-mission-img ${i === activeMission ? "active" : ""}`}
          />
        ))}
      </div>

      <div className={`eq-success-card ${step === 3 ? "show" : ""}`}>
        <img src={Success} alt="Điểm cao" draggable={false} />
      </div>
    </div>
  );
}
