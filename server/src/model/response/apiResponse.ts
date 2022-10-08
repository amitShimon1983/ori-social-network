export class ApiResponse {
    payload: { [key: string]: any };
    errors?: string[];
    status = 400;
    setErrors(errors: string[]) {
        this.errors = errors;
        this.status = 400;
    }
    setPayload(payload: { [key: string]: any }) {
        this.payload = payload;
        this.status = 200;
    }
}