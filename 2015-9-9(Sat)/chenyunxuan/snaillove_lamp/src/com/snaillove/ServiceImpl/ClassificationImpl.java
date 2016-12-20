package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.ClassificationDao;
import com.snaillove.Service.ClassificationService;
import com.snaillove.model.Classification;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class ClassificationImpl implements ClassificationService {

	@Resource
	private ClassificationDao dao;

	public ClassificationDao getDao() {
		return dao;
	}

	public void setDao(ClassificationDao dao) {
		this.dao = dao;
	}

	public void saveClassification(Classification classification) {
		classification.setCreatetime(FormatText.getStringDate(new Date()));
		classification.setUuid(UUID.randomUUID().toString());
		dao.saveClassification(classification);
	}

	public void uppClassification(Classification classification) {
		dao.uppClassification(classification);
	}

	public Classification getClassification(int id) {
		return dao.getClassification(id);
	}

	public Classification getClassificationByUuid(String uuid) {
		return dao.getClassificationByUuid(uuid);
	}
	
	public void delClassification(int id) {
		dao.delClassification(id);
	}

	public List<?> getAllClassification() {
		return dao.getAllClassification();
	}

	@Transactional(readOnly = true)
	public Result getAllClassification(Page page) {
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount());
		page.setSearchtype(seInteger);
		result.setList(dao.getSearchClassification(page));
		result.setPage(page);
		return result;
	}

	public List<?> getClassificationAll() {
		return dao.getAllClassification();
	}
}
