package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Classification;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;


public interface ClassificationService {
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
	 * 根据ID查询一条分类信息
	 * @param classification
	 */
	public Classification getClassification(int id);
	
	/**
	 * 根据UUID查询一条分类信息
	 * @param classification
	 */
	public Classification getClassificationByUuid(String uuid);

	/**
	 * 删除一条分类信息
	 * @param id
	 */
	public void delClassification(int id);

	/**
	 * 分页查询所有分类信息
	 * @param classification
	 */
	public Result getAllClassification(Page page);
	
	/**
	 * 查询所有分类信息
	 * @param classification
	 */
	public List<?> getClassificationAll();
}
