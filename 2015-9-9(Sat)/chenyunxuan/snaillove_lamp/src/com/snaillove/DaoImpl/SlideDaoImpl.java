package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.SlideDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Slide;
import com.snaillove.utils.Page;

@Component
public class SlideDaoImpl extends SuperDao implements SlideDao {

	public List<Slide> getAllSlide() {
		return this.hibernateTemplate
				.find("from Slide where isdel=0 order by sort desc");
	}

	public Slide getById(int id) {
		return this.hibernateTemplate.get(Slide.class, id);
	}

	public void save(Slide slide) {
		this.hibernateTemplate.save(slide);
	}

	public void upp(Slide slide) {
		this.hibernateTemplate.update(slide);
	}

	public void del(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(Slide.class,
				id));
	}

	@Transactional(readOnly = true)
	public List<?> getSearchSlide(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Slide where lname like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount() {

		return this.hibernateTemplate.find("from Slide").size();
	}

	public int getAllCount(String keyword) {

		return this.hibernateTemplate.find("from Slide where lname like '%"+ keyword+"%'" )
				.size();
	}
}
