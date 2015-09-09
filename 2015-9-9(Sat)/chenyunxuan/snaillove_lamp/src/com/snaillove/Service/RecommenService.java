package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Recommen;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface RecommenService {
	/**
	 * 新增推荐
	 * @param recoomen
	 */
	public void saveRecommen(Recommen recoomen);

	/**
	 * 删除推荐
	 * @param id
	 */
	public void delRecommen(int id);
	
	/**
	 * 通过情景UUID查询一个推荐情景
	 * @param suuid
	 * @return
	 */
	public Recommen getRecommenBySuuid(String suuid);
	
	/**
	 * 通过ID查询一个推荐情景
	 * @param id
	 * @return
	 */
	public Recommen getRecommen(int id);

	/**
	 * 获取全部推荐
	 * @return
	 */
	public List<?> getAllRecommen();

	/**
	 * 分页获取全部推荐
	 * @return
	 */
	public Result getSearchRecommen(Page page);

	/**
	 * 获取推荐列表（最多六个）
	 * @return
	 */
	public List<?> getRecommenList();
	
	/**
	 * 修改情景
	 * @param recommen
	 */
	public void uppRecommen(Recommen recommen);
}
