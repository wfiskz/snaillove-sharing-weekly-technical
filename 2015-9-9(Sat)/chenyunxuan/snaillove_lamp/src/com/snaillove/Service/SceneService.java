package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Scene;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface SceneService {

	/**
	 * 分页查询情景
	 * @param zPage
	 * @return
	 */
	public Result getSearchAllScene(Page zPage);

	/**
	 * 删除情景
	 * @param id
	 */
	public void delScene(int id);

	/**
	 * 通过ID获取一个情景
	 * @param id
	 */
	public Scene getScene(int id);
	
	/**
	 * 通过UUID获取一个情景
	 * @param id
	 */
	public Scene getSceneInfo(String uuid);

	/**
	 * 修改情景
	 * @param scene
	 */
	public void uppScene(Scene scene);

	/**
	 * 新增情景
	 * @param scene
	 */
	public void addScene(Scene scene);
	
	/**
	 * 根据分类UUID查询情景(有true,没有false)
	 * @param cuuid
	 * @return
	 */
	public Boolean getSceneByCuuid(String cuuid);
	
	/**
	 * 获取没有被推荐的所有情景
	 * @return
	 */
	public List<?> getAllScene(String keyword);
	
	/**
	 * 获取可被摇一摇的情景
	 * @return
	 */
	public List<?> getReScene();
}
