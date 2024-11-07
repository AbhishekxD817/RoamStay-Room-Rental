class ExpressErrors extends Error{
    constructor(status,message){
        super();
        this.status = status;
        this.message = message;
    }
}
export default ExpressErrors;