/**
 * Created with PyCharm.
 * User: 志勇
 * Date: 15-6-4
 * Time: 上午10:49
 * To change this template use File | Settings | File Templates.
 */
function logout(){
    var data={"type":"logout"};
    var post_data = {"data":JSON.stringify(data)};
    $.post("/request/",post_data,function (data){
        location.href="/login";
    });
}