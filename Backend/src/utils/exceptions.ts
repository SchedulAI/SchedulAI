//Union type
export type ErrorType =
    | "NOT_FOUND"
    | "CONFLICT"
    | "BAD_REQUEST"
    | "INTERNAL_SERVER_ERROR"
    | "UNAUTHORIZED"
    | "FORBIDDEN";

export class Exception extends Error {
    #error: ErrorType;
    #statusCode: number;

    constructor({
        error,
        statusCode,
        message,
    }: {
        error: ErrorType;
        statusCode: number;
        message: string;
    }) {
        super(message); // Utiliza o message da classe Error
        this.#error = error;
        this.#statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Restaura o protótipo da cadeia de herança
    }

    get error() {
        return this.#error;
    }

    get statusCode() {
        return this.#statusCode;
    }

    get message() {
        return super.message;
    }
}

export class InternalServerException extends Exception {
    constructor(message: string) {
        super({
            error: "INTERNAL_SERVER_ERROR",
            statusCode: 500,
            message: message,
        });
    }
}

export class BadRequestException extends Exception {
    constructor(message: string) {
        super({ error: "BAD_REQUEST", statusCode: 400, message: message });
    }
}

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super({ error: "UNAUTHORIZED", statusCode: 401, message: message });
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) {
        super({ error: "NOT_FOUND", statusCode: 404, message: message });
    }
}

export class ConflictException extends Exception {
    constructor(message: string) {
        super({ error: "CONFLICT", statusCode: 409, message: message });
    }
}

export class ForbiddenException extends Exception {
    constructor(message: string) {
        super({ error: "FORBIDDEN", statusCode: 403, message: message });
    }
}
