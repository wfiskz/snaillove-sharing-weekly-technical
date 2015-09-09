package com.snaillove.api.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.snaillove.Service.MusicforsceneSevice;
import com.snaillove.Service.PhotoforsceneService;
import com.snaillove.Service.RecommenService;
import com.snaillove.Service.SceneService;
import com.snaillove.bean.Music;
import com.snaillove.bean.Photo;
import com.snaillove.bean.Scenes;
import com.snaillove.model.Musicforscene;
import com.snaillove.model.Photoforscene;
import com.snaillove.model.Recommen;
import com.snaillove.model.Scene;
import com.snaillove.utils.Config;
import com.snaillove.web.action.BaseAction;

@Controller
public class CellphoneAction extends BaseAction {
	private final String BEFORE = "{";
	private final String BEHODE = "}";
	@Resource
	private SceneService service;
	@Resource
	private RecommenService recommenService;
	@Resource
	private MusicforsceneSevice musicService;
	@Resource
	private PhotoforsceneService photoService;

	// 获取推荐情景总条数
	@RequestMapping(value = "/getSize.action", method = RequestMethod.GET)
	public String getSceneSize(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		int sum = recommenService.getAllRecommen().size();
		String json = BEFORE + "\"size\":" + this.objectToJson(sum) + BEHODE;
		this.printJson(response, json);
		return null;
	}

	// 获取推荐情景
	@RequestMapping(value = "/getScene.action", method = RequestMethod.GET)
	public String getSceneList(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		com.snaillove.bean.Scene sceneNew = new com.snaillove.bean.Scene();
		if (request.getParameter("order") != null) {
			int order = Integer.parseInt(request.getParameter("order"));
			Recommen recommens = (Recommen) recommenService.getAllRecommen()
					.get(order - 1);
			// 获取场景
			Scene scene = service.getSceneInfo(recommens.getSuuid());
			sceneNew = getInfo(scene);
			// 转化JSON
		} else {
			sceneNew.setMusics(new ArrayList());
			sceneNew.setPhotos(new ArrayList());
		}
		this.printJson(response, sceneNew);
		return null;
	}

	// 摇一摇获取情景
	@RequestMapping(value = "/getRockScene.action", method = RequestMethod.GET)
	public String getRockList(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		com.snaillove.bean.Scene sceneNew = new com.snaillove.bean.Scene();
		// 可被摇一摇的总数
		int sum = service.getReScene().size();
		if (sum == 0) {
			sceneNew.setMusics(new ArrayList());
			sceneNew.setPhotos(new ArrayList());
		} else {
			// 获取随机情景
			Scene scene = (Scene) service.getReScene().get(
					(int) (Math.random() * sum));
			sceneNew = getInfo(scene);
		}
		this.printJson(response, sceneNew);
		return null;
	}

	//获取推荐情景列表（最多六个）
	@RequestMapping(value = "/getAllScene.action", method = RequestMethod.GET)
	public String getAllList(HttpServletRequest request,
			HttpServletResponse response, String client_sign){
		com.snaillove.bean.Scene sceneNew = new com.snaillove.bean.Scene();
		List<com.snaillove.bean.Scene> list=new ArrayList<com.snaillove.bean.Scene>();
		Scenes scenes=new Scenes();
		List<Recommen> recommens=(List<Recommen>) recommenService.getRecommenList();
		for(int i=0;i<recommens.size();i++){
			sceneNew=getInfo(service.getSceneInfo(recommens.get(i).getSuuid()));
			list.add(sceneNew);
		}
		scenes.setScens(list);
		this.printJson(response, scenes);
		return null;
	}

	// 转换对象
	public com.snaillove.bean.Scene getInfo(Scene scene) {
		com.snaillove.bean.Scene sceneNew = new com.snaillove.bean.Scene();
		// 转换歌曲列表对象
		List<Musicforscene> musics = (List<Musicforscene>) musicService
				.getMusicList(scene.getUuid());
		List<Music> list = new ArrayList<Music>();
		for (Musicforscene musicOld : musics) {
			Music music = new Music();
			music.setName(musicOld.getMusicname());
			music.setUrl(musicOld.getMusicurl());
			music.setAuthor(musicOld.getMusiccher());
			list.add(music);
		}
		// 转换图片对象
		List<Photoforscene> photos = (List<Photoforscene>) photoService
				.getScenephoto(scene.getUuid());
		List<Photo> photolist = new ArrayList<Photo>();
		for (Photoforscene photoOld : photos) {
			Photo photo = new Photo();
			photo.setUrl(Config.getMessage("imgurl") + photoOld.getImgurl());
			photolist.add(photo);
		}
			sceneNew.setThumbnail(Config.getMessage("imgurl")+scene.getThumbnail());
		sceneNew.setName(scene.getSname());
		sceneNew.setDescription(scene.getScenebak());
		sceneNew.setLampEffect(scene.getEffect());
		sceneNew.setRed(scene.getRnum());
		sceneNew.setGreen(scene.getGnum());
		sceneNew.setBlue(scene.getBnum());
		sceneNew.setAttachedLampEffect(scene.getLightadd());
		// 转换对象
		if (scene.getEffect() == 0) {
			sceneNew.setLampEffectWithRGB(true);
		} else {
			sceneNew.setLampEffectWithRGB(false);
		}
		sceneNew.setPhotos(photolist);
		sceneNew.setMusics(list);
		return sceneNew;
	}

	public SceneService getService() {
		return service;
	}

	public void setService(SceneService service) {
		this.service = service;
	}

	public RecommenService getRecommenService() {
		return recommenService;
	}

	public void setRecommenService(RecommenService recommenService) {
		this.recommenService = recommenService;
	}

	public MusicforsceneSevice getMusicService() {
		return musicService;
	}

	public void setMusicService(MusicforsceneSevice musicService) {
		this.musicService = musicService;
	}

	public PhotoforsceneService getPhotoService() {
		return photoService;
	}

	public void setPhotoService(PhotoforsceneService photoService) {
		this.photoService = photoService;
	}
}
