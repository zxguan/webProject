import request from '../utils/request.js'
// 查询绑定课程信息
export function getStudentCourseApi(data){
    return request({
        url:'/getStudentCouresList',
        method:'post',
        data:data
    })
}

// 修改
export function updateStudentCourseApi(data){
    return request({
        url:'/updateStudentCouresScore',
        method:'post',
        data:data
    })
}
export function addStudentCouresApi(data){
    return request({
        url:'/addStudentCoures',
        method:'get',
        params:data
    })
}