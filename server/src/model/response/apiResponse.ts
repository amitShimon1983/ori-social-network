export class ApiResponse {
    payload: any;
    errors?: string[];
    constructor(payload: any) {
        this.payload = payload;
    }
    setErrors(errors: string[]) {
        this.errors = errors;
    }
}