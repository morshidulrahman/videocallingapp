"use client";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState();
  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      alert("meeting created");
    } catch (error) {
      console.error(error);
      alert("error creating");
    }
  };

  if (!client || !user) return <h1>loading............</h1>;

  return (
    <div>
      <button
        onClick={createMeeting}
        className="bg-blue-500 px-4 py-2 rounded-lg"
      >
        Create Meeting
      </button>

      {callDetail && <div>Call ID: {callDetail.id}</div>}

      <div>
        <h2>Current User: {user.name}</h2>
        <h2>Current User ID: {user.id}</h2>
      </div>
    </div>
  );
};

export default MeetingTypeList;
