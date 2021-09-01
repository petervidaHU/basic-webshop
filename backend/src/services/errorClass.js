export class AuthenticationError extends Error {
    constructor(message = 'Invalid credentials.', status = 401) {
        super(message);
        this.name = 'Authentication error';
        this.statusCode = status;
    }
}

export class AuthorizationError extends Error {
    constructor(message = 'Unauthorized pass attempt', status = 403) {
        super(message);
        this.name = 'Authorization error';
        this.statusCode = status;
    }
}

export class ValidationError extends Error {
    constructor(message, status = 400) {
        console.log('classban: ',message)
        super(message);
        this.name = 'Validation error';
        this.statusCode = status;
    }
}

export class DatabaseError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.name = 'Database or Server error';
        this.statusCode = status;
    }
}

