package com.snaillove.web.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.snaillove.Service.LoginService;
import com.snaillove.utils.StatusJSON;

@Controller
public class LoginAction extends BaseAction {
	@Resource
	private LoginService service;

	/**
	 * 成功后的跳转
	 * 
	 * @param response
	 * @param userId
	 * @return
	 */
	@RequestMapping(value = "/web/news.action", method = RequestMethod.GET)
	public String news(HttpServletResponse response, HttpServletRequest request) {
		return "/basic";
	}

	/**
	 * 判断登录
	 * 
	 * @param uname
	 * @param password
	 */
	@RequestMapping(value = "checkLogin.action", method = RequestMethod.POST)
	@ResponseBody
	public StatusJSON checkLogin(String uname, String password,
			HttpServletRequest request) {
		StatusJSON statusJSON = new StatusJSON();
		Boolean check = service.checkLogin(uname, password);
		if (check == true) {
			request.getSession().setAttribute("login", uname);
			statusJSON.setStatus(1);
			return statusJSON;
		} else {
			statusJSON.setStatus(0);
			return statusJSON;
		}
	}

	public LoginService getService() {
		return service;
	}

	public void setService(LoginService service) {
		this.service = service;
	}

}
