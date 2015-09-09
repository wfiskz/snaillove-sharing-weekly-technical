package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Photoforscene;

public interface PhotoforsceneDao {
	
	/**
	 * 通过suuid查询该情景所有的图片地址
	 * @param suuid
	 * @return
	 */
	public List<?> getScenephoto(String suuid);
	
	/**
	 * 新增情景插入的图片
	 * @param photoforscene
	 */
	public void saveScenephoto(Photoforscene photoforscene);
	
	/**
	 * 修改时删除情景对应的所有图片
	 * @param suuid
	 */
	public void delAllphoto(String suuid);
}
