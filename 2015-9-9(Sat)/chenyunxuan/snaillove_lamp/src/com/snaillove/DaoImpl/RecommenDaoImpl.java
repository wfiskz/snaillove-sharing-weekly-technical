package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.RecommenDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Recommen;
import com.snaillove.utils.Page;

@Component
public class RecommenDaoImpl extends SuperDao implements RecommenDao {

	public void saveRecommen(Recommen recomen) {
		this.hibernateTemplate.save(recomen);
	}

	public void delRecommen(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(
				Recommen.class, id));
	}

	public List<?> getAllRecommen() {
		return this.hibernateTemplate.find("from Recommen order by sort desc");
	}

	public List<?> getSearchRecommen(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Recommen where sname like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount() {
		return this.hibernateTemplate.find("from Recommen").size();
	}

	public int getAllCount(String keyword) {
		return this.hibernateTemplate.find("from Recommen where sname like '%" + keyword + "%'").size();
	}

	public Recommen getRecommen(int id) {
		return this.hibernateTemplate.get(Recommen.class, id);
	}

	public List<?> getRecommenList() {
		return this.hibernateTemplate.find("from Recommen order by sort desc limit 6");
	}

	public void uppRecommen(Recommen recommen) {
		this.hibernateTemplate.update(recommen);
	}

	public Recommen getRecommenBySuuid(String suuid) {
		if(this.hibernateTemplate.find("from Recommen where suuid='"+suuid+"'").size()!=0){
			return (Recommen)this.hibernateTemplate.find("from Recommen where suuid='"+suuid+"'").get(0);
		}else{
			return new Recommen();
		}
	}
}
