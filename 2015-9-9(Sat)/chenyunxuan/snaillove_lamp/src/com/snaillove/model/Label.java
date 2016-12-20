package com.snaillove.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "label")
public class Label {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String uuid;
	private String lname;
	private int state;
	private int sort;
	private String imgurl;
	private String createtime;

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getSort() {
		return sort;
	}

	public void setSort(int sort) {
		this.sort = sort;
	}

	public String getImgurl() {
		return imgurl;
	}

	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	
	/*id int primary key AUTO_INCREMENT COMMENT '标签ID',
    uuid varchar(50) not null COMMENT '标签UUID',
    lname varchar(50) not null COMMENT '标签名称',
	state int(2) not null COMMENT '分类状态（0显，1隐）',
    sort int(11) COMMENT '排序号',
    imgurl varchar(255) COMMENT '图片路径' ,
	createtime varchar(50) COMMENT '创建时间',
    endupptime timestamp COMMENT '最后修改时间'*/

}
