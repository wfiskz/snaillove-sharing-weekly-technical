package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Searchchannel;
import com.snaillove.utils.Page;

public interface SearchchannelDao{
	/**
	 * 获取所有未被逻辑删除的搜索渠道信息
	 * @return
	 */
	public List<Searchchannel> getAllSearchchannel();
	
	/**
	 * 通过ID查询一个搜索渠道
	 * @param id
	 * @return
	 */
	public Searchchannel getByid(int id);
	
	/**
	 * 增加一个搜索渠道
	 * 
	 * @param channel
	 */
	public void save(Searchchannel channel);

	/**
	 * 修改一个搜索渠道
	 * 
	 * @param Channel
	 */
	public void upp(Searchchannel channel);

	/**
	 * 删除一个搜索渠道
	 * 
	 * @param id
	 */
	public void del(int id);

	/**
	 * 分页查询录播图列表
	 * 
	 * @param keyword
	 * @return
	 */
	public List<?> getSearchChannel(Page page);

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
