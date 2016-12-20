<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<div class="classPop" style="width:500px;" id="bannertjmusic"  >
    <div class="pop-top" style="text-align:center;">
        <h1 id='specialname' ></h1>
    </div>
    <div style="text-align:center;" id="bannerMusicByname"></div>
    <div class="pop-scrollbar">
        <div class="pop-box">
            <div class="con" id="bannermusic" >
            </div>
        </div>
        <div style="text-align:center;" id='bannerpageing'></div>
    </div>
     <div class="btn-box" id="bannerpage"></div>
    <div class="btn-box">
        <input id="classPop" class="close" onclick="pcColumn.hidediv()" type="button" value="取消">
    </div>
</div>