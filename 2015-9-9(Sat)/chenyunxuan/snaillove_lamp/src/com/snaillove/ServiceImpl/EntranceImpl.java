package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.EntranceDao;
import com.snaillove.Service.EntranceService;
import com.snaillove.model.Entrance;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class EntranceImpl implements EntranceService {

	@Resource
	private EntranceDao dao;

	public List<Entrance> getAllEntrance() {
		return dao.getAllEntrance();
	}

	public Entrance getById(int id) {

		return dao.getByid(id);
	}

	public void saveEntrance(Entrance entrance) {
		entrance.setCreatetime(FormatText.getStringDate(new Date()));
		dao.save(entrance);
	}

	public void uppEntrance(Entrance entrance) {
		dao.upp(entrance);
	}

	public void delEntrance(int id) {
		dao.del(id);
	}

	@Transactional(readOnly=true)
	public Result getAllEntrance(Page page) {
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount());
		page.setSearchtype(seInteger);
		result.setList(dao.getSearchEntrance(page));
		result.setPage(page);
		return result;
	}

	public EntranceDao getDao() {
		return dao;
	}

	public void setDao(EntranceDao dao) {
		this.dao = dao;
	}
}
