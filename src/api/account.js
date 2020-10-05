import service from '../utils/request';

export function Login(data) {
    return service.request({
        url: "/login/",
        method: "post",
        data
        //data: data
        //params:data
    })
}

export function GetCode(data) {
    return service.request({
        url: "/getSms/",
        method: "post",
        data
        //data: data
        //params:data
    })
}