import SignInForm from "@/components/auth/SignInForm";
import { login } from "./action";

export default function SignInPage() {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div>
        <h1>Sign In</h1>
        <SignInForm onSubmit={login}  />
      </div>
    </main>
  );
}
