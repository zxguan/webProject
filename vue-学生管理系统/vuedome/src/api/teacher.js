import request from '../utils/request.js'
// 老师

// 查询
export function getTeacherApi(data){
    return request({
        url:'/getTeacherList',
        method:'post',
        data:data
    })
}
// 添加
export function addTeacherApi(data){
    return request({
        url:'/addTeacher',
        method:'post',
        data:data
    })
}
// 修改
export function updateTeacherApi(data){
    return request({
        url:'/updateTeacher',
        method:'post',
        data:data
    })
}
// 删除
export function delTeacherApi(data){
    return request({
        url:'/deleteTeacher',
        method:'post',
        data:data
    })
}