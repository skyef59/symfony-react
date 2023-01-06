import axios from 'axios';
import Notify from '../components/Notify';

const GET = 'GET';
const POST = 'POST';
const DELETE = 'DELETE';
const PUT = 'PUT';

const ApiManager = (object, method, callback, data = {}) => {
    const baseUrl = 'http://localhost:8080/api/' + object;

    switch (method) {

        case GET:
            axios.get(baseUrl)
                .then(res => callback(res))
                .catch((error) => Notify("[" + error.response.status + "] Une erreur est survenue lors de la récupération des données", 'error'));
            break;

        case POST:
            axios.post(baseUrl, data)
                .then(res => {
                    Notify("Enregistrement effectué", 'success');
                    callback(res);
                })
                .catch((error) => Notify("[" + error.response.status + "] Une erreur est survenue lors de l'enregistrement", 'error'));
            break;

        case PUT:
            axios.put(baseUrl, data)
                .then(res => {
                    Notify("Modification effectuée", 'success');
                    callback(res);
                })
                .catch((error) => Notify("[" + error.response.status + "] Une erreur est survenue lors de la modification des données", 'error'));
            break;

        case DELETE:
            axios.delete(baseUrl)
                .then(res => {
                    Notify("Suppression effectuée", 'warning');
                    callback(res);
                })
                .catch((error) => Notify("[" + error.response.status + "] Une erreur est survenue lors de la suppression", 'error'));
            break;

        default:
            callback();
    }
};

export default ApiManager;