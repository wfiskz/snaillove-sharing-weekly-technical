package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.EntranceDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Entrance;
import com.snaillove.utils.Page;

@Component
public class EntranceDaoImpl extends SuperDao implements EntranceDao {

	public List<Entrance> getAllEntrance() {
		return this.hibernateTemplate
				.find("from Entrance where isdel=0 order by sort desc");
	}

	public Entrance getByid(int id) {
		return this.hibernateTemplate.get(Entrance.class, id);
	}

	public void save(Entrance entrance) {
		this.hibernateTemplate.save(entrance);
	}

	public void upp(Entrance entrance) {
		this.hibernateTemplate.update(entrance);
	}

	public void del(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(
				Entrance.class, id));
	}

	public List<?> getSearchEntrance(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Entrance where ename like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount() {

		return this.hibernateTemplate.find("from Entrance").size();
	}

	public int getAllCount(String keyword) {

		return this.hibernateTemplate.find(
				"from Entrance where ename like '%" + keyword + "%'").size();
	}

}
