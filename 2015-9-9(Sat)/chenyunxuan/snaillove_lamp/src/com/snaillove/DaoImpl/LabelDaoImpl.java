package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.LabelDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Label;
import com.snaillove.model.Labelforscene;
import com.snaillove.utils.Page;

@Component
public class LabelDaoImpl extends SuperDao implements LabelDao {

	public void saveLabel(Label label) {
		this.hibernateTemplate.save(label);
	}

	public void uppLabel(Label label) {
		this.hibernateTemplate.update(label);
	}

	public void delLabel(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(Label.class,
				id));
	}

	public Label getLabel(int id) {
		return this.hibernateTemplate.get(Label.class, id);
	}

	public Label getLabelByUuid(String uuid) {
		return (Label) this.hibernateTemplate.find(
				"from Label where uuid=" + uuid).get(0);
	}

	public List<?> getAllLabel(String keyword,String suuid) {
		StringBuffer str=new StringBuffer();
		String hql="from Label order where state=0 and lname like '%"+keyword+"%'";
		List<Labelforscene> list=this.hibernateTemplate.find("from Labelforscene where suuid='"+suuid+"'");
		if(list.size()!=0){
			for(Labelforscene a:list){
				str.append("'"+a.getLuuid()+"',");
			}
			hql+=" and uuid not in("+str.toString().substring(0,str.length()-1)+")";
		}
		return this.hibernateTemplate.find(hql);
	}

	public List<?> getSearchLabel(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Label where lname like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount(String keyword) {
		return this.hibernateTemplate.find("from Label where lname like '%"+keyword+"%'")
				.size();
	}

	public int getAllCount() {
		return this.hibernateTemplate.find("from Label").size();
	}
}
