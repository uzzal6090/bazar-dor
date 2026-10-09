import ProtectedRoute from "@/components/auth/ProtectedRoute";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";

export default function UpdateProfilePage() {
  return (
    <ProtectedRoute>
      <UpdateProfileForm />
    </ProtectedRoute>
  );
}