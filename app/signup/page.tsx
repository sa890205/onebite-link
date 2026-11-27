import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="회원가입"
      footerText="이미 계정이 있으신가요?"
      footerHref="/login"
      footerLinkLabel="로그인"
    >
      <SignupForm />
    </AuthShell>
  );
}
