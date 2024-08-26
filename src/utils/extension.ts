import { toast } from "react-toastify";
import { Button, Modal } from 'antd';

//======= Toast Alert =======
export const AlertSuccess = (message: string) => {
    toast.success(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertWarning = (message: string) => {
    toast.warning(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const AlertError = (message: string) => {
    toast.error(message ?? "", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}

export const getTimeNowAndOneMinute = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutesAddOneMinute = (now.getMinutes() + 1).toString().padStart(2, '0');

    const hoursAddOneMinute: string = `${hours}:${minutesAddOneMinute}`;

    return hoursAddOneMinute
}

