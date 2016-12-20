package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Label;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface LabelService {
	/**
	 * 新增标签信息
	 * 
	 * @param Label
	 */
	public void saveLabel(Label label);

	/**
	 * 修改标签信息
	 * 
	 * @param Label
	 */
	public void uppLabel(Label label);

	/**
	 * 根据ID查询一条标签信息
	 * @param Label
	 */
	public Label getLabel(int id);

	/**
	 * 根据UUID查询一条标签信息
	 * @param Label
	 */
	public Label getLabelByUuid(String uuid);

	/**
	 * 删除一条标签信息
	 * @param id
	 */
	public void delLabel(int id);

	/**
	 * 分页查询所有标签信息
	 * @param Label
	 */
	public Result getSearchAllLabel(Page page);

	/**
	 * 查询所有标签信息
	 * @param Label
	 */
	public List<?> getAllLabel(String keyword,String suuid);
}
