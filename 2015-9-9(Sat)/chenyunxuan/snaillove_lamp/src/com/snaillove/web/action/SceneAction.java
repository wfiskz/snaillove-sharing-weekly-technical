package com.snaillove.web.action;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.snaillove.Service.ClassificationService;
import com.snaillove.Service.LabelService;
import com.snaillove.Service.LabelforsceneService;
import com.snaillove.Service.MusicforsceneSevice;
import com.snaillove.Service.PhotoforsceneService;
import com.snaillove.Service.RecommenService;
import com.snaillove.Service.SceneService;
import com.snaillove.model.Classification;
import com.snaillove.model.Labelforscene;
import com.snaillove.model.Musicforscene;
import com.snaillove.model.Photoforscene;
import com.snaillove.model.Scene;
import com.snaillove.utils.Config;
import com.snaillove.utils.Page;
import com.snaillove.utils.Result;
import com.snaillove.utils.StatusJSON;

@Controller
public class SceneAction extends BaseAction {
	@Resource
	private SceneService service;
	@Resource
	private ClassificationService classService;
	@Resource
	private PhotoforsceneService photoService;
	@Resource
	private MusicforsceneSevice musicService;
	@Resource
	private LabelforsceneService labelforsceneService;
	@Resource
	private LabelService labelService;
	@Resource
	private RecommenService reService;

