package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.SlideDao;
import com.snaillove.Service.SlideService;
import com.snaillove.model.Slide;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class SlideImpl implements SlideService {
	@Resource
	private SlideDao dao;

	public List<Slide> getAllSlide() {
		return dao.getAllSlide();
	}

	public Slide getById(int id) {
		return dao.getById(id);
	}

	public void saveSlide(Slide slide) {
		slide.setCreatetime(FormatText.getStringDate(new Date()));
		dao.save(slide);
	}

	public void uppSlide(Slide slide) {
		dao.upp(slide);
	}

	public void delSlide(int id) {
		dao.del(id);
	}

	public Result getAllSlide(Page page) {
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		result.setList(dao.getSearchSlide(page));
		page = PageUtil.createPage(page, dao.getAllCount(page.getKeyword()));
		page.setSearchtype(seInteger);
		result.setPage(page);
		return result;
	}

	public SlideDao getDao() {
		return dao;
	}

	public void setDao(SlideDao dao) {
		this.dao = dao;
	}
}
