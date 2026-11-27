"use client";

import { useCallback, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/ui/Toast";
import { DEFAULT_SIGNUP_ERROR, toSignupErrorMessage } from "@/lib/auth-errors";
import { createClient } from "@/utils/supabase/client";
import AuthInput from "./AuthInput";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  // 같은 오류가 다시 나도 토스트가 새로 뜨도록 id를 함께 둔다
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  // state가 화면에 반영되기 전의 연속 제출까지 막기 위한 플래그
  const submittingRef = useRef(false);
  const succeededRef = useRef(false);

  const filled = email.trim() !== "" && password !== "" && passwordConfirm !== "";

  const closeToast = useCallback(() => setToast(null), []);

  function showError(message: string) {
    setToast((prev) => ({ id: (prev?.id ?? 0) + 1, message }));
  }

  // Cache Components는 페이지를 이동해도 상태를 보존하므로, 벗어날 때 토스트를 지우고
  // 가입에 성공했다면 입력값도 초기화한다
  useLayoutEffect(() => {
    return () => {
      setToast(null);
      if (!succeededRef.current) return;
      succeededRef.current = false;
      submittingRef.current = false;
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setLoading(false);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!filled || submittingRef.current) return;
    if (password !== passwordConfirm) {
      showError("비밀번호가 일치하지 않습니다.");
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setToast(null);
    try {
      const { error } = await createClient().auth.signUp({ email: email.trim(), password });
      if (error) {
        showError(toSignupErrorMessage(error));
      } else {
        // 이동이 끝날 때까지 버튼은 비활성 상태로 둔다
        succeededRef.current = true;
        router.replace("/");
        return;
      }
    } catch {
      showError(DEFAULT_SIGNUP_ERROR);
    }
    submittingRef.current = false;
    setLoading(false);
  }

  return (
    // 브라우저 기본 검사 말풍선 대신 한국어 토스트로 안내하기 위해 noValidate를 사용한다
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <AuthInput
        id="email"
        label="이메일"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        readOnly={loading}
      />
      <AuthInput
        id="password"
        label="비밀번호"
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        readOnly={loading}
      />
      <AuthInput
        id="passwordConfirm"
        label="비밀번호 확인"
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호를 다시 입력하세요"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        readOnly={loading}
      />
      <button
        type="submit"
        disabled={!filled || loading}
        className="btn-primary mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading ? "가입 중..." : "회원가입"}
      </button>
      {toast && <Toast key={toast.id} message={toast.message} onClose={closeToast} />}
    </form>
  );
}
