package com.snaillove.DaoImpl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.MusicforsceneDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.Musicforscene;

@Component
public class MusicforsceneDaoImpl extends SuperDao implements MusicforsceneDao {

	public List<?> getMusicList(String uuid) {
		return this.hibernateTemplate.find("from Musicforscene where suuid='"
				+ uuid + "'");
	}

	public List<?> getMusic(String sid) {
		List rows = this.jdbcTemplate
				.queryForList("select id,name,name_en,artistperformer from tb_smusic where sid="
						+ sid);
		/*
		 * Iterator it = rows.iterator(); while(it.hasNext()) { Map userMap =
		 * (Map) it.next(); System.out.print(userMap.get("name") + "\t");
		 * System.out.print(userMap.get("name_en") + "\t");
		 * System.out.print(userMap.get("id") + "\t");
		 * System.out.println(userMap.get("age") + "\t"); }
		 */
		return rows;
	}

	public String getmusic(int id) {
		String path = "";
		List rows = this.jdbcTemplate
				.queryForList("select path from tb_smusic_file where music_id="
						+ id);
		if (rows.size() != 0) {
			Map map = (Map) rows.get(0);
			path = (String) map.get("path");
		}
		return path;
	}

	public void saveMusic(Musicforscene musicforscene) {
		this.hibernateTemplate.save(musicforscene);
	}

	public void delMusic(int id) {
		this.hibernateTemplate.delete(this.hibernateTemplate.get(
				Musicforscene.class, id));
	}
}
