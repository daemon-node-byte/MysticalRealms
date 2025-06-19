import SignUpForm from "@/components/auth/SignUpForm";
import { signup } from "./action";

export default function SignUpPage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div>
        <h1>Sign Up</h1>
        <SignUpForm onSubmit={signup} />
      </div>
    </main>
  );
}
