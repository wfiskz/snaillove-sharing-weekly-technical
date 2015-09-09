package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.SceneDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Scene;
import com.snaillove.utils.Page;

@Component
public class SceneDaoImpl extends SuperDao implements SceneDao {

	public void saveScene(Scene scene) {
		this.hibernateTemplate.save(scene);
	}

	public void uppScene(Scene scene) {
		this.hibernateTemplate.update(scene);
	}

	public void delScene(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(Scene.class,
				id));
	}

	public Scene getScene(int id) {
		return this.hibernateTemplate.get(Scene.class, id);
	}

	public Scene getSceneByUuid(String uuid) {
		return (Scene) this.hibernateTemplate.find(
				"from Scene where uuid='" + uuid + "'").get(0);
	}

	public List<?> getAllScene(String keyword) {
		return this.hibernateTemplate
				.find("from Scene where recommed=1 and sname like '%" + keyword
						+ "%' order by sort desc");
	}

	public List<?> getSearchScene(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		return this
				.getSession()
				.createQuery(
						"from Scene where sname like '%" + keyword
								+ "%' order by sort desc")
				.setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getEveryPage()).list();
	}

	public int getAllCount(String keyword) {
		return this.hibernateTemplate.find(
				"from Scene where sname like '%" + keyword + "%'").size();
	}

	public int getAllCount() {
		return this.hibernateTemplate.find("from Scene").size();
	}

	public Boolean getSceneByCuuid(String cuuid) {
		int sum = this.hibernateTemplate.find(
				"from Scene where cuuid='" + cuuid + "'").size();
		if (sum == 0) {
			return false;
		} else {
			return true;
		}
	}

	public List<?> getReSceneList() {
		return this.hibernateTemplate.find("from Scene where recommed=1");
	}

}
