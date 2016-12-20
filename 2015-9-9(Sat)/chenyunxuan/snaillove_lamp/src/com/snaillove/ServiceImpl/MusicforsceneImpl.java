package com.snaillove.ServiceImpl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.MusicforsceneDao;
import com.snaillove.Service.MusicforsceneSevice;
import com.snaillove.model.Musicforscene;
import com.snaillove.utils.FormatText;

@Component
public class MusicforsceneImpl implements MusicforsceneSevice {

	@Resource
	private MusicforsceneDao dao;

	public List<?> getMusicList(String uuid) {
		return dao.getMusicList(uuid);
	}

	public void saveMusic(Musicforscene musicforscene) {
		musicforscene.setCreatetime(FormatText.getStringDate(new Date()));
		dao.saveMusic(musicforscene);
	}

	public void delMusic(int id) {
		dao.delMusic(id);
	}

	public List<?> getMusic(String sid) {
		return dao.getMusic(sid);
	}
	
	public String getMusicPath(int id) {
		return dao.getmusic(id);
	}

	public MusicforsceneDao getDao() {
		return dao;
	}

	public void setDao(MusicforsceneDao dao) {
		this.dao = dao;
	}

}