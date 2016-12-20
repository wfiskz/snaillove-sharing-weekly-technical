package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Slide;
import com.snaillove.utils.Page;

public interface SlideDao {
	/**
	 * 查询所有未被逻辑删除的轮播图列表信息
	 * 
	 * @return
	 */
	public List<Slide> getAllSlide();

	/**
	 * 查询一个轮播图
	 * @param id
	 * @return
	 */
	public Slide getById(int id);
	
	/**
	 * 增加一个轮播图
	 * 
	 * @param channel
	 */
	public void save(Slide slide);

	/**
	 * 修改一个轮播图
	 * 
	 * @param slide
	 */
	public void upp(Slide slide);

	/**
	 * 删除一个轮播图
	 * 
	 * @param id
	 */
	public void del(int id);

	/**
	 * 分页查询录播图列表
	 * 
	 * @param keyword
	 * @return
	 */
	public List<?> getSearchSlide(Page page);

	/**
	 * 总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount();

	/**
	 * 带条件的总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount(String keyword);
}