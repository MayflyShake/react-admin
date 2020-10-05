import service from '../utils/request';

export function infoList(data) {
    return service.request({
        url: "/login/",
        method: "post",
        data
        //data: data
        //params:data
    })
}

export function infoDetail(data) {
    return service.request({
        url: "/login/",
        method: "post",
        data
        //data: data
        //params:data
    })
}