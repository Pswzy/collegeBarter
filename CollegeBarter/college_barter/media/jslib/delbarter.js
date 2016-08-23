/**
 * Created with PyCharm.
 * User: 志勇
 * Date: 15-6-4
 * Time: 上午11:05
 * To change this template use File | Settings | File Templates.
 */
function del(that){
    var bartersha1 = $(that).parent().parent().attr('sha1');
    var data={"type":"delete-barter","barterSha1":bartersha1};
    var post_data = {"data":JSON.stringify(data)};
    $.post("/request/",post_data,function (data){
        if(data.ret!='1101'){
            alert(data.info);
            return;
        }
        $(that).parents('.barter').remove();
    },'json');
}