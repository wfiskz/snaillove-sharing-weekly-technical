package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.RecommenDao;
import com.snaillove.Service.RecommenService;
import com.snaillove.model.Recommen;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class RecommenImpl implements RecommenService {
	@Resource
	private RecommenDao dao;

	public void saveRecommen(Recommen recoomen) {
		recoomen.setUuid(UUID.randomUUID().toString());
		recoomen.setCreatetime(FormatText.getStringDate(new Date()));
		recoomen.setSort(100);
		dao.saveRecommen(recoomen);
	}

	public void delRecommen(int id) {
		dao.delRecommen(id);
	}

	public Recommen getRecommen(int id) {
		return dao.getRecommen(id);
	}

	@Transactional(readOnly = true)
	public List<?> getAllRecommen() {
		return dao.getAllRecommen();
	}

	@Transactional(readOnly = true)
	public Result getSearchRecommen(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount(keyword));
		page.setSearchtype(seInteger);
		page.setKeyword(keyword);
		result.setList(dao.getSearchRecommen(page));
		result.setPage(page);
		return result;
	}

	public List<?> getRecommenList() {
		return dao.getRecommenList();
	}

	public RecommenDao getDao() {
		return dao;
	}

	public void setDao(RecommenDao dao) {
		this.dao = dao;
	}

	public void uppRecommen(Recommen recommen) {
		dao.uppRecommen(recommen);
	}

	public Recommen getRecommenBySuuid(String suuid) {
		return dao.getRecommenBySuuid(suuid);
	}

}