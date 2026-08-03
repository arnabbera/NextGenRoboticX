import WelcomeBanner from "../components/WelcomeBanner";
import ProfileCard from "../components/ProfileCard";
import StatsCards from "../components/StatsCards";
import ContinueLearning from "../components/ContinueLearning";
import UpcomingGoals from "../components/UpcomingGoals";

import Courses from "../../courses/pages/Courses";

export default function Dashboard() {
  return (
    <div className="space-y-8">

      <WelcomeBanner />

      <ProfileCard />

      <StatsCards />

      <div className="grid gap-6 lg:grid-cols-3">

        <ContinueLearning />

        <UpcomingGoals />

      </div>

      <Courses />

    </div>
  );
}