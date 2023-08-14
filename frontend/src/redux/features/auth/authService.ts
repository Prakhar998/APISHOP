import axios from "axios";
import { toast } from "react-toastify";

//register user
const register = async (userData:any) => {

    const res = await axios.post('/api/users/signup',userData);

    return res.data;
}



//login user
const accountVerify = async (userData:any) => {

    const res = await axios.post('/api/users/verifyEmail',userData);
    await toast.success('Account Verified, Now you can Login.');
    return res.data;
}

//login user
const login = async (userData:any) => {

    const res = await axios.post('/api/users/signin',userData);
    await toast.success('Login Successfully!');
    return res.data;
}


//logout user
const logout = async () => {

    const res = await axios.post('/api/users/signout');
    await toast.success('Logout Successfully!');
    return res.data;
}


//logged user
const checkUser = async () => {

    const res = await axios.get('/api/users/profile');
    return res.data;
}

const authService = {register, login,logout, checkUser, accountVerify };

export default authService;