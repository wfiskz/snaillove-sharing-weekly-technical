package com.snaillove.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "photoforscene")
public class Photoforscene {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String suuid;
	private String imgurl;
	private String createtime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSuuid() {
		return suuid;
	}

	public void setSuuid(String suuid) {
		this.suuid = suuid;
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
	/*id int primary key AUTO_INCREMENT COMMENT '情景图片ID',
	suuid varchar(50) not null COMMENT '情景UUID',
	imgurl varchar(50) not null COMMENT '情景图片路径',
    createtime varchar(50) COMMENT '创建时间',
    endupptime timestamp COMMENT '最后修改时间'*/
}
