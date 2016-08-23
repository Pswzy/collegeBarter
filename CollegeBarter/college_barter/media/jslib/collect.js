/**
 * Created with PyCharm.
 * User: 志勇
 * Date: 15-6-4
 * Time: 上午10:57
 * To change this template use File | Settings | File Templates.
 */
function collect(that){
    var userName=username;
    var bartersha1 = $(that).parent().parent().attr('sha1');
    var is_collected=$(that).parent().parent().attr('colstatus');
    if( is_collected==0)
    {
        var data={"type":"collect-barter","userName":userName,"barterSha1":bartersha1};
        var post_data = {"data":JSON.stringify(data)};
        $.post("/request/",post_data,function (data){
            if(data.ret!='1101')
            {
                alert(data.info);
                return;
            }
            alert("收藏成功");
        },'json');
    }else if(is_collected==1){
        var data={"type":"uncollect-barter","userName":userName,"barterSha1":bartersha1};
        var post_data = {"data":JSON.stringify(data)};
        $.post("/request/",post_data,function (data){
            if(data.ret!='1101')
            {
                alert(data.info);
                return;
            }
            alert("取消收藏成功");
        },'json');
    }
}