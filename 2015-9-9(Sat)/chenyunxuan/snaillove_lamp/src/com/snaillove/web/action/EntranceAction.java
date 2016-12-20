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

import com.snaillove.Service.EntranceService;
import com.snaillove.model.Entrance;
import com.snaillove.model.Photoforscene;
import com.snaillove.model.Entrance;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class EntranceAction extends BaseAction {
	@Resource
	private EntranceService sevice;

	/**
	 * 新增音乐入口
	 * 
	 * @param Entrance
	 */
	@RequestMapping(value = "/web/addEntrance.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Entrance entrance) {
		sevice.saveEntrance(entrance);
		;
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 新增音乐入口准备
	 * 
	 * @param Entrance
	 */
	@RequestMapping(value = "/web/addEntrancePro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request) {
		return "/addEntrance";
	}

	/**
	 * 修改音乐入口
	 * 
	 * @param Entrance
	 */
	@RequestMapping(value = "/web/uppEntrance.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Entrance channel) {
		StatusJSON statusJSON = new StatusJSON();
		// 插入图片
		Photoforscene photoforscene = new Photoforscene();
		String[] photos = channel.getPhotourl().split(",");
		channel.setPhotourl(photos[photos.length - 1]);
		sevice.uppEntrance(channel);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 修改音乐入口准备
	 * 
	 * @param Entrance
	 */
	@RequestMapping(value = "/web/uppEntrancePro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Entrance entrance = sevice.getById(id);
		request.setAttribute("entrance", entrance);
		return "/addEntrance";
	}

	/**
	 * 删除音乐入口
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/delEntrance.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id, String cuuid) {
		StatusJSON statusJSON = new StatusJSON();
		sevice.delEntrance(id);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 查询所有音乐入口
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/getEntrance.action", method = RequestMethod.POST)
	public String getAll(HttpServletResponse response,
			HttpServletRequest request, int currentPage) {
		Page zPage = new Page();
		zPage.setCurrentPage(currentPage);
		zPage.setEveryPage(10);
		Result result = sevice.getAllEntrance(zPage);
		Page page = result.getPage();
		List<Entrance> list = (List<Entrance>) result.getList();
		request.setAttribute("entranceList", list);
		request.setAttribute("page", page);
		return "/entranceList";
	}
	
	/**
	 * 修改音乐入口排序
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/uppRecommenenSort.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON uppRecommenSort(HttpServletResponse response,
			HttpServletRequest request, int id,int sort) {
		StatusJSON statusJSON = new StatusJSON();
		Entrance entrance=sevice.getById(id);
		entrance.setSort(sort);
		sevice.uppEntrance(entrance);
		statusJSON.setStatus(1);
		return statusJSON;
	}


}
