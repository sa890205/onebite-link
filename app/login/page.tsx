import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="로그인"
      footerText="계정이 없으신가요?"
      footerHref="/signup"
      footerLinkLabel="회원가입"
    >
      <LoginForm />
    </AuthShell>
  );
}
