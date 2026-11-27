import { isAuthRetryableFetchError, type AuthError } from "@supabase/supabase-js";

const MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  email_address_invalid: "사용할 수 없는 이메일 주소입니다.",
  email_address_not_authorized: "가입이 허용되지 않은 이메일 주소입니다.",
  validation_failed: "이메일 형식이 올바르지 않습니다.",
  weak_password: "비밀번호가 너무 짧거나 단순합니다. 더 안전한 비밀번호를 입력해주세요.",
  signup_disabled: "현재 회원가입이 중단되어 있습니다.",
  email_provider_disabled: "현재 이메일 회원가입을 사용할 수 없습니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
  over_email_send_rate_limit: "이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
};

export const DEFAULT_SIGNUP_ERROR = "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";

export function toSignupErrorMessage(error: AuthError) {
  if (isAuthRetryableFetchError(error)) {
    return "서버에 연결하지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해주세요.";
  }
  return MESSAGES[error.code ?? ""] ?? DEFAULT_SIGNUP_ERROR;
}
