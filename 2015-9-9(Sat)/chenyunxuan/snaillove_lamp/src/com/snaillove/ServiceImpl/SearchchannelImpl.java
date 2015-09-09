package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.SearchchannelDao;
import com.snaillove.Service.SearchchannelService;
import com.snaillove.model.Searchchannel;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class SearchchannelImpl implements SearchchannelService {

	@Resource
	private SearchchannelDao dao;

	public List<Searchchannel> getAllSearchchannel() {
		return dao.getAllSearchchannel();
	}

	public Searchchannel getById(int id) {
		return dao.getByid(id);
	}

	public void saveSearchchannel(Searchchannel searchchannel) {
		searchchannel.setCreatetime(FormatText.getStringDate(new Date()));
		dao.save(searchchannel);
	}

	public void uppSearchchannel(Searchchannel searchchannel) {
		dao.upp(searchchannel);
	}

	public void delSearchchannel(int id) {
		dao.del(id);
	}

	public Result getAllSearchchannel(Page page) {
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount());
		page.setSearchtype(seInteger);
		result.setList(dao.getSearchChannel(page));
		result.setPage(page);
		return result;
	}

	public SearchchannelDao getDao() {
		return dao;
	}

	public void setDao(SearchchannelDao dao) {
		this.dao = dao;
	}
}
