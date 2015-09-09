package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.SearchchannelDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.bean.Channel;
import com.snaillove.model.Searchchannel;
import com.snaillove.utils.Page;

@Component
public class SearchchannelDaoImpl extends SuperDao implements SearchchannelDao {

	public List<Searchchannel> getAllSearchchannel() {
		return this.hibernateTemplate
				.find("from Searchchannel where isdel=0 order by sort desc");
	}

	public Searchchannel getByid(int id) {
		return this.hibernateTemplate.get(Searchchannel.class, id);
	}

	public void save(Searchchannel channel) {
		this.hibernateTemplate.save(channel);
	}

	public void upp(Searchchannel channel) {
		this.hibernateTemplate.update(channel);
	}

	public void del(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(Searchchannel.class,
				id));
	}

	@Transactional(readOnly=true)
	public List<?> getSearchChannel(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Searchchannel where sname like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount() {
		return this.hibernateTemplate.find("from Searchchannel").size();
	}

	public int getAllCount(String keyword) {
		return this.hibernateTemplate.find(
				"from Searchchannel where sname like '%" + keyword + "%'").size();
	}

}
