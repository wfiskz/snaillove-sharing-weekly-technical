package com.snaillove.bean;

import java.util.List;

public class Scene {
	private String name;// 情景名称
	private String description;// 情景描述
	private int lampEffect;// 情景灯效
	private Boolean lampEffectWithRGB;// true读取RGB与叠加灯效,false不读取RGB与叠加灯效
	private int red;// red
	private int green;// green
	private int blue;// blue
	private String thumbnail;// 情景缩略图
	private int attachedLampEffect;// 叠加灯效
	private List<Music> musics;// 歌曲列表（name 歌曲名称,url 歌曲链接 ,author 歌曲作者）
	private List<Photo> photos;// 情景图片列表（url 图片链接）

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public int getLampEffect() {
		return lampEffect;
	}

	public void setLampEffect(int lampEffect) {
		this.lampEffect = lampEffect;
	}

	public Boolean getLampEffectWithRGB() {
		return lampEffectWithRGB;
	}

	public void setLampEffectWithRGB(Boolean lampEffectWithRGB) {
		this.lampEffectWithRGB = lampEffectWithRGB;
	}

	public int getRed() {
		return red;
	}

	public void setRed(int red) {
		this.red = red;
	}

	public int getGreen() {
		return green;
	}

	public void setGreen(int green) {
		this.green = green;
	}

	public int getBlue() {
		return blue;
	}

	public void setBlue(int blue) {
		this.blue = blue;
	}

	public int getAttachedLampEffect() {
		return attachedLampEffect;
	}

	public void setAttachedLampEffect(int attachedLampEffect) {
		this.attachedLampEffect = attachedLampEffect;
	}

	public List<Music> getMusics() {
		return musics;
	}

	public void setMusics(List<Music> musics) {
		this.musics = musics;
	}

	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}

}
