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

import com.snaillove.Service.LabelService;
import com.snaillove.model.Label;
import com.snaillove.model.Photoforscene;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class LabelAction extends BaseAction {
	@Resource
	private LabelService service;

	// 增加标签
	@RequestMapping(value = "/web/addLabel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Label label) {
		service.saveLabel(label);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 增加标签准备
	@RequestMapping(value = "/web/addLabelPro.action", method = RequestMethod.POST)
	public String savePro() {
		return "addLabel";
	}

	// 修改标签
	@RequestMapping(value = "/web/uppLabel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Label label) {
		// 插入图片
		Photoforscene photoforscene = new Photoforscene();
		String[] photos = label.getImgurl().split(",");
		label.setImgurl(photos[photos.length - 1]);
		service.uppLabel(label);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 修改标签准备
	@RequestMapping(value = "/web/uppLabelPro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Label label = service.getLabel(id);
		request.setAttribute("label", label);
		return "addLabel";
	}

	// 修改标签准备
	@RequestMapping(value = "/web/delLabel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id) {
		service.delLabel(id);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 分页标签列表
	@RequestMapping(value = "/web/getLabel.action", method = RequestMethod.POST)
	public String getLabel(HttpServletResponse response,
			HttpServletRequest request, int currentPage, String keyword) {
		try {
			Page zPage = new Page();
			zPage.setCurrentPage(currentPage);
			zPage.setEveryPage(10);
			if (keyword != null) {
				zPage.setKeyword(URLDecoder.decode(keyword, "UTF-8"));
			}
			Result result = service.getSearchAllLabel(zPage);
			@SuppressWarnings("unchecked")
			List<Label> labels = (List<Label>) result.getList();
			Page page = result.getPage();
			request.setAttribute("labellist", labels);
			request.setAttribute("page", page);
			request.setAttribute("keword", keyword);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "labeList";
	}

	public LabelService getService() {
		return service;
	}

	public void setService(LabelService service) {
		this.service = service;
	}

}
