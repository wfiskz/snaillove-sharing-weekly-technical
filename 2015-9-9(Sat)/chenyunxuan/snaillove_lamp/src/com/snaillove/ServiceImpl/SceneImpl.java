package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.snaillove.Dao.SceneDao;
import com.snaillove.Service.SceneService;
import com.snaillove.model.Scene;
import com.snaillove.utils.FormatText;
import com.snaillove.utils.Page;
import com.snaillove.utils.PageUtil;
import com.snaillove.utils.Result;

@Component
public class SceneImpl implements SceneService {

	@Resource
	private SceneDao dao;

	public void delScene(int id) {
		dao.delScene(id);
	}

	public void addScene(Scene scene) {
		// 判断是否需要读取RGB和叠加音效(0读，1不读)
		if (scene.getEffect() == 0) {
			scene.setChecklight(1);
		} else {
			scene.setChecklight(0);
		}
		// 如果状态为下架就不让可以推荐
		if (scene.getState() == 1) {
			scene.setRecommed(0);
		} else {
			scene.setRecommed(1);
		}
		scene.setCreatetime(FormatText.getStringDate(new Date()));
		scene.setUuid(UUID.randomUUID().toString());

		dao.saveScene(scene);
	}

	public void uppScene(Scene scene) {
		// 判断是否需要读取RGB和叠加音效(0读，1不读)
		if (scene.getEffect() == 0) {
			scene.setChecklight(0);
		} else {
			scene.setChecklight(1);
		}
		dao.uppScene(scene);
	}

	public Scene getScene(int id) {
		return dao.getScene(id);
	}

	@Transactional(readOnly = true)
	public Result getSearchAllScene(Page page) {
		String keyword = "";
		if (page.getKeyword() != null) {
			keyword = page.getKeyword();
		}
		Result result = new Result();
		Integer seInteger = page.getSearchtype();
		page = PageUtil.createPage(page, dao.getAllCount(keyword));
		page.setSearchtype(seInteger);
		page.setKeyword(keyword);
		result.setList(dao.getSearchScene(page));
		result.setPage(page);
		return result;
	}

	public List<?> getAllScene(String keyword) {
		return dao.getAllScene(keyword);
	}

	public SceneDao getDao() {
		return dao;
	}

	public void setDao(SceneDao dao) {
		this.dao = dao;
	}

	public Scene getSceneInfo(String uuid) {
		return dao.getSceneByUuid(uuid);
	}

	public Boolean getSceneByCuuid(String cuuid) {
		return dao.getSceneByCuuid(cuuid);
	}

	public List<?> getReScene() {
		return dao.getReSceneList();
	}
}
