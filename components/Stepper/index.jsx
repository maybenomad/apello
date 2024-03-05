import { useState } from "react";
import DiscordConnection from "./DiscordConnection";
import { TiTick } from "react-icons/ti";
import { useAuthContext } from "../../hooks/useAuthContext";

const Stepper = () => {
  const [currentStep, setcurrentStep] = useState(1);
  //comlete all the steps
  const [complete, setcomplete] = useState(false);

  const { wallet } = useAuthContext();

  return (
    <section className="">
      <div className="mt-5  p-4  ">
        <DiscordConnection
          currentStep={currentStep}
          setcurrentStep={setcurrentStep}
        />

        <div
          className={`step-item ${currentStep === 2 && "active"} ${
            complete && "complete"
          } `}
        >
          <div className="flex  p-6 items-center">
            <span className="step ">{complete ? <TiTick size={24} /> : 2}</span>
            <h3 className="font-bold font-azonix">Confirm & go to Discord</h3>
          </div>

          <div
            className={`max-h-80 overflow-hidden ${
              (currentStep !== 2 || !complete) && "max-h-0"
            } transition-[max-height] `}
          >
            <>
              <p className="text-gray-500  step-parag">
                Almost there! After you click Confirm, Go back to discord and
                click Verify
              </p>
              <a
                href="https://discord.gg/caalabs"
                className="clip-button p-2 px-4 ml-14 bg-apello flex gap-x-3 hover:scale-110 transition disabled:bg-black "
                onClick={() => {
                  setcomplete(true);
                }}
              >
                <span className="font-azonix">Confirm</span>
              </a>
            </>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stepper;
