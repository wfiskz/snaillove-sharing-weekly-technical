package com.snaillove.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "labelforscene")
public class Labelforscene {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String uuid;
	private String suuid;
	private String luuid;
	private String lname;
	private String createtime;

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

	public String getSuuid() {
		return suuid;
	}

	public void setSuuid(String suuid) {
		this.suuid = suuid;
	}

	public String getLuuid() {
		return luuid;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public void setLuuid(String luuid) {
		this.luuid = luuid;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	/*id int primary key AUTO_INCREMENT COMMENT '情景标签ID',
	uuid varchar(50) not null COMMENT '情景标签UUID',
    suuid varchar(50) not null COMMENT '情景UUID',
    luuid varchar(50) not null COMMENT '标签UUID',
	createtime varchar(50) COMMENT '创建时间',
    endupptime timestamp COMMENT '最后修改时间'*/
}
