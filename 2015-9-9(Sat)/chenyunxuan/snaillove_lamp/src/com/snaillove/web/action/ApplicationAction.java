package com.snaillove.web.action;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.snaillove.utils.Config;
import com.snaillove.utils.FormatText;

@Controller
public class ApplicationAction extends BaseAction {

	FileOutputStream fos;
	String filename = null;
	String ext = null;
	String tmpfile = null;
	byte[] bytes;
	BufferedImage bi;

	/**
	 * 上传标签图片
	 * 
	 * @param request
	 * @param response
	 * @param uploadFile
	 */
	@RequestMapping(value = "/web/uploadPic.action", method = RequestMethod.POST)
	public void uploadpic(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam() MultipartFile uploadFile, Integer flag) {
		try {

			long ctime = new Date().getTime();
			if (uploadFile.isEmpty()) {
				response.getWriter().print(
						"{\"src\":\"地址不正确\",\"status\":\"0\"}");
			} else {
				byte[] bytes = uploadFile.getBytes();
				// 文件后缀名
				ext = FormatText.getExt(uploadFile.getOriginalFilename());
				filename = FormatText.getStringYear(new Date()) + "/"
						+ FormatText.getStringMonth(new Date()) + "/"
						+ FormatText.getStringDay(new Date()) + "/" + ctime
						+ "." + ext;
				String dir = "";
				float width = 0;
				float height = 0;

				if (flag.intValue() == 1) {
					// 上传的文件夹 PicFolder
					dir = Config.getMessage("PicFolder");
					width = 460;
					height = 219;
				}
				// 文件的分割
				String sep = System.getProperty("file.separator");
				/**
				 * //根目录创建文件夹 本地
				 */
				// PicDir 结构 choot/www/api/rabbitapi/pictures/2014/12/20/
				// File dirPath = new File(Config.getMessage("PicDir")+ dir+"/"
				File dirPath = new File(Config.getMessage("localPicDir") + dir
						+ "/" + FormatText.getStringYear(new Date()) + "/"
						+ FormatText.getStringMonth(new Date()) + "/"
						+ FormatText.getStringDay(new Date()) + "/");

				if (!dirPath.exists()) {
					dirPath.mkdirs();
				}
				/**
				 * 上传的目录 本地
				 */
				// String imgUrl = Config.getMessage("img.Url") + dir +"/"+
				// filename;
				String imgUrl = Config.getMessage("localimg.Url") + dir + "/"
						+ filename;
				System.out.println("回显地址---->" + imgUrl);
				// File uploadedFile = new File(Config.getMessage("PicDir")+dir
				// +"/" + filename);
				File uploadedFile = new File(Config.getMessage("localPicDir")
						+ dir + "/" + filename);
				System.out.println("图片存地址------>"
						+ Config.getMessage("localPicDir") + dir + "/"
						+ filename);
				FileCopyUtils.copy(bytes, uploadedFile);
				// 生成缩略图 按照设定的比例进行压缩
				// Snippet.createThumbnail(Config.getMessage("PicDir") +
				// filename, Config.getMessage("PicDir")+ filename, width,
				// height);
				response.getWriter().print(
						"{\"src\":\"" + filename
								+ "\",\"status\":\"1\",\"imgUrl\":\"" + imgUrl
								+ "\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 上传情景图片
	 * 
	 * @param request
	 * @param response
	 * @param uploadFile
	 */
	@RequestMapping(value = "/web/UploadScenepic.action", method = RequestMethod.POST)
	public void UploadScenepic(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam() MultipartFile uploadFile, Integer flag) {
		try {
			long ctime = new Date().getTime();
			if (uploadFile.isEmpty()) {
				response.getWriter().print(
						"{\"src\":\"地址不正确\",\"status\":\"0\"}");
			} else {
				byte[] bytes = uploadFile.getBytes();
				// 文件后缀名
				ext = FormatText.getExt(uploadFile.getOriginalFilename());
				filename = FormatText.getStringYear(new Date()) + "/"
						+ FormatText.getStringMonth(new Date()) + "/"
						+ FormatText.getStringDay(new Date()) + "/" + ctime
						+ "." + ext;
				String dir = "";
				float width = 0;
				float height = 0;

				if (flag.intValue() == 1) {
					// 上传的文件夹 PicFolder
					dir = Config.getMessage("PicFolder");
					width = 460;
					height = 219;
				}
				// 文件的分割
				String sep = System.getProperty("file.separator");
				/**
				 * //根目录创建文件夹 本地
				 */
				// PicDir 结构 choot/www/api/rabbitapi/pictures/2014/12/20/
				// File dirPath = new File(Config.getMessage("PicDir")+ dir+"/"
				File dirPath = new File(Config.getMessage("localPicDir") + dir
						+ "/" + FormatText.getStringYear(new Date()) + "/"
						+ FormatText.getStringMonth(new Date()) + "/"
						+ FormatText.getStringDay(new Date()) + "/");

				if (!dirPath.exists()) {
					dirPath.mkdirs();
				}
				/**
				 * 上传的目录 本地
				 */
				// String imgUrl = Config.getMessage("img.Url") + dir +"/"+
				// filename;
				String imgUrl = Config.getMessage("localimg.Url") + dir + "/"
						+ filename;
				System.out.println("回显地址---->" + imgUrl);
				// File uploadedFile = new File(Config.getMessage("PicDir")+dir
				// +"/" + filename);
				File uploadedFile = new File(Config.getMessage("localPicDir")
						+ dir + "/" + filename);
				FileCopyUtils.copy(bytes, uploadedFile);
				// 生成缩略图 按照设定的比例进行压缩
				// Snippet.createThumbnail(Config.getMessage("PicDir") +
				// filename, Config.getMessage("PicDir")+ filename, width,
				// height);
				response.getWriter().print(
						"{\"src\":\"" + filename
								+ "\",\"status\":\"1\",\"imgUrl\":\"" + imgUrl
								+ "\"}");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}