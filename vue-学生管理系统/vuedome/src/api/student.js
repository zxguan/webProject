import request from '../utils/request.js'
// 学生管理

// 查询
export function getStudenApi(data){
    return request({
        url:'/getStudenList',
        method:'get',
        params:data
    })
}
// 修改
export function updateStudenApi(data){
    return request({
        url:'/updateStuden',
        method:'get',
        params:data
    })
}
// 添加
export function addStudenApi(data){
    return request({
        url:'/addStuden',
        method:'get',
        params:data
    })
}
// 删除
export function delStudenApi(data){
    return request({
        url:'/deleteStudentById',
        method:'DELETE',
        params:data
    })
}
