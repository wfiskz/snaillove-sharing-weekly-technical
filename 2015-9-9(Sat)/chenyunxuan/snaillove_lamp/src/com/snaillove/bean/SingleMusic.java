package com.snaillove.bean;

public class SingleMusic {
	private String name;// 歌曲名
	private String author;// 歌曲作者
	private String path;// 歌曲路径
	private String coverpath_small;// 歌曲封面路径(小)
	private String coverpath_middle;// 歌曲封面路径(中)
	private String coverpath_large;// 歌曲封面路径(大)

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getCoverpath_small() {
		return coverpath_small;
	}

	public void setCoverpath_small(String coverpath_small) {
		this.coverpath_small = coverpath_small;
	}

	public String getCoverpath_middle() {
		return coverpath_middle;
	}

	public void setCoverpath_middle(String coverpath_middle) {
		this.coverpath_middle = coverpath_middle;
	}

	public String getCoverpath_large() {
		return coverpath_large;
	}

	public void setCoverpath_large(String coverpath_large) {
		this.coverpath_large = coverpath_large;
	}

}
