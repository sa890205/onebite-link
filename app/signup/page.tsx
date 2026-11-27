import AuthInput from "@/components/auth/AuthInput";
import AuthShell from "@/components/auth/AuthShell";

export default function SignupPage() {
  return (
    <AuthShell
      title="회원가입"
      footerText="이미 계정이 있으신가요?"
      footerHref="/login"
      footerLinkLabel="로그인"
    >
      <form className="flex flex-col gap-4">
        <AuthInput id="email" label="이메일" type="email" autoComplete="email" placeholder="you@example.com" />
        <AuthInput id="password" label="비밀번호" type="password" autoComplete="new-password" placeholder="비밀번호를 입력하세요" />
        <AuthInput id="passwordConfirm" label="비밀번호 확인" type="password" autoComplete="new-password" placeholder="비밀번호를 다시 입력하세요" />
        {/* 회원가입 기능 구현 전까지는 제출되지 않도록 type="button"으로 둔다 */}
        <button type="button" className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white">
          회원가입
        </button>
      </form>
    </AuthShell>
  );
}
