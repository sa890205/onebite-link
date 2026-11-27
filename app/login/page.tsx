import AuthInput from "@/components/auth/AuthInput";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginPage() {
  return (
    <AuthShell
      title="로그인"
      footerText="계정이 없으신가요?"
      footerHref="/signup"
      footerLinkLabel="회원가입"
    >
      <form className="flex flex-col gap-4">
        <AuthInput id="email" label="이메일" type="email" autoComplete="email" placeholder="you@example.com" />
        <AuthInput id="password" label="비밀번호" type="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요" />
        {/* 로그인 기능 구현 전까지는 제출되지 않도록 type="button"으로 둔다 */}
        <button type="button" className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white">
          로그인
        </button>
      </form>
    </AuthShell>
  );
}
