class myError extends Error {
    constructor(status, message ){
        super(message)
        this.status = status;
        this.message = message;
    }
}
export default myError;