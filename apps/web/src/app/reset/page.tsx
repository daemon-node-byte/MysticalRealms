import PasswordResetForm from "@/components/auth/PasswordResetForm";
import { resetPassword } from "./action";

export default function PasswordResetPage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div>
        <h1>Reset Password</h1>
        <PasswordResetForm onSubmit={resetPassword} />
      </div>
    </main>
  );
}
