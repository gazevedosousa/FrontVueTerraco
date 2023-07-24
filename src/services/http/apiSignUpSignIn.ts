import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const httpClient = axios.create({
    baseURL: 'https://apiterraco.azurewebsites.net/',
});

class ApiService {

    get(url: string){
        return httpClient.get(url);
    }

    post(url: string, objeto: string){
        return httpClient.post(url, objeto);
    }

    put(url: string, objeto: string){
        return httpClient.put(url, objeto);
    }

    putWithoutObject(url: string){
        return httpClient.put(url);
    }

    delete(url: string){
        return httpClient.delete(url);
    }
}

export default ApiService;