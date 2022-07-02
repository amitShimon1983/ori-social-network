export class ApiResponse {
    payload: any;
    errors?: string[];
    status: number = 400;
    setErrors(errors: string[]) {
        this.errors = errors;
        this.status = 400;
    }
    setPayload(payload: any) {
        this.payload = payload;
        this.status = 200;
    }
}