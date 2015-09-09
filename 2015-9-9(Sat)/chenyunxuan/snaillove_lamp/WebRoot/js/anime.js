/*************************
 *
 * @Auth: Xlc
 * @Data: 2013-11-11
 * @Desc: Anime相关JS
 *
 *************************/

var Basic =
        {
            jsPath: null,
            cssPath: null,
            imgPath: null,
            path: null,
            uploadPath: null,
            confirmDel: function()
            {
                if (confirm("确定要删除!")) {
                    return true;
                } else {
                    return false;
                }
            },
            selectAll: function()
            {
                $("input[name='cid']").each(function(index, element) {
                    this.checked = !this.checked;
                });
            },
            batch: function(url)
            {
                var ids = "";
                $("input[name='cid']").each(function(index, element) {
                    if (this.checked == true) {
                        var val = $(this).val();
                        ids += val + ",";
                    }
                });
                if (ids != "") {
                    ids = ids.substr(0, ids.length - 1);
                    $.post(url, {"sign": $("#sign").val(), "ids": ids},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1) {
                                window.location.reload();
                            } else {
                                // alert(data.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误");
                        }
                    });
                } else {
                    alert("请选择信息!");
                }
            }
        }
var AnimeClass =
        {
            save: function()
            {
                var Name = $("#name").val();
                var Rid = $("#rid").val();
                var Id = $("#id").val();
                var Status = $("#status").val();
                var Sort = $("#sort").val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("分类名称不能为空!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysAnimeClass/save.html";
                    $.post(url, {"id": Id, "rid": Rid, "status": Status, "name": Name, "sort": Sort},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysAnimeClass/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            addClass: function() {
                window.location.href = Basic.path + "/SysAnimeClass/form.html";
            },
            Return: function() {
                window.location.href = Basic.path + "/SysAnimeClass/index.html";
            },
            confirmDel: function(id)
            {
                try {
                    if (confirm("确定要删除!")) {
                        var url = Basic.path + "/SysAnimeClass/del.html";
                        $.get(url, {id: id}, function(msg) {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/SysAnimeClass/index.html";
                            } else {
                                alert(data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            },
            batch: function()
            {
                var url = Basic.path + "/SysAnimeClass/batch.html";
                Basic.batch(url);
            }
        }


var AnimeProperty =
        {
            confirmDel: function(id)
            {
                try {
                    if (confirm("确定要删除!")) {
                        var url = Basic.path + "/SysAnimeProperty/del.html";
                        $.get(url, {id: id}, function(msg) {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/SysAnimeProperty/index.html";
                            } else {
                                alert(data.msg);
                            }
                        })
                    } else {
                        return false;
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            },
            save: function()
            {

                var Name = $("#name").val();
                var Sign = $("#sign").val();
                var Coverpath = $('#path').val();
                var Path_old = $('#path_old').val();
                var Sort = $("#sort").val();
                var Description = $('#description').val();
                var Id = $("#id").val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("名称不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(Coverpath) == "") {
                    $("#error").html("请上传图片!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysAnimeProperty/save.html";
                    $.post(url, {"id": Id, "sign": Sign, "name": Name, "coverpath": Coverpath, "path_old": Path_old, "sort": Sort, "description": Description},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysAnimeProperty/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            addProperty: function() {
                window.location.href = Basic.path + "/SysAnimeProperty/form.html";
            },
            returnProperty: function() {
                window.location.href = Basic.path + "/SysAnimeProperty/index.html";
            },
            propertyInit: function(name, w, h)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#path").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
        }



var Anime =
        {
            AnimeBatch: function()
            {
                var url = Basic.path + "/SysAnime/batch.html";
                Basic.batch(url);
            },
            sectionSave: function() {
                var Name = $('#title').val();
                var Duration = $('#duration').val();
                var Thumbnail = $('#thumbnail').val();
                if (Check.trim(Name) == "") {
                    $("#error").html("视频名称不能为空!");
                    return false;
                }
                if (Check.trim(Duration) == "") {
                    $("#error").html("视频时长不能为空!");
                    return false;
                }
                if (Check.trim(Thumbnail) == "") {
                    $("#error").html("请上传图片!");
                    return false;
                }
            },
            animeSave: function() {
                var Name = $('#name').val();
                var Class_id = $('#class_id').val();
                var Agesection_id = $('#agesection_id').val();
                var Thumbnail = $('#thumbnail').val();
                var Episode_count = $('#episode_count').val();
                var Episode_updated = $('#episode_updated').val();
                if (Check.trim(Class_id) == "") {
                    $("#error").html("请选择分类!");
                    return false;
                }
                if (Check.trim(Agesection_id) == "") {
                    $("#error").html("请选择年龄段!");
                    return false;
                }
                if (Check.trim(Name) == "") {
                    $("#error").html("动画片名称不能为空!");
                    return false;
                }
                if (Check.trim(Episode_count) == "") {
                    $("#error").html("总级数不能为空!");
                    return false;
                }
                if (Check.trim(Episode_updated) == "") {
                    $("#error").html("请填写更新至多少是集!");
                    return false;
                }
                if (Check.trim(Thumbnail) == "") {
                    $("#error").html("请上传节目图片!");
                    return false;
                }
            },
            animeAudio: function()
            {
                $('#files_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadVideo.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择视频文件', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    // 'fileTypeDesc': 'Files', //只允许上传图像
                    'fileTypeExts': '*.avi;*.wma;*.rmvb;*.rm;*.mp4;*.mp3', //限制允许上传的文件后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                $('#filesize').html('');
                                $("#filePath").val(r.file);
                                $('#filePath_url').html(file.name);
                                $('#filesize').html(r.msg);
                            } else {
                                $('#filesize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
           import1: function()
            {
                var show_id = $("#show_id").val();
                $("#error").html("正在获取中........");
                if (show_id != "")
                {
                    var url = Basic.path + "/SysAnime/executeImport.html";
                    $.post(url, {"show_id": show_id},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1) {
                                window.location.href = Basic.path + "/SysAnime/form.html?id=" + data.anime_id;
                            } else {
                                $("#error").html(data.msg);
                            }

                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            search: function()
            {
                $('#source_select1').html('');
                var s_name = $("#s_name").val();
                var url = Basic.path + "/PadColumn/ajaxClassForm.html";
                $.post(url, {sname: s_name}, function(msg) {
                    try {
                        if (msg.ret == 1) {
                            $(msg.list).each(function(i, item) {
                                var name = item.name;
                                var id = item.id;
                                var op = new Option(name, id);
                                $("#source_select1").append(op);
                            })
                        } else {
                            alert(msg.msg);
                        }
                    } catch (e) {
                        $("#error").html("JSON解析错误");
                    }
                }, 'json')
            },
            DelAnime: function(id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysAnime/del.html";
                    $.get(url, {"id": id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysAnime/index.html";
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }

                    })
                } else {
                    return false;
                }
            },
            Init: function(name, w, h)
            {
                $('#file_uploadJm').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurl").attr("src", url);
                                    $("#pathurl").show();
                                    $("#thumbnail").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsize').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            animeInit: function(name, w, h)
            {
                $('#file_upload').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurlp").attr("src", url);
                                    $("#pathurlp").show();
                                    $("#poster").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsizelp').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            animeInitBig: function(name, w, h)
            {
                $('#file_uploadBig').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.gif;*.jpg;*.png;*.jpeg', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurlpbig").attr("src", url);
                                    $("#pathurlpbig").show();
                                    $("#poster_large").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsizebig').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            uploadGif: function(name, w, h)
            {
                $('#file_uploadBig').uploadify({
                    'auto': true, //关闭自动上传
                    'removeTimeout': 1, //文件队列上传完成1秒后删除
                    'swf': Basic.jsPath + '/uploadify/uploadify.swf',
                    'uploader': Basic.path + '/Upload/uploadPicture.html',
                    'method': 'post', //方法，服务端可以用$_POST数组获取数据
                    'formData': {'w': w, 'h': h, 'type': name}, //在服务端使用$_POST['id']获取该数据,服务端代码上传成功后将在目录生成一个6.txt的文件
                    'buttonText': '选择图片', //设置按钮文本
                    'buttonImg': Basic.imgPath + '/oybtn.gif',
                    'multi': false, //允许同时上传多张图片
                    //'uploadLimit' : 1,             //一次最多只允许上传4张图片
                    'fileTypeDesc': 'Image Files', //只允许上传图像
                    'fileTypeExts': '*.swf', //限制允许上传的图片后缀
                    //'fileSizeLimit' : '200KB',                  //限制上传的图片不得超过200KB 
                    'onUploadSuccess': function(file, data, response) {//每次成功上传后执行的回调函数，从服务端返回数据到前端
                        try {
                            var r = jQuery.parseJSON(data);
                            if (r.ret == 1) {
                                if (r.ImgUrl != "") {
                                    var url = Basic.uploadPath + "/tmp/" + r.ImgUrl;
                                    $("#pathurlpbig").html(url);
                                    $("#pathurlpbig").show();
                                    $("#poster_large").val(r.ImgUrl);
                                } else {
                                    alert("文件URL为空!");
                                }
                            } else {
                                $('#imgsizebig').html(r.msg);
                            }
                        } catch (e) {
                            alert("JSON解析错误!");
                        }
                    },
                    'onQueueComplete': function(queueData) {//上传队列全部完成后执行的回调函数
                    }
                });
            },
            addAnime: function() {
                window.location.href = Basic.path + "/SysAnime/form.html";
            },
            returnAnime: function() {
                window.location.href = Basic.path + "/SysAnime/index.html";
            },
            addImport: function() {
                window.location.href = Basic.path + "/SysAnime/import.html";
            },
            addSection: function(anime_id) {
                window.location.href = Basic.path + "/SysAnimeSection/form.html?anime_id=" + anime_id;
            },
            returnSection: function(anime_id) {
                window.location.href = Basic.path + "/SysAnimeSection/index.html?anime_id=" + anime_id;
            },
            DelSection: function(section_id, anime_id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysAnimeSection/del.html";
                    $.get(url, {id: section_id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysAnimeSection/index.html?anime_id=" + anime_id;
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }

                    })

                } else {
                    return false;
                }
            },
            DelSectionFile: function(sf_id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysAnimeSection/ajaxdelFile.html";
                    $.get(url, {'id': sf_id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1)
                            {
                                window.location.reload();
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }

                    })

                } else {
                    return false;
                }
            },
            commentBatch: function()
            {
                var url = Basic.path + "/SysAnimeComment/batch.html";
                Basic.batch(url);
            },
        }
var Card =
        {
            addCard: function() {
                window.location.href = Basic.path + "/SysCard/form.html";
            },
            cardBatch: function() {
                var url = Basic.path + "/SysCard/batch.html";
                Basic.batch(url);
            },
            sendBatch: function() {
                var url = Basic.path + "/SysCardSend/del.html";
                Basic.batch(url);
            },
            save: function() {
                var Name = $('#nameanime').val();
                var Path = $('#path').val();
                var Path_old = $('#path_old').val();
                var Poster_large = $('#poster_large').val();
                var Path_oldgif = $('#path_oldgif').val();
                var Linktype = $('#linktype').val();
                var Link = $('#link').val();
                var Type = $('#type').val();
                var Description = $('#description').val();
                var Id = $('#id').val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("名称不能为空!");
                    isok = false;
                    return false;
                }
                if (Check.trim(Link) == "") {
                    $("#error").html("请选择链接类型!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysCard/save.html";
                    $.post(url, {"id": Id, "name": Name, "coverpath": Path, "path_old": Path_old, "coverpathgif": Poster_large, "path_oldgif": Path_oldgif, "type": Type, "linktype": Linktype, "link": Link, "description": Description},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysCard/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            saveSend: function() {
                var Ids = $('#ids').val();
                var Name = $('#cardname').val();
                var Content = $('#content').val();
                var Card_id = $('#card_id').val();
                var isok = true;
                var msg;
                if (Check.trim(Name) == "") {
                    $("#error").html("名称不能为空111!");
                    isok = false;
                    return false;
                }
                if (isok == true)
                {
                    var url = Basic.path + "/SysCard/saveSend.html";
                    $.post(url, {"ids": Ids, "title": Name, "content": Content, "card_id": Card_id},
                    function(data) {
                        try {
                            var data = jQuery.parseJSON(data);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysBaby/index.html";
                            } else {
                                $("#error").html(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }
                    });
                }
            },
            DelCard: function(card_id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysCard/del.html";
                    $.get(url, {id: card_id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysCard/index.html";
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }

                    })
                } else {
                    return false;
                }
            },
            selSend: function(send_id) {
                var url = Basic.path + "/SysCardSend/saveStatus.html";
                $.post(url, {id: send_id},
                function(data) {
                    try {
                        var data = jQuery.parseJSON(data);
                        if (data.ret == 1)
                        {
                            window.location.href = Basic.path + "/SysCardSend/form.html?send_id=" + send_id;
                        } else {
                            $("#error").html(data.msg);
                        }
                    } catch (e) {
                        $("#error").html("JSON解析错误");
                    }
                });
            },
            DelCardSend: function(send_id) {
                if (confirm("确定要删除!")) {
                    var url = Basic.path + "/SysCardSend/del.html";
                    $.get(url, {id: send_id}, function(msg) {
                        try {
                            var data = jQuery.parseJSON(msg);
                            if (data.ret == 1)
                            {
                                window.location.href = Basic.path + "/SysCardSend/index.html";
                            } else {
                                alert(data.msg);
                            }
                        } catch (e) {
                            $("#error").html("JSON解析错误");
                        }

                    })
                } else {
                    return false;
                }
            }
        }
var PicManage = {
    Batch:function(){
        var type=$("#dropdown").val();
        var ids="";
        $(":checkbox[name='cid']:checked").each(function(){
            ids+=','+$(this).val();
        });
        if(type == "del"){
           if (!confirm("确定要删除!")) {
               return false;
           }
        }
       var url = Basic.path + "/SysPicManage/Batch.html";
       $.post(url, {"type":type,"ids":ids}, function(msg) {
           try {
               var data = jQuery.parseJSON(msg);
               if (data.ret == 1)
               {
                   window.location.href = Basic.path + "/SysPicManage/index.html";
               } else {
                   alert(data.msg);
               }
           } catch (e) {
               $("#error").html("JSON解析错误");
           }
       })
    },
}
var Baby = {
    sendEmail: function() {
        var ids = "";
        $("input[name='cid']").each(function(index, element) {
            if (this.checked == true) {
                var val = $(this).val();
                ids += val + ",";
            }
        });
        ids = ids.substr(0, ids.length - 1);
        if (ids == '') {
            alert('请选择用户');
        } else {
            $('#ids').val(ids);
            $("#sendEmail").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
        }
    },
    addHall: function() {
        var ids = "";
        $("input[name='cid']").each(function(index, element) {
            if (this.checked == true) {
                var val = $(this).val();
                ids += val + ",";
            }
        });
        ids = ids.substr(0, ids.length - 1);
        if (ids == '') {
            alert('请选择用户');
        } else {
            $('#bobyids').val(ids);
            $("#hall").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
        }
    },
    saveHall: function() {
        var ids = $('#bobyids').val();
        var url = Basic.path + "/SysBaby/saveHall";
        $.post(url, {"ids": ids},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1)
                {
                    window.location.href = Basic.path + "/SysBaby/index.html";
                } else {
                    $("#error").html(data.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        });
    },
    addBaby: function() {
        window.location.href = Basic.path + "/SysBaby/form.html";
    },
    addComment: function(user_id) {
        window.location.href = Basic.path + "/SysBaby/commentForm.html?user_id=" + user_id;
    },
    returnBaby: function() {
        window.location.href = Basic.path + "/SysBaby/index.html";
    },
    closeHall: function() {
        $("#hall").animate({opacity: "hide"}, "slow");
    },
    closeSend: function() {
        $('#ids').val('');
        $('#name').val('');
        $('#content').val('');
        $("#sendEmail").animate({opacity: "hide"}, "slow");
    },
    saveBaby: function() {
        var User_id = $('#user_id').val();
        var Username = $('#username').val();
        var Password = $('#password').val();
        var Email = $('#email').val();
        var Name = $('#name').val();
        var Status = $('#status').val();
        var Sex = $('#sex').val();
        var Path = $('#path').val();
        var Path_old = $('#path_old').val();
        var Province = $('#province').val();
        var City = $('#city').val();
        var Birthday = $('#birthday').val();
        var Horoscope = $('#horoscope').val();
        var Signature = $('#signature').val();
        var isok = true;
        var msg;
        if (Check.trim(Name) == "") {
            $("#error").html("名称不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            if (Check.trim(User_id) != "") {
                var url = Basic.path + "/SysBaby/updBaby";
            } else {
                var url = Basic.path + "/SysBaby/registerBaby";
            }
            $.post(url, {"user_id": User_id, "username": Username, "password": Password, "email": Email, "name": Name, "sex": Sex, "province": Province, "coverpath": Path, "path_old": Path_old, "status": Status, "city": City, "birthday": Birthday, "horoscope": Horoscope, "signature": Signature},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    delBaby: function(user_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBaby/delBaby.html";
            $.get(url, {"user_id": user_id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }

    },
    addFirend: function(user_id) {
        window.location.href = Basic.path + "/SysBaby/friendForm.html?user_id=" + user_id;
    },
    search: function()
    {
        $('#source_select1').html('');
        var s_name = $("#s_name").val();
        var user_id = $('#user_id').val();
        var url = Basic.path + "/SysBaby/ajaxFriendForm.html";
        $.post(url, {"sname": s_name, "user_id": user_id}, function(msg) {
            try {
                if (msg.ret == 1) {
                    $(msg.list).each(function(i, item) {
                        var name = item.name;
                        var id = item.user_id;
                        var op = new Option(name, id);
                        $("#source_select1").append(op);
                    })
                } else {
                    alert(msg.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        }, 'json')
    },
    delMoment: function(moment_id, user_id, group_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBaby/delMoment.html";
            $.get(url, {"moment_id": moment_id, "user_id": user_id, "group_id": group_id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/moment.html?user_id=" + user_id + "&group_id=" + group_id;
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    delLaud: function(laud_id, user_id, moment_id, group_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBaby/delLaud.html";
            $.get(url, {"laud_id": laud_id, "group_id": group_id, "moment_id": moment_id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/laud.html?user_id=" + user_id + "&moment_id=" + moment_id + "&group_id=" + group_id;
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    delGroup: function(group_id, user_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBaby/delGroup.html";
            $.get(url, {"group_id": group_id, "user_id": user_id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/group.html?user_id=" + user_id;
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    delComment: function(comment_id, user_id, moment_id, group_id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBaby/delComment.html";
            $.get(url, {"comment_id": comment_id, "group_id": group_id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/comment.html?user_id=" + user_id + "&moment_id=" + moment_id + "&group_id=" + group_id;
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    commentBatch: function()
    {
        var url = Basic.path + "/SysBaby/commentBatch.html";
        Basic.batch(url);
    },
    addBabyRespondWord: function() {
        $('#head').html('<h1>添加词语</h1>');
        $('#id').val('');
        $('#title').val('');
        $('#status').val('');
        $("#respondWord").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveRespondWord: function() {
        var Id = $('#id').val();
        var Title = $('#title').val();
        var Status = $('#status').val();
        var isok = true;
        var msg;
        if (Check.trim(Title) == "") {
            $("#error").html("词语不能为空!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysBabyRespondWord/saveRespondWord.html";
            $.post(url, {"id": Id, "title": Title, "status": Status},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBabyRespondWord/index.html";
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    delBabyRespondWord: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysBabyRespondWord/delBabyRespondWord.html";
            $.get(url, {"id": id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBabyRespondWord/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
    updBabyRespondWord: function(id) {
        var url = Basic.path + "/SysBabyRespondWord/form.html";
        $.post(url, {"id": id},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1)
                {
                    $('#head').html('<h1>修改词语</h1>');
                    $('#id').val(data.info.id);
                    $('#title').val(data.info.title);
                    $('#' + data.info.status).attr('selected', 'selected');
                    $("#respondWord").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    $("#error").html(data.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        });
    },
    close: function() {
        $("#respondWord").animate({opacity: "hide"}, "slow");
    },
    addGroup: function(user_id) {
        $('#userid').val(user_id);
        $('#head').html('<h1>瞬间集合添加</h1>');
        $('#id').val('');
        $('#thumbnail').val('');
        $('#path_old').val('');
        $("#pathurl").attr("style", 'height:200px;width: 200px; border:3px solid #CCC; display:none');
        $('#description').val('');
        $("#groupFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    saveGroup: function() {
        var Id = $('#id').val();
        var Userid = $('#userid').val();
        var Gid = $('#gid').val();
        var Path = $('#thumbnail').val();
        var Path_old = $('#path_old').val();
        var Description = $('#description').val();
        var isok = true;
        var msg;
        if (Check.trim(Path) == "") {
            $("#error").html("请上传封面!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysBaby/saveGroup.html";
            $.post(url, {"id": Id, "user_id": Userid, "gid": Gid, "description": Description, "path": Path, "path_old": Path_old},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/group.html?user_id=" + Userid;
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    updGroup: function(group_id) {
        var url = Basic.path + "/SysBaby/groupForm.html";
        $.post(url, {"group_id": group_id},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1)
                {
                    $('#head').html('<h1>修改瞬间集合</h1>');
                    $('#id').val(data.info.id);
                    $('#userid').val(data.info.user_id);
                    $('#thumbnail').val(data.info.coverpath);
                    $('#gid').val(data.info.gid);
                    $('#path_old').val(data.info.coverpath);
                    $("#pathurl").attr("src", Basic.image + '/' + data.info.coverpath);
                    $("#pathurl").attr("style", 'height:200px;width: 200px; border:3px solid #CCC; display:block');
                    $('#description').val(data.info.description);
                    $("#groupFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    $("#error").html(data.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        });
    },
        changeGroupStatus: function(id,status){
        var url = Basic.path + "/SysPicManage/changeGroupStatus.html";
        $.post(url,{"id":id,"status":status},function(msg){
            if(msg.ret == 1){
                $("#error").html(""); 
                $("#status_"+id).val(status);
            }else{
                $("#error").html(msg.msg); 
            }
        },"post");
        
    },
    closeGroup: function() {
        $("#groupFrom").animate({opacity: "hide"}, "slow");
    },
    addMoment: function(user_id, group_id) {
        $('#userid').val(user_id);
        $('#groupid').val(group_id);
        $('#head').html('<h1>瞬间记录添加</h1>');
        $("#momentFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
    },
    typeMoment: function() {
        var type = $('#typeMoment').val();
        if (type == 2) {
            $('#video').attr("style", '');
        } else {
            $('#video').attr("style", 'display:none;');
        }
    },
    saveMoment: function() {
        var Id = $('#id').val();
        var gid = $('#gid').val();
        var Userid = $('#userid').val();
        var Groupid = $('#groupid').val();
        var Type = $('#typeMoment').val();
        var Path = $('#thumbnail').val();
        var Path_old = $('#path_old').val();
        var FilePath = $('#filePath').val();
        var FilePath_old = $('#filePath_old').val();
        var Description = $('#description').val();
        var isok = true;
        var msg;
        if (Check.trim(Path) == "") {
            $("#error").html("请上传封面!");
            isok = false;
            return false;
        }
        if (isok == true)
        {
            var url = Basic.path + "/SysBaby/saveMoment.html";
            $.post(url, {"id": Id, "user_id": Userid, "gid": gid, "type": Type, "group_id": Groupid, "description": Description, "path": Path, "path_old": Path_old, "filePath": FilePath, "filePath_old": FilePath_old},
            function(data) {
                try {
                    var data = jQuery.parseJSON(data);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysBaby/moment.html?user_id=" + Userid + "&group_id=" + Groupid;
                    } else {
                        $("#error").html(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }
            });
        }
    },
    updMoment: function(moment_id, user_id, group_id) {
        var url = Basic.path + "/SysBaby/momentForm.html";
        $.post(url, {"moment_id": moment_id},
        function(data) {
            try {
                var data = jQuery.parseJSON(data);
                if (data.ret == 1)
                {
                    $('#head').html('<h1>修改瞬间记录</h1>');
                    $('#id').val(data.info.id);
                    $('#userid').val(data.info.user_id);
                    $('#groupid').val(data.info.group_id);
                    $('#thumbnail').val(data.info.path);
                    $('#saveMoment').val(data.info.gid);
                    $('#path_old').val(data.info.path);
                    if (data.info.type == 1) {
                        $('#type' + data.info.type).attr('selected', 'selected');
                        $('#type2').attr('disabled', 'disabled');
                    } else {
                        $('#type' + data.info.type).attr('selected', 'selected');
                        $('#filePath').val(data.info.videopath);
                        $('#filePath_old').val(data.info.videopath);
                        $('#filePath_url').html(data.info.videopath);
                        $('#type1').attr('disabled', 'disabled');
                        $('#video').attr("style", '');
                    }
                    $("#pathurl").attr("src", Basic.imagePath + '/' + data.info.path);
                    $("#pathurl").attr("style", 'height:200px;width: 200px; border:3px solid #CCC; display:block');
                    $('#description').val(data.info.description);
                    $("#momentFrom").animate({left: $(document).width() - 800, top: -$(document).height() + 200, opacity: "show"}, "slow");
                } else {
                    $("#error").html(data.msg);
                }
            } catch (e) {
                $("#error").html("JSON解析错误");
            }
        });
    },
    closeMoment: function() {
        $('#id').val('');
        $('#thumbnail').val('');
        $('#path_old').val('');
        $("#pathurl").attr("src", '');
        $('#description').val('');
        $('#video').attr("style", 'display:none;');
        $('#type1').attr('disabled', '');
        $('#type2').attr('disabled', '');
        $("#pathurl").attr("style", 'height:200px;width: 200px; border:3px solid #CCC; display:none');
        $("#momentFrom").animate({opacity: "hide"}, "slow");
    },
    delFeedback: function(id) {
        if (confirm("确定要删除!")) {
            var url = Basic.path + "/SysFeedback/del.html";
            $.get(url, {"id": id}, function(msg) {
                try {
                    var data = jQuery.parseJSON(msg);
                    if (data.ret == 1)
                    {
                        window.location.href = Basic.path + "/SysFeedback/index.html";
                    } else {
                        alert(data.msg);
                    }
                } catch (e) {
                    $("#error").html("JSON解析错误");
                }

            })
        } else {
            return false;
        }
    },
}

