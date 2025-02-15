import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import MediaPose from "./components/Pose";
import Profile from "./components/Profile";

export default function App() {
  return (
<div>
<header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </header>
    <Profile/>
    <MediaPose/>
</div>
  );
}