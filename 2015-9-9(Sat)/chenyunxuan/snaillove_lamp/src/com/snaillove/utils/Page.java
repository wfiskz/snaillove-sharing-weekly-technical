package com.snaillove.utils;

public class Page {

	private Integer b_id;
	private Integer flag;
	private String keyword;
	private Integer searchtype;
	private String staDate;
	private String endDate;
	private Integer searchage;
	private Integer searchclass;

	public Integer getSearchage() {
		return searchage;
	}

	public void setSearchage(Integer searchage) {
		this.searchage = searchage;
	}

	public Integer getSearchclass() {
		return searchclass;
	}

	public void setSearchclass(Integer searchclass) {
		this.searchclass = searchclass;
	}

	public String getStaDate() {
		return staDate;
	}

	public void setStaDate(String staDate) {
		this.staDate = staDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public Integer getSearchtype() {
		return searchtype;
	}

	public void setSearchtype(Integer searchtype) {
		this.searchtype = searchtype;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Integer getB_id() {
		return b_id;
	}

	public void setB_id(Integer b_id) {
		this.b_id = b_id;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	// 1.每页显示数量(everyPage)
	private int everyPage;
	// 2.总记录数(totalCount)
	private int totalCount;
	// 3.总页�?totalPage)
	private int totalPage;
	// 4.当前�?currentPage)
	private int currentPage;
	// 5.起始�?beginIndex)
	private int beginIndex;
	// 6.是否有上�?��(hasPrePage)
	private boolean hasPrePage;
	// 7.是否有下�?��(hasNextPage)
	private boolean hasNextPage;

	public Page(int everyPage, int totalCount, int totalPage, int currentPage,
			int beginIndex, boolean hasPrePage, boolean hasNextPage) {
		this.everyPage = everyPage;
		this.totalCount = totalCount;
		this.totalPage = totalPage;
		this.currentPage = currentPage;
		this.beginIndex = beginIndex;
		this.hasPrePage = hasPrePage;
		this.hasNextPage = hasNextPage;
	}

	// ���캯��Ĭ��
	public Page() {
	}

	public int getEveryPage() {
		return everyPage;
	}

	public void setEveryPage(int everyPage) {
		this.everyPage = everyPage;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getBeginIndex() {
		return beginIndex;
	}

	public void setBeginIndex(int beginIndex) {
		this.beginIndex = beginIndex;
	}

	public boolean isHasPrePage() {
		return hasPrePage;
	}

	public void setHasPrePage(boolean hasPrePage) {
		this.hasPrePage = hasPrePage;
	}

	public boolean isHasNextPage() {
		return hasNextPage;
	}

	public void setHasNextPage(boolean hasNextPage) {
		this.hasNextPage = hasNextPage;
	}

}
