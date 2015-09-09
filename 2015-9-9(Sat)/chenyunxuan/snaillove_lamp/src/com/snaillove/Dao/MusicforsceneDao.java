package com.snaillove.Dao;

import java.util.List;

import com.snaillove.model.Musicforscene;

public interface MusicforsceneDao {
	/**
	 * 通过情景UUID获取音乐列表
	 * @return
	 */
	public List<?> getMusicList(String uuid);
	
	/**
	 * 在领芯音乐库中通过SID找到音乐
	 * @param mname
	 * @return
	 */
	public List<?> getMusic(String sid);
	
	
	/**
	 * 通过ID查询歌曲链接
	 * @param id
	 * @return
	 */
	public String getmusic(int id);
	
	/**
	 * 新增情景歌曲
	 */
	public void saveMusic(Musicforscene musicforscene);
	
	/**
	 * 删除情景歌曲
	 * @param id
	 */
	public void delMusic(int id);
}
