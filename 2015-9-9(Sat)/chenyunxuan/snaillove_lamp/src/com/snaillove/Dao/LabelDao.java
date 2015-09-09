package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Label;
import com.snaillove.utils.Page;

public interface LabelDao {
	/**
	 * 增加标签
	 * 
	 * @param label
	 */
	public void saveLabel(Label label);

	/**
	 * 修改标签
	 * 
	 * @param label
	 */
	public void uppLabel(Label label);

	/**
	 * 删除标签信息
	 * 
	 * @param id
	 */
	public void delLabel(int id);
	
	/**
	 * 根据ID获得一个标签信息
	 * @param id
	 * @return
	 */
	public Label getLabel(int id);

	/**
	 * 根据UUID获得一个标签信息
	 * @param id
	 * @return
	 */
	public Label getLabelByUuid(String uuid);
	
	/**
	 * 查询所有标签信息
	 * 
	 * @return
	 */
	public List<?> getAllLabel(String keyword,String suuid);

	/**
	 * 分页查询标签信息
	 * 
	 * @param keyword
	 * @param page
	 * @return
	 */
	public List<?> getSearchLabel(Page page);

	/**
	 * 获取总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount(String keyword);

	/**
	 * 获取总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount();
}
