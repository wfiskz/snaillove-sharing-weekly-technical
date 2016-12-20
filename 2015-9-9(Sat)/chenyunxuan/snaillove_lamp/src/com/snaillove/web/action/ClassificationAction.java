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

import com.snaillove.Service.ClassificationService;
import com.snaillove.Service.SceneService;
import com.snaillove.model.Classification;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class ClassificationAction extends BaseAction {
	@Resource
	private ClassificationService sevice;
	@Resource
	private SceneService sceneSevice;

	/**
	 * 新增分类
	 * 
	 * @param classification
	 */
	@RequestMapping(value = "/web/addClassification.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Classification classification) {
		sevice.saveClassification(classification);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * 新增分类准备
	 * 
	 * @param classification
	 */
	@RequestMapping(value = "/web/addClassificationPro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request) {
		return "/addClassification";
	}

	/**
	 * 修改分类
	 * 
	 * @param classification
	 */
	@RequestMapping(value = "/web/uppClassification.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Classification classification) {
		StatusJSON statusJSON = new StatusJSON();
		if (classification.getState() == 1) {
			// 判断分类下是否有情景
			Boolean check = sceneSevice.getSceneByCuuid(classification
					.getUuid());
			if (check == false) {
				sevice.uppClassification(classification);
				statusJSON.setStatus(1);
			} else {
				statusJSON.setStatus(2);
			}
		}else{
			sevice.uppClassification(classification);
			statusJSON.setStatus(1);
		}
		return statusJSON;
	}

	/**
	 * 修改分类准备
	 * 
	 * @param classification
	 */
	@RequestMapping(value = "/web/uppClassificationPro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Classification classification = sevice.getClassification(id);
		request.setAttribute("classification", classification);
		return "/addClassification";
	}

	/**
	 * 删除分类
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/delClassification.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id, String cuuid) {
		// 判断分类下是否有情景
		Boolean check = sceneSevice.getSceneByCuuid(cuuid);
		StatusJSON statusJSON = new StatusJSON();
		if (check == false) {
			sevice.delClassification(id);
			statusJSON.setStatus(1);
		} else {
			statusJSON.setStatus(2);
		}
		return statusJSON;
	}

	/**
	 * 查询所有分类
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/getClassification.action", method = RequestMethod.POST)
	public String getAll(HttpServletResponse response,
			HttpServletRequest request, int currentPage) {
		Page zPage = new Page();
		zPage.setCurrentPage(currentPage);
		zPage.setEveryPage(10);
		Result result = sevice.getAllClassification(zPage);
		Page page = result.getPage();
		List<Classification> list = (List<Classification>) result.getList();
		request.setAttribute("classification", list);
		request.setAttribute("page", page);
		return "/classificationList";
	}

	public ClassificationService getSevice() {
		return sevice;
	}

	public void setSevice(ClassificationService sevice) {
		this.sevice = sevice;
	}

	public SceneService getSceneSevice() {
		return sceneSevice;
	}

	public void setSceneSevice(SceneService sceneSevice) {
		this.sceneSevice = sceneSevice;
	}

}
