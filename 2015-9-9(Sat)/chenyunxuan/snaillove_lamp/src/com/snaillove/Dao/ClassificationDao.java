package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Classification;
import com.snaillove.utils.Page;


public interface ClassificationDao {

	/**
	 * 新增分类信息
	 * 
	 * @param classification
	 */
	public void saveClassification(Classification classification);

	/**
	 * 修改分类信息
	 * 
	 * @param classification
	 */
	public void uppClassification(Classification classification);
	
	/**
	 * 通过ID查询一条分类信息
	 * 
	 * @param classification
	 */
	public Classification getClassification(int id);
	
	/**
	 * 通过UUID查询一条分类信息
	 * 
	 * @param classification
	 */
	public Classification getClassificationByUuid(String uuid);
	
	/**
	 * 删除一条分类信息
	 * @param id
	 */
	public void delClassification(int id);
	
	/**
	 * 查询所有分类信息
	 * 
	 * @param classification
	 */
	public List<?> getAllClassification();
	
	/**
	 * 查询所有分类信息
	 * @param classification
	 */
	public List<?> getSearchClassification(Page page);
	
	/**
	 * 查询分类信息总条数
	 * @param page
	 * @return
	 */
	public int getAllCount();
}
