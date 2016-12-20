
/* $Id : selectzone.js 4824 2007-01-31 08:23:56Z paulgao $ */

/* *
 * SelectZone 类
 */
function SelectZone2()
{
    this.filters = new Object();
    this.id = arguments[0] ? arguments[0] : 1;     // 过滤条件
    this.sourceSel = arguments[1] ? arguments[1] : null;  // 1 商品关联 2 组合、赠品（带价格）
    this.targetSel = arguments[2] ? arguments[2] : null;  // 源   select 对象
    this.priceObj = arguments[3] ? arguments[3] : null;  // 目标 select 对象

    //this.filename  = location.href.substring((location.href.lastIndexOf("/")) + 1, location.href.lastIndexOf("?")) + "?is_ajax=1";
    //this.filename = "http://localhost/ecshop/admin/goods.php?is_ajax=1";
    //alert(this.filename);
    var _self = this;

    /**
     * 载入源select对象的options
     * @param   string      funcName    ajax函数名称
     * @param   function    response    处理函数
     */
    this.loadOptions = function(act, filters)
    {
        //Ajax.call(this.filename+"&act=" + act, filters, this.loadOptionsResponse, "GET", "JSON");
    }

    /**
     * 将返回的数据解析为options的形式
     * @param   result      返回的数据
     */
    this.loadOptionsResponse = function(result, txt)
    {
        if (!result.error)
        {
            _self.createOptions(_self.sourceSel, result.content);
        }

        if (result.message.length > 0)
        {
            alert(result.message);
        }
        return;
    }

    /**
     * 检查对象
     * @return boolean
     */
    this.check = function()
    {
        /* source select */
        if (!this.sourceSel)
        {
            return false;
        }
        else
        {
            if (this.sourceSel.nodeName != 'SELECT')
            {
                return false;
            }
        }

        /* target select */
        if (!this.targetSel)
        {
            return false;
        }
        else
        {
            if (this.targetSel.nodeName != 'SELECT')
            {
                return false;
            }
        }

        /* price object */
        if (this.id == 2 && !this.priceObj)
        {
            return false;
        }

        return true;
    }

    /**
     * 添加选中项
     * @param   boolean  all
     * @param   string   act
     * @param   mix      arguments   其他参数，下标从[2]开始
     */
    this.addItem2 = function(all, act)
    {
    	
        if (!this.check()) {
            return;
        }
        var selOpt = new Array();
        for (var i = 0; i < this.sourceSel.length; i++)
        {
            //如果option没有被选中，并且不是全选时
            if (!this.sourceSel.options[i].selected && all == false)
                continue;
            if (this.targetSel.length > 0) { //对象的长度大小0, 判断是否有相同的值在对象里面，如果要有过滤掉
                var exsits = false;
                for (var j = 0; j < this.targetSel.length; j++)
                {
                    if (this.targetSel.options[j].value == this.sourceSel.options[i].value)
                    {
                        exsits = true;
                        break;
                    }
                }
                if (!exsits)
                {
                    selOpt[selOpt.length] = this.sourceSel.options[i].value; //放入数组中
                }
            } else
            {
                selOpt[selOpt.length] = this.sourceSel.options[i].value; //放入数组中
            }
        }
        if (selOpt.length > 0)
        {
        	
            var class_ids = "";
//            搜索框的id属性名称
          //  var column_id = $("#column_id").val();
            for (var j = 0; j < selOpt.length; j++) {
            	
                class_ids += class_ids == "" ? selOpt[j] : "," + selOpt[j];
            }
//          alert("厂商关联分类------->id-》"+class_ids);
            var yiwei=new Array(); 
             yiwei=class_ids.split(",");
             var zidingyi_id=yiwei[0];//自定义的 id
             var code=yiwei[1];     //厂商的code
             var zidingyi_name=yiwei[2];
           
//            alert("厂商关联分类------->code"+code+"----id"+zidingyi_id+"---zidingyi_name"+zidingyi_name);

            var url ="/music/web/associated_vendor.action";
            var result = Object();
            $.post(url, {"zidingyi_name": zidingyi_name, "zidingyi_id": zidingyi_id,"code": code},
            function(data) {
                 try {
                	
                  addElement(_self.targetSel, data);
//                  alert("关联成功！");
               
                } catch (e) {
                    alert("JSON解析错误");
                }
                           
            });
        }
    }

    

    /**
     * 删除选中项
     * @param   boolean    all
     * @param   string     act
     */
    this.dropItem2 = function(all, act)
    {
        if (!this.check())
        {
            return;
        }
        var arr = new Array();
        for (var i = this.targetSel.length - 1; i >= 0; i--)
        {
            if (this.targetSel.options[i].selected || all)
            {
                arr[arr.length] = this.targetSel.options[i].value;
            }
        }
        if (arr.length > 0)
        {
            var ids = "";
           
            for (var j = 0; j < arr.length; j++)
            {
                ids += ids == "" ? arr[j] : "," + arr[j];
            }
//             alert(ids);
            var yiwei=new Array(); 
             yiwei=ids.split(",");
              var id=yiwei[0];
             var code=yiwei[1];
           
            var url = "/music/web/delVendor.action";
            $.post(
            	url, {"id": id,"code":code},
            function(data) {
            		  try {
                	
                  addElement(_self.targetSel, data);
//                  alert("取消成功！");
               
                } catch (e) {
                    alert("取消失败!");
                }
            		
                
            });
        }
    }


    
    
    
    
    /**
     * 处理添加项返回的函数
     */
    this.addRemoveItemResponse = function(result, txt)
    {
        if (result.ret == 1)
        {
            _self.createOptions(_self.targetSel, result.list);
        }
    }



    /**
     * 为select元素创建options
     */
    this.createOptions = function(obj, arr)
    {
        obj.length = 0;
        for (var i = 0; i < arr.length; i++)
        {
            var opt = document.createElement("OPTION");
            opt.value = arr[i].id;
            opt.text = arr[i].name;
            obj.options.add(opt);
        }
    }
}


function addElement(obj, list)
{
    obj.length = 0;
    if (list != null && list != "" && list != undefined)
    {
        for (var i = 0; i < list.length; i++)
        {
            var opt = document.createElement("OPTION");
            opt.value = list[i].id+","+list[i].code;
//            opt.value = list[i].id;
            opt.text = list[i].name;
            obj.options.add(opt);
        }
    }
}

function addElementobj(obj, data)
{
    obj.length = 0;
   var opt = document.createElement("OPTION");
            opt.value = data.id;
            opt.text = data.name;
            obj.options.add(opt);
}





