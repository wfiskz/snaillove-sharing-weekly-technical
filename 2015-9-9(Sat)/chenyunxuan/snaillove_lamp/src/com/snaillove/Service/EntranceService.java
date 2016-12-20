package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Entrance;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface EntranceService {
	/**
	 * 获取全部没有被逻辑删除的音乐入口列表信息
	 * 
	 * @return
	 */
	public List<Entrance> getAllEntrance();

	/**
	 * 通过ID查询一个音乐入口信息
	 * 
	 * @param id
	 * @return
	 */
	public Entrance getById(int id);

	/**
	 * 新增音乐入口信息
	 * 
	 * @param Entrance
	 */
	public void saveEntrance(Entrance entrance);

	/**
	 * 修改音乐入口信息
	 * 
	 * @param Entrance
	 */
	public void uppEntrance(Entrance entrance);

	/**
	 * 删除一条音乐入口信息
	 * 
	 * @param id
	 */
	public void delEntrance(int id);

	/**
	 * 分页查询所有音乐入口信息
	 * 
	 * @param Entrance
	 */
	public Result getAllEntrance(Page page);
}
