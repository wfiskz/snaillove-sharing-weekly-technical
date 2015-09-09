package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Slide;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface SlideService {
	/**
	 * 查询所有未被逻辑删除的轮播图列表信息
	 * @return
	 */
	public List<Slide> getAllSlide();
	
	/**
	 * 通过ID查询一个轮播图信息
	 * 
	 * @param id
	 * @return
	 */
	public Slide getById(int id);

	/**
	 * 新增轮播图信息
	 * 
	 * @param Slide
	 */
	public void saveSlide(Slide slide);

	/**
	 * 修改轮播图信息
	 * 
	 * @param Slide
	 */
	public void uppSlide(Slide slide);

	/**
	 * 删除一条轮播图信息
	 * 
	 * @param id
	 */
	public void delSlide(int id);

	/**
	 * 分页查询所有轮播图信息
	 * 
	 * @param Slide
	 */
	public Result getAllSlide(Page page);
}
