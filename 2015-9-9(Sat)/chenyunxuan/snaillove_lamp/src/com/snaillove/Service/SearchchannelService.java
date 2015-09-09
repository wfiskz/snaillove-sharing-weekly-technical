package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Searchchannel;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;

public interface SearchchannelService {
	/**
	 * 获取所有未被逻辑删除的搜索渠道信息
	 * 
	 * @return
	 */
	public List<Searchchannel> getAllSearchchannel();

	/**
	 * 通过ID查询一个搜索渠道信息
	 * 
	 * @param id
	 * @return
	 */
	public Searchchannel getById(int id);

	/**
	 * 新增搜索渠道信息
	 * 
	 * @param Searchchannel
	 */
	public void saveSearchchannel(Searchchannel searchchannel);

	/**
	 * 修改搜索渠道信息
	 * 
	 * @param Searchchannel
	 */
	public void uppSearchchannel(Searchchannel searchchannel);

	/**
	 * 删除一条搜索渠道信息
	 * 
	 * @param id
	 */
	public void delSearchchannel(int id);

	/**
	 * 分页查询所有搜索渠道信息
	 * 
	 * @param Searchchannel
	 */
	public Result getAllSearchchannel(Page page);
}
