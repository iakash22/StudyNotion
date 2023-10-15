import axios from 'axios';

const Instance = axios.create({});
const apiConnector = async(method,url,bodyData,header,params) => {
    return  Instance({
        method : `${method}`,
        url : `${url}`,
        data : bodyData ? bodyData : null,
        headers : header ? header : null,
        params : params ? params : null,
    });
}

export default apiConnector;