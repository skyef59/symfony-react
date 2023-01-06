import axios from 'axios';
import Notify from '../components/Notify';

const Auth = (username, password) => {
    axios.post("http://localhost:8080/auth", {username, password})
    .then(res => {
        window.location.reload();
        localStorage.setItem("jwt_token", res.data.token);
    })
    .catch(error => {
        Notify("Veuillez vérifier vos identifiants", 'error');
    });
}

export default Auth;