package com.snaillove.adminfilter;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * µÇÂ¼À¹½ØÆ÷
 */
@Repository
public class Loginfilter extends HandlerInterceptorAdapter {
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {

		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");

		// ºóÌ¨session¿ØÖÆ
		String[] noFilters = new String[] { "login.html", "veriCode.html",
				"index.html", "logout.html" };
		String uri = request.getRequestURI();
		if (uri.indexOf("web") != -1) {
			boolean beFilter = true;
			for (String s : noFilters) {
				if (uri.indexOf(s) != -1) {
					beFilter = false;
					break;
				}
			}
			if (beFilter) {
				Object obj = request.getSession().getAttribute("login");
				if (null == obj) {
					// Î´µÇÂ¼
					PrintWriter out = response.getWriter();
					StringBuilder builder = new StringBuilder();
					builder.append("<script type=\"text/javascript\" charset=\"UTF-8\">");
					builder.append("alert(\"Ò³Ãæ¹ýÆÚ£¬Çë³¢ÊÔÖØÐÂµÇÂ¼!\");");
					builder.append("window.top.location.href=\"");
					builder.append("/snaillove_lamp/login.jsp\";</script>");
					out.print(builder.toString());
					out.close();
					return false;
				}
			}
		}
		return super.preHandle(request, response, handler);
	}

}
