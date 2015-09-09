package com.snaillove.bean;

import java.util.List;

public class SingleChannel {
	private boolean isopen;// 是否为开放接口(true表示是开放接口,false表示不是开放接口 PS：1.QQ音乐属于不开放的接口 2.false时App通过控件加载网页)
	private String url;// 当isopen为false时为用控件读取网址，当isopen为true时返回空值
	private List<SingleMusic> list;//当isopen为true时读取歌曲列表，当isopen为false时返回空值

	public boolean isIsopen() {
		return isopen;
	}

	public void setIsopen(boolean isopen) {
		this.isopen = isopen;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public List<SingleMusic> getList() {
		return list;
	}

	public void setList(List<SingleMusic> list) {
		this.list = list;
	}

}
