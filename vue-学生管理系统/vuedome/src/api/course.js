import request from '../utils/request.js'
// 课程

// 查询
export function getCourseApi(data){
    return request({
        url:'/getCouresListByName',
        method:'post',
        data:data
    })
}
// 添加
export function addCourseApi(data){
    return request({
        url:'/addCoures',
        method:'post',
        data:data
    })
}
// 修改
export function updateCourseApi(data){
    return request({
        url:'/updateCoures',
        method:'post',
        data:data
    })
}
// 删除
export function delCourseApi(data){
    return request({
        url:'/deleteCoures',
        method:'post',
        data:data
    })
}
