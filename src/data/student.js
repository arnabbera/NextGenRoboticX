const student = {
  profile: {
    id: "STU-1001",
    firstName: "Arnab",
    lastName: "Bera",
    fullName: "Arnab Bera",
    email: "student@nextgenroboticx.com",
    avatar: "/images/avatar.png",
    designation: "Robotics Student",
    joinedOn: "2026-01-15",
  },

  statistics: {
    enrolledCourses: 6,
    completedCourses: 2,
    certificates: 2,
    learningHours: 42,
    overallProgress: 68,
    learningStreak: 15,
    quizzesCompleted: 18,
    projectsSubmitted: 5,
  },

  currentCourse: {
    id: "robotics-foundation",
    title: "Robotics Foundation",
    chapter: "Chapter 4",
    lesson: "Sensors & Actuators",
    progress: 68,
    estimatedTimeLeft: "3 Hours",
    nextLesson: "Ultrasonic Sensor",
  },

  achievements: [
    {
      id: 1,
      title: "First Robot",
      icon: "🤖",
      earned: true,
    },
    {
      id: 2,
      title: "Arduino Expert",
      icon: "⚡",
      earned: true,
    },
    {
      id: 3,
      title: "IoT Explorer",
      icon: "🌐",
      earned: false,
    },
    {
      id: 4,
      title: "Drone Pilot",
      icon: "🚁",
      earned: false,
    },
  ],

  certificates: [
    {
      id: "CERT-1001",
      course: "Arduino Programming",
      issuedOn: "2026-06-15",
      score: 88,
      verified: true,
    },
    {
      id: "CERT-1002",
      course: "Embedded Systems Basics",
      issuedOn: "2026-07-01",
      score: 91,
      verified: true,
    },
  ],

  goals: [
    {
      id: 1,
      title: "Finish Chapter 4",
      completed: true,
    },
    {
      id: 2,
      title: "Complete Lesson Quiz",
      completed: false,
    },
    {
      id: 3,
      title: "Upload Arduino Project",
      completed: false,
    },
    {
      id: 4,
      title: "Schedule Certification Exam",
      completed: false,
    },
  ],

  recentActivities: [
    {
      id: 1,
      type: "Lesson",
      title: "Completed Servo Motor Lesson",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Quiz",
      title: "Passed Sensors Quiz",
      time: "Yesterday",
    },
    {
      id: 3,
      type: "Project",
      title: "Uploaded Line Follower Robot",
      time: "3 days ago",
    },
  ],

  notifications: [
    {
      id: 1,
      title: "New Robotics Project Available",
      read: false,
    },
    {
      id: 2,
      title: "Certificate Ready for Download",
      read: true,
    },
  ],
};

export default student;