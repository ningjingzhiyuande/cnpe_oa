$(document).ready(function(){function t(t){return date=new Date(t),hour=Math.abs(18-date.getHours()),1>hour?0:7>hour?.5:1}function e(t,e){for(var a=0,r=0,d=0,n=0;e>n;n++){var i=new Date(t.getFullYear()+"/"+(t.getMonth()+1)+"/"+(t.getDate()+n)+" 00:00");console.log("\u8ba1\u7b97days:"+i),rest_days.indexOf(i.format("yyyy/mm/dd"))>=0&&(a+=1),work_days.indexOf(i.format("yyyy/mm/dd"))>=0&&(r+=1),(0==i.getDay()||6==i.getDay())&&(d+=1)}return a+d-r}function a(a,r){a=new Date(a),r=new Date(r),s_hour=t(a),e_hour=Math.abs(t(r)-1);var d=new Date(a.getFullYear()+"/"+(a.getMonth()+1)+"/"+(a.getDate()+1)+" 00:00"),n=new Date(r.getFullYear()+"/"+(r.getMonth()+1)+"/"+r.getDate()+" 00:00");return diff=n-d,vdaysdiff=Math.floor(diff/1e3/60/60/24),rest_work_day=e(d,vdaysdiff),vdaysdiff+s_hour+e_hour-rest_work_day}function r(t,e){var a=e.attr("data-id"),r=$(e).attr("data-value"),d=s(a);"start_at_"+a==r&&this.setOptions({allowTimes:["09:00","12:00","13:00"],defaultTime:"09:00",minDate:new Date(d),maxDate:$(".end_at_"+a).val()?new Date($(".end_at_"+a).val()):!1}),"end_at_"+a==r&&this.setOptions({allowTimes:["12:00","13:00","18:00"],defaultTime:"18:00",minDate:new Date($(".start_at_"+a).val()?$(".start_at_"+a).val():d)})}function d(t){var e=$.datepicker.noWeekends(t);if(e[0])return n(t);for(flag=n(t)[0],i=0;i<work_days.length;i++)if(month=parseInt(work_days[i].split("/")[1]),day=parseInt(work_days[i].split("/")[2]),t.getMonth()==month-1&&t.getDate()==day&&flag)return[!0,""];return[!1,""]}function n(t){for(i=0;i<rest_days.length;i++)if(month=parseInt(rest_days[i].split("/")[1]),day=parseInt(rest_days[i].split("/")[2]),t.getMonth()==month-1&&t.getDate()==day)return[!1,""];return[!0,""]}$(".leave_kind").click(function(){data_id=$(this).attr("data-id"),$(this).prop("checked")?$("li.kind_"+data_id).show():$("li.kind_"+data_id).hide()}),$(".datetimepicker1").datetimepicker({format:"Y/m/d  H:i",firstDay:0,lang:"ch",closeOnDateSelect:!0,defaultTime:"09:00",onShow:r,beforeShowDay:d,onClose:function(t,e){data_id=e.attr("data-id"),start_at=$(".start_at_"+data_id).val(),end_at=$(".end_at_"+data_id).val(),""!=start_at&&""!=end_at&&(days=a(start_at,end_at),$("#select_days_"+data_id).val(days))}});var s=function(t){var e=[];return console.log(t),$(".leave_kind:checkbox:checked").each(function(){var a=$(this).attr("data-id");console.log($("#start_at_"+a).val()),a!=t&&""!=$("#start_at_"+a).val()&&e.push($("#start_at_"+a).val()),a!=t&&""!=$(".end_at_"+a).val()&&e.push($(".end_at_"+a).val())}),0==e.length?new Date:(console.log(e.sort()),new Date(e.sort()[e.length-1]))};$(".new_leave").on("submit",function(){$(".leave_kind:checkbox:checked").each(function(){var t=$(this).attr("data-id");$("#start_at_"+t).rules("add",{required:!0,messages:{required:"\u8bf7\u586b\u5199\u8bf7\u5047\u8d77\u59cb\u65e5\u671f"}}),$("#end_at_"+t).rules("add",{required:!0,messages:{required:"\u8bf7\u586b\u5199\u8bf7\u5047\u7ed3\u675f\u65e5\u671f"}})})}),$(".new_leave").validate({errorElement:"b",rules:{"leave[title]":"required","leave[leave_details_attributes][kind][]":"required"},messages:{"leave[title]":"\u4e0d\u80fd\u4e3a\u7a7a","leave[leave_details_attributes][kind][]":"\u9009\u62e9\u8bf7\u5047\u7c7b\u578b"}})});