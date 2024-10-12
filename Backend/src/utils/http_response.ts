import { ErrorType } from "./exceptions";

class HttpResponse {
    #statusCode: number;
    data: any;
    error: ErrorType | null;
    message: string;

    constructor({
        statusCode,
        data,
        error,
        message,
    }: {
        statusCode?: number;
        data?: any;
        error?: ErrorType;
        message?: string;
    }) {
        this.#statusCode = statusCode ?? 200;
        this.data = data ?? null;
        this.error = error ?? null;
        this.message = message ?? "";
    }

    static fromException(exception: {
        statusCode: number;
        error: ErrorType;
        message: string;
    }) {
        return new HttpResponse({
            statusCode: exception.statusCode,
            error: exception.error,
            message: exception.message,
            data: null,
        });
    }

    get statusCode() {
        return this.#statusCode;
    }
}

export default HttpResponse;