	// 增加情景
	@RequestMapping(value = "/web/addScene.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON save(@ModelAttribute Scene scene, String filename) {
		// 插入缩略图片
		String[] photo = scene.getThumbnail().split(",");
		scene.setThumbnail(photo[photo.length - 1]);
		service.addScene(scene);
		// 插入图片
		Photoforscene photoforscene = new Photoforscene();
		photoforscene.setSuuid(scene.getUuid());
		String[] photos = filename.split(",");
		int a = 1;
		for (int i = photos.length; i > 0; i--) {
			a++;
			photoforscene.setImgurl(photos[i - 1]);
			photoService.saveScenephoto(photoforscene);
			if (a > 2) {
				break;
			}
		}
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 增加情景准备
	@RequestMapping(value = "/web/addScenePro.action", method = RequestMethod.POST)
	public String savePro(HttpServletResponse response,
			HttpServletRequest request) {
		List<Classification> classifications = (List<Classification>) classService
				.getClassificationAll();
		request.setAttribute("classifications", classifications);
		return "addScene";
	}

	// 修改情景
	@RequestMapping(value = "/web/uppScene.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON upp(@ModelAttribute Scene scene, String filename) {
		// 修改是否能被推荐
		if (scene.getState() == 1) {
			scene.setRecommed(0);
			// 如果情景下线，情景对应的推荐也删除
			if (reService.getRecommenBySuuid(scene.getUuid()).getId() != 0) {
				reService.delRecommen(reService.getRecommenBySuuid(
						scene.getUuid()).getId());
			}
		} else {
			// 如果情景上线,判断是否增加了该推荐,没有就把情景中的推荐字段改为未推荐
			if (reService.getRecommenBySuuid(scene.getUuid()).getId() == 0) {
				scene.setRecommed(1);
			}
		}
		// 插入缩略图片
		String[] photo = scene.getThumbnail().split(",");
		scene.setThumbnail(photo[photo.length - 1]);
		service.uppScene(scene);
		if(filename.length()!=0){
			// 插入图片
			Photoforscene photoforscene = new Photoforscene();
			photoforscene.setSuuid(scene.getUuid());
			String[] photos = filename.split(",");
			int a = 1;
			// 修改时，先删除情景图片
			photoService.delScenephoto(scene.getUuid());
			for (int i = photos.length; i > 0; i--) {
				a++;
				photoforscene.setImgurl(photos[i - 1]);
				// 再插入图片
				photoService.saveScenephoto(photoforscene);
				if (a > 2) {
					break;
				}
			}
		}
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 修改情景准备
	@RequestMapping(value = "/web/uppScenePro.action", method = RequestMethod.POST)
	public String uppPro(HttpServletResponse response,
			HttpServletRequest request, int id) {
		Scene scene = service.getScene(id);
		List<Classification> classifications = (List<Classification>) classService
				.getClassificationAll();
		List<Photoforscene> photos = (List<Photoforscene>) photoService
				.getScenephoto(scene.getUuid());
		request.setAttribute("classifications", classifications);
		request.setAttribute("scene", scene);
		request.setAttribute("photos", photos);
		return "addScene";
	}

	// 删除情景
	@RequestMapping(value = "/web/delScene.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON del(int id) {
		Scene scene = service.getScene(id);
		// 如果情景下线，情景对应的推荐也删除
		if (reService.getRecommenBySuuid(scene.getUuid()).getId() != 0) {
			reService.delRecommen(reService.getRecommenBySuuid(scene.getUuid())
					.getId());
		}
		service.delScene(id);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 分页情景列表
	@RequestMapping(value = "/web/getScene.action", method = RequestMethod.POST)
	public String getScene(HttpServletResponse response,
			HttpServletRequest request, int currentPage, String keyword) {
		try {
			Page zPage = new Page();
			zPage.setCurrentPage(currentPage);
			zPage.setEveryPage(10);
			if (keyword != null) {
				zPage.setKeyword(URLDecoder.decode(keyword, "UTF-8"));
			}
			Result result = service.getSearchAllScene(zPage);
			@SuppressWarnings("unchecked")
			List<Scene> scenes = (List<Scene>) result.getList();
			Page page = result.getPage();
			request.setAttribute("scenelist", scenes);
			request.setAttribute("page", page);
			request.setAttribute("keyword", keyword);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return "sceneList";
	}

	// 根据UUID查询一个情景
	@RequestMapping(value = "/web/getSceneInfo.action", method = RequestMethod.POST)
	public String getSceneInfo(HttpServletResponse response,
			HttpServletRequest request, String uuid, int flag) {
		// 通过UUID查询一个情景
		Scene scene = service.getSceneInfo(uuid);
		// 通过情景UUID查询情景下的所有歌曲列表
		List<?> musicList = musicService.getMusicList(uuid);
		// 通过情景UUID查询情景下的所有标签列表
		List<?> labelList = labelforsceneService.getLabelList(uuid);
		// 通过情景UUID查询情景关联的分类
		Classification cn = classService.getClassificationByUuid(scene
				.getCuuid());
		// 通过情景UUID查询情景下的图片列表
		List<?> photos = photoService.getScenephoto(uuid);
		request.setAttribute("photos", photos);
		request.setAttribute("classification", cn);
		request.setAttribute("scene", scene);
		request.setAttribute("musicList", musicList);
		request.setAttribute("labelList", labelList);
		request.setAttribute("flag", flag);
		return "sceneInfo";
	}

	// 关联标签准备
	@RequestMapping(value = "/web/saveLabelpro.action", method = RequestMethod.POST)
	public String saveLabelpro(HttpServletResponse response,
			HttpServletRequest request, String keyword, String uuid) {
		// 查询所有标签
		List<?> labelAlllist = labelService.getAllLabel(keyword, uuid);
		// 查询该情景下被选中的标签
		List<?> labelList = labelforsceneService.getLabelList(uuid);
		request.setAttribute("labelList", labelList);
		request.setAttribute("labelAllList", labelAlllist);
		request.setAttribute("keyword", keyword);
		request.setAttribute("uuid", uuid);
		return "labelForScene";
	}

	// 关联标签
	@RequestMapping(value = "/web/saveLabel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON saveLabel(HttpServletResponse response,
			HttpServletRequest request,
			@ModelAttribute Labelforscene labelforscene) {
		labelforsceneService.saveLabelforscene(labelforscene);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 关联标签
	@RequestMapping(value = "/web/deleteLabel.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON deleteLabel(HttpServletResponse response,
			HttpServletRequest request, int id) {
		labelforsceneService.delLabelforscene(id);
		StatusJSON statusJSON = new StatusJSON();
		statusJSON.setStatus(1);
		return statusJSON;
	}

	// 删除情景歌曲
	@RequestMapping(value = "/web/delMusic.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON saveSceneList(HttpServletResponse response,
			HttpServletRequest request, int id) {
		StatusJSON json = new StatusJSON();
		musicService.delMusic(id);
		json.setStatus(1);
		return json;
	}

	// 根据歌曲名称搜索
	/**
	 * type 音乐来源 1：领芯 2：喜马拉雅 name： 音乐名称
	 */
	@RequestMapping(value = "/web/getMusicList.action", method = RequestMethod.POST)
	public String getMusicByname(HttpServletRequest request,
			HttpServletResponse response, String uuid) {
		request.setAttribute("uuid", uuid);
		return "musiciForScene";
	}

	// 查询情景绑定的歌曲列表
	@RequestMapping(value = "/web/getAllMusic.action", method = RequestMethod.POST)
	@ResponseBody
	public List<Musicforscene> getMusicByUUID(HttpServletRequest request,
			HttpServletResponse response, String uuid) {
		List<Musicforscene> list = (List<Musicforscene>) musicService
				.getMusicList(uuid);
		return list;
	}

	/*************************************************************************************/

	/**
	 * 喜马拉雅的歌曲获取
	 */
	@RequestMapping(value = "/web/getXimaMusic.action", method = RequestMethod.POST)
	@ResponseBody
	public List<Musicforscene> getXimaMusic(HttpServletRequest request,
			HttpServletResponse response, String name) {
		StatusJSON status = new StatusJSON();
		List<Musicforscene> lsList = new ArrayList<Musicforscene>();
		if (name != null && name.trim().length() != 0) {
			// 喜马拉雅
			try {
				name = URLEncoder.encode(name, "UTF-8");
				String url = Config.URL_STRING_X + "/search/tracks?" + Config.URL_STRING_X_IM
						+ "&q=" + name + "&page=" + 1 + "&per_page=" + 500
						+ "&uni=xx";
				String str = Config.GetData(url);
				JSONObject jsonObject = JSONObject.parseObject(str);
				JSONArray jsonArray = jsonObject.getJSONArray("tracks");
				for (int i = 0; i < jsonArray.size(); i++) {
					JSONObject jObject1 = (JSONObject) jsonArray.get(i);
					Musicforscene music = new Musicforscene();
					music.setMusicname(jObject1.getString("title"));
					music.setMusiccher(jObject1.getString("nickname"));
					music.setMusicurl(jObject1.getString("play_url_64"));
					// 标识歌曲类别为喜马拉雅
					music.setMusictype(2);
					lsList.add(music);
				}
			} catch (Exception e) {
				status.setMess("error");
				status.setStatus(0);
				e.printStackTrace();
			}
		}
		return lsList;
	}

	// 关联情景歌曲(喜马拉雅)
	@RequestMapping(value = "/web/saveMusic.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON saveMusic(HttpServletResponse response,
			HttpServletRequest request, String str) {
		StatusJSON json = new StatusJSON();
		String[] strs = str.split(",");
		Musicforscene music = new Musicforscene();
		// 加入参数
		music.setMusiccher(strs[0]);
		music.setMusicurl(strs[1]);
		music.setMusictype(Integer.parseInt(strs[2]));
		music.setMusicname(strs[3]);
		music.setSuuid(strs[4]);
		musicService.saveMusic(music);
		json.setStatus(1);
		return json;
	}

	/************************************************************************************/
	/**
	 * 获取喜马拉雅接口的分类
	 */
	@RequestMapping(value = "/web/getXimaFL.action", method = RequestMethod.POST)
	@ResponseBody
	public List<?> getXimaFL(HttpServletRequest request,
			HttpServletResponse response, String name) {
		List<Map> list=new ArrayList<Map>();
		String url = Config.URL_STRING_X + "/categories?" + Config.URL_STRING_X_IM
				+ "&uni=xx";
		String str;
		try {
			str = Config.GetData(url);
			JSONObject jsonObject = JSONObject.parseObject(str);
			JSONArray jsonArray = jsonObject.getJSONArray("categories");
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jObject1 = (JSONObject) jsonArray.get(i);
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("id", jObject1.getString("id"));
				map.put("name", jObject1.getString("title"));
				list.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 获取喜马拉雅专辑的专辑
	 */
	@RequestMapping(value = "/web/getXimaZJ.action", method = RequestMethod.POST)
	@ResponseBody
	public List<?> getXimaZJ(HttpServletRequest request,
			HttpServletResponse response, String id) {
		List<Map> list=new ArrayList<Map>();
		String url = Config.URL_STRING_X + "/categories/"+id+"/hot_albums?" + Config.URL_STRING_X_IM
				+ "&uni=xx";
		String str;
		try {
			str = Config.GetData(url);
			JSONObject jsonObject = JSONObject.parseObject(str);
			JSONArray jsonArray = jsonObject.getJSONArray("tags");
			for (int i = 0; i < jsonArray.size(); i++) {
				JSONObject jObject1 = (JSONObject) jsonArray.get(i);
				Map<String, Object> map=new HashMap<String, Object>();
				map.put("id", jObject1.getString("id"));
				map.put("name", jObject1.getString("title"));
				list.add(map);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	/****************************************************************************************/
	/**
	 * 领芯的歌曲获取
	 */
	@RequestMapping(value = "/web/getlingxinMusic.action", method = RequestMethod.POST)
	@ResponseBody
	public Musicforscene getlingxinMusic(HttpServletRequest request,
			HttpServletResponse response, String sid) {
		Musicforscene music = new Musicforscene();
		if (sid != null && sid.trim().length() != 0) {
			List<?> list = musicService.getMusic(sid);
			if (list.size() != 0) {
				Map map = (Map) list.get(0);
				System.out.println(map);
				String path = musicService.getMusicPath(Integer.parseInt(map
						.get("id").toString()));
				if (map.get("name") != null) {
					music.setMusicname(map.get("name").toString());
				} else if (map.get("name_en") != null) {
					music.setMusicname(map.get("name_en").toString());
				}
				music.setMusiccher(map.get("artistperformer").toString());
				music.setMusicurl(Config.getMessage("musicUrl") + path);
				music.setMusictype(1);
				// System.out.println(music.getMusiccher()+"的"+music.getMusicname()+"地址为"+music.getMusicurl());
			}
		}
		return music;
	}


	public SceneService getService() {
		return service;
	}

	public void setService(SceneService service) {
		this.service = service;
	}

	public ClassificationService getClassService() {
		return classService;
	}

	public void setClassService(ClassificationService classService) {
		this.classService = classService;
	}

	public PhotoforsceneService getPhotoService() {
		return photoService;
	}

	public void setPhotoService(PhotoforsceneService photoService) {
		this.photoService = photoService;
	}

	public MusicforsceneSevice getMusicService() {
		return musicService;
	}

	public void setMusicService(MusicforsceneSevice musicService) {
		this.musicService = musicService;
	}

	public LabelforsceneService getLabelforsceneService() {
		return labelforsceneService;
	}

	public void setLabelforsceneService(
			LabelforsceneService labelforsceneService) {
		this.labelforsceneService = labelforsceneService;
	}

	public LabelService getLabelService() {
		return labelService;
	}

	public void setLabelService(LabelService labelService) {
		this.labelService = labelService;
	}

	public RecommenService getReService() {
		return reService;
	}

	public void setReService(RecommenService reService) {
		this.reService = reService;
	}

}