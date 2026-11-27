import { isAuthRetryableFetchError, type AuthError } from "@supabase/supabase-js";

const COMMON_MESSAGES: Record<string, string> = {
  validation_failed: "이메일 형식이 올바르지 않습니다.",
  email_provider_disabled: "현재 이메일 인증을 사용할 수 없습니다.",
  over_request_rate_limit: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
};

const SIGNUP_MESSAGES: Record<string, string> = {
  user_already_exists: "이미 가입된 이메일입니다.",
  email_exists: "이미 가입된 이메일입니다.",
  email_address_invalid: "사용할 수 없는 이메일 주소입니다.",
  email_address_not_authorized: "가입이 허용되지 않은 이메일 주소입니다.",
  weak_password: "비밀번호가 너무 짧거나 단순합니다. 더 안전한 비밀번호를 입력해주세요.",
  signup_disabled: "현재 회원가입이 중단되어 있습니다.",
  over_email_send_rate_limit: "이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
};

const LOGIN_MESSAGES: Record<string, string> = {
  invalid_credentials: "이메일 또는 비밀번호가 올바르지 않습니다.",
  email_not_confirmed: "이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요.",
  user_banned: "이용이 제한된 계정입니다.",
};

export const DEFAULT_SIGNUP_ERROR = "회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.";
export const DEFAULT_LOGIN_ERROR = "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";

function toMessage(error: AuthError, messages: Record<string, string>, fallback: string) {
  if (isAuthRetryableFetchError(error)) {
    return "서버에 연결하지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해주세요.";
  }
  const code = error.code ?? "";
  return messages[code] ?? COMMON_MESSAGES[code] ?? fallback;
}

export function toSignupErrorMessage(error: AuthError) {
  return toMessage(error, SIGNUP_MESSAGES, DEFAULT_SIGNUP_ERROR);
}

export function toLoginErrorMessage(error: AuthError) {
  return toMessage(error, LOGIN_MESSAGES, DEFAULT_LOGIN_ERROR);
}
