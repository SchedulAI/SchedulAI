// Interface para respostas com erro
interface ErrorResponse {
  success: false;
  error:
    | 'NOT_FOUND'
    | 'CONFLICT'
    | 'BAD_REQUEST'
    | 'INTERNAL_SERVER_ERROR'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN';
  message: string;
}

// Interface para respostas com sucesso
interface SuccessResponse<T> {
  success: true;
  data: T;
  message: string;
}

export type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
