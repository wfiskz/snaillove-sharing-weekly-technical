package com.snaillove.api.action;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.snaillove.Service.EntranceService;
import com.snaillove.Service.SearchchannelService;
import com.snaillove.Service.SlideService;
import com.snaillove.bean.Channel;
import com.snaillove.bean.EntranceNew;
import com.snaillove.bean.SingleChannel;
import com.snaillove.bean.SingleMusic;
import com.snaillove.bean.SlideNew;
import com.snaillove.model.Entrance;
import com.snaillove.model.Searchchannel;
import com.snaillove.model.Slide;
import com.snaillove.utils.Config;
import com.snaillove.web.action.BaseAction;

@Controller
public class SnailloveBaseAction extends BaseAction {
	@Resource
	private EntranceService entranceService;
	@Resource
	private SlideService slideService;
	@Resource
	private SearchchannelService channelService;

	// 获取搜索渠道列表
	@RequestMapping(value = "/getChannel.action", method = RequestMethod.GET)
	public String getChannel(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		List<Channel> channels = new ArrayList<Channel>();
		List<Searchchannel> list = channelService.getAllSearchchannel();
		for (int i = 0; i < list.size(); i++) {
			Searchchannel sc = list.get(i);
			Channel channel = new Channel();
			channel.setId(sc.getId());
			channel.setSc_name(sc.getSname());
			channels.add(channel);
		}
		this.printJson(response, channels);
		return null;
	}

	// 通过ID获取搜索渠道信息
	@RequestMapping(value = "/getChannelById.action", method = RequestMethod.GET)
	public String getChannelById(HttpServletRequest request,
			HttpServletResponse response, String client_sign, int id,
			String keyword) {
		Searchchannel channel = channelService.getById(id);
		SingleChannel channelNew = new SingleChannel();
		List<SingleMusic> channels = new ArrayList<SingleMusic>();
		try {
			keyword = new String(keyword.getBytes("iso8859-1"), "UTF-8");
			keyword = URLEncoder.encode(keyword, "UTF-8");
			if (channel.getIsopen() == 2) {
				channelNew.setIsopen(false);
				channelNew.setUrl(channel.getApiurl() + keyword);
				channelNew.setList(new ArrayList<SingleMusic>());
			} else if (channel.getIsopen() == 1) {
				channelNew.setIsopen(true);
				channelNew.setUrl("");
				if (keyword != null && keyword.trim().length() != 0) {
					// 喜马拉雅
					try {
						String url = Config.URL_STRING_X + "/search/tracks?"
								+ Config.URL_STRING_X_IM + "&q=" + keyword
								+ "&page=" + 1 + "&per_page=" + 20 + "&uni=xx";
						String str = Config.GetData(url);
						JSONObject jsonObject = JSONObject.parseObject(str);
						JSONArray jsonArray = jsonObject.getJSONArray("tracks");
						for (int i = 0; i < jsonArray.size(); i++) {
							JSONObject jObject1 = (JSONObject) jsonArray.get(i);
							SingleMusic music = new SingleMusic();
							music.setName(jObject1.getString("title"));
							music.setAuthor(jObject1.getString("nickname"));
							music.setPath(jObject1.getString("play_url_64"));
							music.setCoverpath_small(jObject1.getString("cover_url_small"));
							music.setCoverpath_middle(jObject1.getString("cover_url_middle"));
							music.setCoverpath_large(jObject1.getString("cover_url_large"));
							channels.add(music);
						}
						channelNew.setList(channels);
					} catch (Exception e) {

					}
				}
			}
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		this.printJson(response, channelNew);
		return null;
	}

	// 获取轮播图列表
	@RequestMapping(value = "/getSlide.action", method = RequestMethod.GET)
	public String getSlide(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		List<SlideNew> slides = new ArrayList<SlideNew>();
		List<Slide> list = slideService.getAllSlide();
		for (int i = 0; i < list.size(); i++) {
			Slide slide = list.get(i);
			SlideNew slideNew = new SlideNew();
			slideNew.setSlide_name(slide.getLname());
			slideNew.setPhotourl(Config.getMessage("imgurl")+slide.getPhotourl());
			slideNew.setContenturl(slide.getContenturl());
			slides.add(slideNew);
		}
		this.printJson(response, slides);
		return null;
	}

	// 获取音乐入口列表
	@RequestMapping(value = "/getEntrance.action", method = RequestMethod.GET)
	public String getEntrance(HttpServletRequest request,
			HttpServletResponse response, String client_sign) {
		List<EntranceNew> entrances = new ArrayList<EntranceNew>();
		System.out.println(entranceService);
		List<Entrance> list = entranceService.getAllEntrance();
		for (int i = 0; i < list.size(); i++) {
			Entrance entrance = list.get(i);
			EntranceNew entranceNew = new EntranceNew();
			entranceNew.setEntrance_name(entrance.getEname());
			entranceNew.setPhotourl(Config.getMessage("imgurl")+entrance.getPhotourl());
			entranceNew.setContenturl(entrance.getContenturl());
			entrances.add(entranceNew);
		}
		this.printJson(response, entrances);
		return null;
	}

	public EntranceService getEntranceService() {
		return entranceService;
	}

	public void setEntranceService(EntranceService entranceService) {
		this.entranceService = entranceService;
	}

	public SlideService getSlideService() {
		return slideService;
	}

	public void setSlideService(SlideService slideService) {
		this.slideService = slideService;
	}

	public SearchchannelService getChannelService() {
		return channelService;
	}

	public void setChannelService(SearchchannelService channelService) {
		this.channelService = channelService;
	}

}
