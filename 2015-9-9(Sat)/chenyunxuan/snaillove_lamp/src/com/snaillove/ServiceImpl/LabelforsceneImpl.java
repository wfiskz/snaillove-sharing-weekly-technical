package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.LabelforsceneDao;
import com.snaillove.Service.LabelforsceneService;
import com.snaillove.model.Labelforscene;
import com.snaillove.utils.FormatText;

@Component
public class LabelforsceneImpl implements LabelforsceneService {

	@Resource
	private LabelforsceneDao dao;

	public void saveLabelforscene(Labelforscene labelforscene) {
		labelforscene.setCreatetime(FormatText.getStringDate(new Date()));
		labelforscene.setUuid(UUID.randomUUID().toString());
		dao.saveLabelforscene(labelforscene);
	}

	public List<?> getLabelList(String suuid) {
		return dao.getLabelList(suuid);
	}

	public void delLabelforscene(int id) {
		dao.delLabelforscene(id);
	}

	public List<?> getAllLabelList() {
		return dao.getAllLabelList();
	}

	public LabelforsceneDao getDao() {
		return dao;
	}

	public void setDao(LabelforsceneDao dao) {
		this.dao = dao;
	}

}
