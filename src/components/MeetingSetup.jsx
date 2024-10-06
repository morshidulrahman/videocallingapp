import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const MeetingSetup = ({ setIsSetupComplete }) => {
  const [mictoggleon, setmictoogleon] = useState(false);
  const calls = useCall();

  if (!calls) throw new Error("use call is must be component");

  useEffect(() => {
    if (mictoggleon) {
      calls?.camera.disable();
      calls?.microphone.disable();
    } else {
      calls?.camera.enable();
      calls?.microphone.enable();
    }
  }, [mictoggleon, calls?.camera, calls?.microphone]);
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4 flex-col">
      <h1 className="  font-bold text-2xl">meeting setup</h1>
      <VideoPreview />
      <div className="flex gpa-2 items-center text-xl h-10">
        <input
          type="checkbox"
          checked={mictoggleon}
          onChange={(e) => setmictoogleon(e.target.checked)}
        />
        <span className="pl-2"> Mic and camera disabled</span>
      </div>
      <div className="mt-4 bg-blue-500 text-white rounded-md px-4 py-3">
        <button
          onClick={() => {
            calls.join();
            setIsSetupComplete(true);
          }}
        >
          join metting
        </button>
      </div>
    </div>
  );
};

export default MeetingSetup;
