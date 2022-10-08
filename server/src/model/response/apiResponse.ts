export class ApiResponse<TResponse> {
    payload: TResponse;
    errors?: string[];
    status = 400;
    setErrors(errors: string[]) {
        this.errors = errors;
        this.status = 400;
    }
    setPayload(payload: TResponse) {
        this.payload = payload;
        this.status = 200;
    }
}