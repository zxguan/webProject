//导入axios实例，给它取了一个名字是request
// request -> axios实例
import request from '../utils/request.js'

// 函数：查询班级信息请求
// 发送url地址： /api/getGradeListByName
// 服务器接口地址：http://blog.coldworld.top:8080/getGradeListByName
export function getGradeApi(data){
    return request({
        url:'/getGradeListByName',
        method:'post',
        data:data
    })
}

// 删除班级信息的请求
export function delGradeApi(data){
    return request({
        url:'/deleteGrade',
        method:'post',
        data:data
    })
}

// 添加班级信息的请求
export function addGradeApi(data){
    return request({
        url:'/addGrade',
        method:'post',
        data:data
    })
}

// 修改班级信息的请求
export function updateGradeApi(data){
    return request({
        url:'/updateGrade',
        method:'post',
        data:data
    })
}

