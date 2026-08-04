import { PlayCircle } from "lucide-react";

/*
Supported video types

youtube
firebase
vimeo
mp4

Later these values will come from Firestore.
*/

const lesson = {
  title: "Introduction to Robotics",
  duration: "18 Minutes",
  videoType: "youtube",
  videoId: "dQw4w9WgXcQ",
};

export default function VideoPlayer() {
  function renderPlayer() {
    switch (lesson.videoType) {
      case "youtube":
        return (
          <iframe
            className="aspect-video w-full rounded-xl"
            src={`https://www.youtube.com/embed/${lesson.videoId}`}
            title={lesson.title}
            allowFullScreen
          />
        );

      case "vimeo":
        return (
          <iframe
            className="aspect-video w-full rounded-xl"
            src={`https://player.vimeo.com/video/${lesson.videoId}`}
            title={lesson.title}
            allowFullScreen
          />
        );

      case "firebase":
      case "mp4":
        return (
          <video
            controls
            className="aspect-video w-full rounded-xl"
          >
            <source
              src={lesson.videoId}
              type="video/mp4"
            />
          </video>
        );

      default:
        return (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-slate-200">
            No video available
          </div>
        );
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <PlayCircle
          className="text-blue-600"
          size={28}
        />

        <div>

          <h2 className="text-2xl font-bold">
            {lesson.title}
          </h2>

          <p className="text-slate-500">
            Duration : {lesson.duration}
          </p>

        </div>

      </div>

      {renderPlayer()}

    </div>
  );
}