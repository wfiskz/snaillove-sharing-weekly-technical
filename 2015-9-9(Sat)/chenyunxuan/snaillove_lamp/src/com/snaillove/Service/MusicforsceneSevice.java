package com.snaillove.Service;

import java.util.List;

import com.snaillove.model.Musicforscene;

public interface MusicforsceneSevice {
	/**
	 * 通过情景UUID获取歌曲列表
	 * @return
	 */
	public List<?> getMusicList(String suuid);
	
	/**
	 * 增加情景歌曲
	 * @param musicforscene
	 */
	public void saveMusic(Musicforscene musicforscene);
	
	/**
	 * 通过ID删除情景歌曲
	 * @param id
	 */
	public void delMusic(int id);
	
	
	/**
	 * 通过SID去领芯音乐库查找音乐资源（ID,NAME,NAME_EN）
	 * @param sid
	 * @return
	 */
	public List<?> getMusic(String sid);
	
	/**
	 * 通过ID查询歌曲地址
	 * @param id
	 * @return
	 */
	public String getMusicPath(int id);
}
