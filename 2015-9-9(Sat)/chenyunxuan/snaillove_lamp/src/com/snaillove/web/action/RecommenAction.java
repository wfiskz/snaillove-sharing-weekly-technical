package com.snaillove.web.action;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.snaillove.Service.RecommenService;
import com.snaillove.Service.SceneService;
import com.snaillove.model.Recommen;
import com.snaillove.model.Scene;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class RecommenAction {
	@Resource
	private RecommenService service;
	@Resource
	private SceneService sceneSevice;

	// 增加推荐情景
	@RequestMapping(value = "/web/addRecommen.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Scene scene) {
		// 把场景信息匹配到推荐表里去
		Recommen commen = new Recommen();
		commen.setSuuid(scene.getUuid());
		commen.setSname(scene.getSname());
		service.saveRecommen(commen);
		// 修改情景recommed为0
		Scene sceneNow = sceneSevice.getSceneInfo(scene.getUuid());
		sceneNow.setRecommed(0);
		sceneSevice.uppScene(sceneNow);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 增加推荐情景准备
	@RequestMapping(value = "/web/addRecommenPro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request, String keyword) {
		List<?> rcScenes = service.getAllRecommen();
		List<?> scenes = sceneSevice.getAllScene(keyword);
		request.setAttribute("rcScenes", rcScenes);
		request.setAttribute("scenes", scenes);
		request.setAttribute("keyword", keyword);
		return "recomendForScene";
	}

	// 删除推荐情景
	@RequestMapping(value = "/web/delRecommen.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Recommen recommen = service.getRecommen(id);
		// 修改情景recommed为1
		Scene sceneNow = sceneSevice.getSceneInfo(recommen.getSuuid());
		sceneNow.setRecommed(1);
		sceneSevice.uppScene(sceneNow);
		// 删除推荐场景
		service.delRecommen(id);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 修改推荐情景排序
	@RequestMapping(value = "/web/uppRecommenSort.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON uppsort(HttpServletResponse response,
			HttpServletRequest request, String id,String sort) {
		Recommen recommen = service.getRecommen(Integer.parseInt(id));
		recommen.setSort(Integer.parseInt(sort));
		service.uppRecommen(recommen);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 分页推荐情景列表
	@RequestMapping(value = "/web/getRecommen.action", method = RequestMethod.POST)
	public String getScene(HttpServletResponse response,
			HttpServletRequest request, int currentPage, String keyword) {
		try {
			Page zPage = new Page();
			zPage.setCurrentPage(currentPage);
			zPage.setEveryPage(10);
			if (keyword != null) {
				zPage.setKeyword(URLDecoder.decode(keyword, "UTF-8"));
			}
			Result result = service.getSearchRecommen(zPage);
			@SuppressWarnings("unchecked")
			List<Scene> recommens = (List<Scene>) result.getList();
			Page page = result.getPage();
			request.setAttribute("recommenList", recommens);
			request.setAttribute("page", page);
			request.setAttribute("keyword", keyword);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "recommenList";
	}

	public RecommenService getService() {
		return service;
	}

	public void setService(RecommenService service) {
		this.service = service;
	}

	public SceneService getSceneSevice() {
		return sceneSevice;
	}

	public void setSceneSevice(SceneService sceneSevice) {
		this.sceneSevice = sceneSevice;
	}

}
