import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ErrorHandler {
    public showError(err: any) {
        if (typeof err === 'string') {
            console.log(err);
            toast.error(err);
        } else if (err.response) {
            console.log(err.response.data);
            toast.error(err.response.data);
        } else if (err.message) {
            console.log(err.message);
            toast.error(err.message);
        } else {
            console.log(err);
            console.log('Oops! Something went wrong...');
            toast.error('Oops! Something went wrong...');
        }
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;
