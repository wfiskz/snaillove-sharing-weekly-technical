package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Photoforscene;

public interface PhotoforsceneService {
	
	/**
	 * 获取情景图片
	 * @param suuid
	 * @return
	 */
	public List<?> getScenephoto(String suuid);
	
	/**
	 * 增加情景图片
	 * @param photoforscene
	 */
	public void saveScenephoto(Photoforscene photoforscene);
	
	/**
	 * 修改时删除该情景下图片
	 * @param suuid
	 */
	public void delScenephoto(String suuid);
}
