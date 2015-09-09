package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Labelforscene;

public interface LabelforsceneDao {
	
	/**
	 * 新增便签
	 * @param labelforscene
	 */
	public void saveLabelforscene(Labelforscene labelforscene);
	
	/**
	 * 通过情景UUID查询标签列表
	 * @param suuid
	 * @return
	 */
	public List<?> getLabelList(String suuid);
	
	/**
	 * 删除一个情景标签关联
	 * @param id
	 */
	public void delLabelforscene(int id);
	
	/**
	 * 获取所有标签
	 * @return
	 */
	public List<?> getAllLabelList();
}
