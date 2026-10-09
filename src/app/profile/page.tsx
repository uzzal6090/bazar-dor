import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileView from "@/components/profile/ProfileView";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileView />
    </ProtectedRoute>
  );
}