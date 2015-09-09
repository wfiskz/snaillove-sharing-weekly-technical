package com.snaillove.web.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.snaillove.Service.SearchchannelService;
import com.snaillove.model.Searchchannel;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class SearchchannelAction extends BaseAction {
	@Resource
	private SearchchannelService sevice;

	/**
	 * 新增搜索渠道
	 * 
	 * @param Searchchannel
	 */
	@RequestMapping(value = "/web/addSearchchannel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Searchchannel channel) {
		sevice.saveSearchchannel(channel);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 新增搜索渠道准备
	 * 
	 * @param Searchchannel
	 */
	@RequestMapping(value = "/web/addSearchchannelPro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request) {
		return "/addSearchchannel";
	}

	/**
	 * 修改搜索渠道
	 * 
	 * @param Searchchannel
	 */
	@RequestMapping(value = "/web/uppSearchchannel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Searchchannel channel) {
		StatusJSON statusJSON = new StatusJSON();
		sevice.uppSearchchannel(channel);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 修改搜索渠道准备
	 * 
	 * @param Searchchannel
	 */
	@RequestMapping(value = "/web/uppSearchchannelPro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Searchchannel Searchchannel = sevice.getById(id);
		request.setAttribute("channel", Searchchannel);
		return "/addSearchchannel";
	}

	/**
	 * 删除搜索渠道
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/delSearchchannel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id, String cuuid) {
		StatusJSON statusJSON = new StatusJSON();
		sevice.delSearchchannel(id);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 查询所有搜索渠道
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/getSearchchannel.action", method = RequestMethod.POST)
	public String getAll(HttpServletResponse response,
			HttpServletRequest request, int currentPage) {
		Page zPage = new Page();
		zPage.setCurrentPage(currentPage);
		zPage.setEveryPage(10);
		Result result = sevice.getAllSearchchannel(zPage);
		Page page = result.getPage();
		List<Searchchannel> list = (List<Searchchannel>) result.getList();
		request.setAttribute("searchchannel", list);
		request.setAttribute("page", page);
		return "/searchchannelList";
	}
	
	/**
	 * 修改搜索渠道排序
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/uppRecommenscSort.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON uppRecommenSort(HttpServletResponse response,
			HttpServletRequest request, int id,int sort) {
		StatusJSON statusJSON = new StatusJSON();
		Searchchannel channel=sevice.getById(id);
		channel.setSort(sort);
		sevice.uppSearchchannel(channel);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	public SearchchannelService getSevice() {
		return sevice;
	}

	public void setSevice(SearchchannelService sevice) {
		this.sevice = sevice;
	}

}
