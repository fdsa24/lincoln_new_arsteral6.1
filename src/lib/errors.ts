export class AppError extends Error {
  constructor(public readonly code: string, public readonly status = 400, public readonly retryAfter?: number) {
    super(code); this.name = 'AppError';
  }
}
export const ERROR_MESSAGES: Record<string, string> = {
  INVALID_INPUT: '입력 형식을 확인해 주세요. 질문은 1~4,000자입니다.',
  BODY_TOO_LARGE: '전송한 내용이 너무 큽니다. 질문을 짧게 나누어 주세요.',
  ORIGIN_DENIED: '접속 주소 설정이 맞지 않습니다. 안내서의 APP_ORIGIN 항목을 확인해 주세요.',
  ACCESS_DENIED: '수업 입장 코드를 확인해 주세요.',
  NO_SESSION_COOKIE: '브라우저의 쿠키를 허용한 뒤 페이지를 새로고침해 주세요.',
  NOT_FOUND: '대화가 없거나 만료되었습니다. 새 대화를 만들어 주세요.',
  RATE_LIMIT: '이용 횟수 상한에 도달했습니다. 잠시 후 다시 시도하거나 운영자에게 문의하세요.',
  SESSION_LIMIT: '대화방 또는 질문 수 상한입니다. 불필요한 대화를 삭제하거나 새 대화를 만들어 주세요.',
  BUSY: '이 대화의 답변이 아직 처리 중입니다. 잠시 후 대화를 다시 불러오세요.',
  REQUEST_CONFLICT: '같은 요청 번호에 다른 내용이 들어왔습니다. 새 질문으로 제출해 주세요.',
  MODEL_BLOCKED: '이번 요청의 답변을 제공하지 못했습니다. 사료 분석이나 역사적 사실 확인 형태로 질문해 보세요.',
  MODEL_TIMEOUT: 'AI 응답 대기 시간이 초과되었습니다. 대화를 다시 불러와 처리 상태를 확인해 주세요.',
  MODEL_BUSY: 'AI 서비스가 혼잡합니다. 잠시 후 다시 시도해 주세요.',
  MODEL_UNAVAILABLE: '모델 이름 또는 이용 권한을 확인해야 합니다. 운영자에게 문의하세요.',
  INVALID_MODEL_OUTPUT: 'AI 답변 형식·인용 검사를 통과하지 못해 대사를 표시하지 않았습니다.',
  CONFIG_ERROR: '서버 설정이 아직 완료되지 않았습니다. 실제 AI 연결 안내서를 확인해 주세요.',
  INTERNAL_ERROR: '처리 중 오류가 발생했습니다. 잠시 후 대화를 다시 불러오세요.',
};
export function messageFor(code: string): string { return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.INTERNAL_ERROR; }
