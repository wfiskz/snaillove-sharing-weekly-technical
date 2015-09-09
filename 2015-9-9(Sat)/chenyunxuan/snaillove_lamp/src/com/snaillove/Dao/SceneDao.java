package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Scene;
import com.snaillove.utils.Page;

public interface SceneDao {
	/**
	 * 增加情景
	 * 
	 * @param Scene
	 */
	public void saveScene(Scene scene);

	/**
	 * 修改情景
	 * 
	 * @param Scene
	 */
	public void uppScene(Scene scene);
	
	
	/**
	 * 通过分类UUID查询分类下有没有情景（有返回 true,没有返回false）
	 * @param cuuid
	 * @return
	 */
	public Boolean getSceneByCuuid(String cuuid);

	/**
	 * 删除情景信息
	 * 
	 * @param id
	 */
	public void delScene(int id);
	
	/**
	 * 根据ID获得一个情景信息
	 * @param id
	 * @return
	 */
	public Scene getScene(int id);

	/**
	 * 根据UUID获得一个情景信息
	 * @param id
	 * @return
	 */
	public Scene getSceneByUuid(String uuid);
	
	/**
	 * 查询所有情景信息未被推荐的
	 * 
	 * @return
	 */
	public List<?> getAllScene(String keyword);

	/**
	 * 分页查询情景信息
	 * 
	 * @param keyword
	 * @param page
	 * @return
	 */
	public List<?> getSearchScene(Page page);

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
	
	/**
	 * 获取全部可被摇一摇的情景(recommed==1)
	 * @return
	 */
	public List<?> getReSceneList();
}
