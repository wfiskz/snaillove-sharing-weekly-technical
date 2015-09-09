package com.snaillove.DaoImpl;

import java.util.List;
import org.springframework.stereotype.Component;
import com.snaillove.Dao.ClassificationDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Classification;
import com.snaillove.utils.Page;

@Component
public class ClassificationDaoImpl extends SuperDao implements
		ClassificationDao {

	public void saveClassification(Classification classification) {
		this.hibernateTemplate.save(classification);
	}

	public void uppClassification(Classification classification) {
		this.hibernateTemplate.update(classification);
	}

	public void delClassification(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(
				Classification.class, id));
	}

	public Classification getClassificationByUuid(String uuid) {
		return (Classification) this.hibernateTemplate.find(
				"from Classification where uuid='" + uuid+"'").get(0);
	}

	public Classification getClassification(int id) {
		return this.hibernateTemplate.get(Classification.class, id);
	}

	public List<?> getAllClassification() {
		return this.hibernateTemplate.find("from Classification where state=0 order by sort");
	}

	public List<?> getSearchClassification(Page page) {
		return this.getSession().createQuery("from Classification order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount() {
		return this.hibernateTemplate.find("from Classification").size();
	}

}