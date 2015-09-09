package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.LabelforsceneDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Labelforscene;

@Component
public class LabelforsceneDaoImpl extends SuperDao implements LabelforsceneDao {
	public void saveLabelforscene(Labelforscene labelforscene) {
		this.hibernateTemplate.save(labelforscene);
	}

	public List<?> getLabelList(String suuid) {
		return this.hibernateTemplate.find("from Labelforscene where suuid='"
				+ suuid + "'");
	}

	public void delLabelforscene(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(Labelforscene.class, id));
	}

	public List<?> getAllLabelList() {
		return this.hibernateTemplate.find("from Labelforscene");
	}
}
