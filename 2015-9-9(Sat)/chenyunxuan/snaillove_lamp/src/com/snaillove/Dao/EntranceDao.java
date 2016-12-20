package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Entrance;
import com.snaillove.utils.Page;

public interface EntranceDao {
	/**
	 * 获取所有未被逻辑删除的音乐入口列表信息
	 * @return
	 */
	public List<Entrance> getAllEntrance();
	
	/**
	 * 通过ID查询一个音乐入口
	 * @param id
	 * @return
	 */
	public Entrance getByid(int id);
	
	/**
	 * 增加一个音乐入口
	 * 
	 * @param entrance
	 */
	public void save(Entrance entrance);

	/**
	 * 修改一个音乐入口
	 * 
	 * @param entrance
	 */
	public void upp(Entrance entrance);

	/**
	 * 删除一个音乐入口
	 * 
	 * @param id
	 */
	public void del(int id);

	/**
	 * 分页查询音乐入口列表
	 * 
	 * @param keyword
	 * @return
	 */
	public List<?> getSearchEntrance(Page page);

	/**
	 * 总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount();

	/**
	 * 带条件的总条数
	 * 
	 * @param keyword
	 * @return
	 */
	public int getAllCount(String keyword);
}
