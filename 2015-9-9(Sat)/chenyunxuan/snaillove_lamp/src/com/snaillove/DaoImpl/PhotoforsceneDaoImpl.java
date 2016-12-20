package com.snaillove.DaoImpl;

import java.util.List;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.PhotoforsceneDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Photoforscene;

@Component
public class PhotoforsceneDaoImpl extends SuperDao implements PhotoforsceneDao {
	public List<?> getScenephoto(String suuid) {
		return this.hibernateTemplate.find("from Photoforscene where suuid='"+ suuid+"'");
	}

	public void saveScenephoto(Photoforscene photoforscene) {
		this.hibernateTemplate.save(photoforscene);
	}

	public void delAllphoto(String suuid) {
		List<Photoforscene> photos=this.hibernateTemplate.find("from Photoforscene where suuid='"+suuid+"'");
		for(Photoforscene photo:photos){
			this.hibernateTemplate.delete(photo);
		}
	}
}
