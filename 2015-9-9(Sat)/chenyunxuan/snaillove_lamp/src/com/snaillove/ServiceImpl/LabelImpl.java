package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.LabelDao;
import com.snaillove.Service.LabelService;
import com.snaillove.model.Label;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class LabelImpl implements LabelService {
	@Resource
	private LabelDao dao;

	public void saveLabel(Label label) {
		label.setUuid(UUID.randomUUID().toString());
		label.setCreatetime(FormatText.getStringDate(new Date()));
		dao.saveLabel(label);
	}

	public void uppLabel(Label label) {
		dao.uppLabel(label);
	}

	public Label getLabel(int id) {
		return dao.getLabel(id);
	}

	public Label getLabelByUuid(String uuid) {
		return dao.getLabelByUuid(uuid);
	}

	public void delLabel(int id) {
		dao.delLabel(id);
	}

	@Transactional(readOnly = true)
	public Result getSearchAllLabel(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount(keyword));
		page.setSearchtype(seInteger);
		page.setKeyword(keyword);
		result.setList(dao.getSearchLabel(page));
		result.setPage(page);
		return result;
	}

	public List<?> getAllLabel(String keyword,String suuid) {
		return dao.getAllLabel(keyword,suuid);
	}

	public LabelDao getDao() {
		return dao;
	}

	public void setDao(LabelDao dao) {
		this.dao = dao;
	}

}
