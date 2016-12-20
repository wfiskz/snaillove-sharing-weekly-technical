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

import com.snaillove.Service.SlideService;
import com.snaillove.model.Photoforscene;
import com.snaillove.model.Slide;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class SlideAction extends BaseAction {
	@Resource
	private SlideService sevice;

	/**
	 * ÐÂÔöÂÖ²¥Í¼
	 * 
	 * @param Slide
	 */
	@RequestMapping(value = "/web/addSlide.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Slide slide) {
		sevice.saveSlide(slide);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * ÐÂÔöÂÖ²¥Í¼×¼±¸
	 * 
	 * @param Slide
	 */
	@RequestMapping(value = "/web/addSlidePro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request) {
		return "/addSlide";
	}

	/**
	 * ÐÞ¸ÄÂÖ²¥Í¼
	 * 
	 * @param Slide
	 */
	@RequestMapping(value = "/web/uppSlide.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Slide slide) {
		StatusJSON statusJSON = new StatusJSON();
		// ²åÈëÍ¼Æ¬
		Photoforscene photoforscene = new Photoforscene();
		String[] photos = slide.getPhotourl().split(",");
		slide.setPhotourl(photos[photos.length - 1]);
		sevice.uppSlide(slide);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * ÐÞ¸ÄÂÖ²¥Í¼×¼±¸
	 * 
	 * @param Slide
	 */
	@RequestMapping(value = "/web/uppSlidePro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Slide slide = sevice.getById(id);
		request.setAttribute("slide", slide);
		return "/addSlide";
	}

	/**
	 * É¾³ýÂÖ²¥Í¼
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/delSlide.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id) {
		StatusJSON statusJSON = new StatusJSON();
		sevice.delSlide(id);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	/**
	 * ²éÑ¯ËùÓÐÂÖ²¥Í¼
	 * 
	 * @param id
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value = "/web/getSlide.action", method = RequestMethod.POST)
	public String getAll(HttpServletResponse response,
			HttpServletRequest request, int currentPage, String keyword) throws UnsupportedEncodingException {
		System.out.println(keyword);
		Page zPage = new Page();
		zPage.setCurrentPage(currentPage);
		zPage.setEveryPage(10);
		if (keyword != null) {
			zPage.setKeyword(URLDecoder.decode(keyword, "UTF-8"));
		}
		Result result = sevice.getAllSlide(zPage);
		Page page = result.getPage();
		List<Slide> list = (List<Slide>) result.getList();
		request.setAttribute("slideList", list);
		request.setAttribute("page", zPage);
		return "/slideList";
	}
	
	/**
	 * ÐÞ¸ÄÂÖ²¥Í¼ÅÅÐò
	 * 
	 * @param id
	 */
	@RequestMapping(value = "/web/uppRecommenslSort.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON uppRecommenSort(HttpServletResponse response,
			HttpServletRequest request, int id,int sort) {
		StatusJSON statusJSON = new StatusJSON();
		Slide slide=sevice.getById(id);
		slide.setSort(sort);
		sevice.uppSlide(slide);
		statusJSON.setStatus(1);
		return statusJSON;
	}

	public SlideService getSevice() {
		return sevice;
	}

	public void setSevice(SlideService sevice) {
		this.sevice = sevice;
	}
}
