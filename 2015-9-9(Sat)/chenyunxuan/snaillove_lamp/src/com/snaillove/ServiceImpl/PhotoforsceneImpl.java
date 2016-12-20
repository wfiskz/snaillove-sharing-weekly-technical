package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.PhotoforsceneDao;
import com.snaillove.Service.PhotoforsceneService;
import com.snaillove.model.Photoforscene;
import com.snaillove.utils.FormatText;

@Component
public class PhotoforsceneImpl implements PhotoforsceneService {
	@Resource
	private PhotoforsceneDao dao;

	public List<?> getScenephoto(String suuid) {
		return dao.getScenephoto(suuid);
	}

	public void saveScenephoto(Photoforscene photoforscene) {
		photoforscene.setCreatetime(FormatText.getStringDate(new Date()));
		dao.saveScenephoto(photoforscene);
	}

	public void delScenephoto(String suuid) {
		dao.delAllphoto(suuid);
	}

	public PhotoforsceneDao getDao() {
		return dao;
	}

	public void setDao(PhotoforsceneDao dao) {
		this.dao = dao;
	}
}
