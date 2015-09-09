package com.snaillove.utils;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

public class Config {
	public static Properties props = new Properties();
	public static String contextpath = null;
	public static String realpath = null;
	public static String ip = null;
	public static String user_agent = null;
	public static String path = "";
	public final static String URL_STRING_LIN = "http://121.199.167.212";// 领芯
	public final static String URL_STRING_X = "http://3rd.ximalaya.com";// 喜马拉雅
	public final static String URL_STRING_X_IM = "i_am=linxin";// 喜马拉雅
	public final static String URL_VENDOR = "http://121.199.167.212/woaishenghuo/www/Api/Index/getFirmCode";// 获取厂商标示
	public final static String URL_LX_GETCATEGORY = "http://121.199.167.212/chipsguide/www/Api/Phone/getColumnList";// 获取

	public static String getMessage(String name) {

		if (props.size() == 0) {
			initProperties(path);
		}
		String value = props.getProperty(name);
		if (value == null) {
//			Log.logmake.info(value + "<<<<<<<" + name);
		}
		for (int i = 0; i < 3; i++) {
			if (value.indexOf("$[") != -1) {
				value = value.split("\\$\\[")[1];
				if (value.indexOf("]") != -1) {
					String key = value.split("]")[0];
					if (Config.getMessage(key) != null) {
						return props.getProperty(name).replace(
								"$[" + key + "]", Config.getMessage(key));
					}
				} else {
					break;
				}
			} else {
				break;
			}
		}

		return props.getProperty(name);
	}

	public static int getMessageInt(String name) {
		int result = 0;
		try {
			result = Integer.parseInt(getMessage(name));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public static long getMessageLong(String name) {
		long result = 0;
		try {
			result = Long.parseLong(getMessage(name));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public static void writeProperties(String parameterName,
			String parameterValue) {
		try {
			if (props.size() == 0) {
				initProperties(path);
			}
			OutputStream fos = new FileOutputStream(path);
			props.setProperty(parameterName, parameterValue);
			// ���ʺ�ʹ�� load �������ص� Properties ���еĸ�ʽ��
			// ���� Properties ���е�������?���Ԫ�ضԣ�д�������
			props.store(fos, "Update '" + parameterName + "' value");
		} catch (IOException e) {
			e.printStackTrace();
			System.err.println("Visit " + path + " for updating "
					+ parameterName + " value error");
		}
	}

	public static void initProperties(String path) {
		File f = null;
		try {
			if (path != null)
				f = new File(path);
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (f == null || f.exists() == false) {

		} else {

//			Log.logproxy.info("try proxy.properties init");

			try {
				InputStream is = (new FileInputStream(f));
				Config.props.load(is);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return;
		}

		try {
			// �������?
			InputStream is = new Config().getClass().getClassLoader()
					.getResourceAsStream("proxy.properties");
			Config.props.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static Properties getProps() {
		if (props == null) {
			Config.initProperties(null);
		}

		return props;
	}

	/**
	 * ����Ƿ����
	 * 
	 * @param url
	 */
	public static boolean isFilter(String url) {
		String[] arr = Config.getMessage("filter.feedurl").split(",");
		for (int i = 0; i < arr.length; i++) {
			if (arr[i].equals("") == false && url.indexOf(arr[i]) != -1) {
				return true;
			}
		}
		return false;
	}
	
	/**
	 * 抽取的方法 从网络上获取JSON数据
	 */
	public static String GetData(String url) throws Exception {
		URL urlRequest = new URL(url);
		System.out.println("request url------>" + url);
		HttpURLConnection conn = (HttpURLConnection) urlRequest
				.openConnection();
		conn.setDoOutput(true);
		conn.setDoInput(true);
		conn.setRequestMethod("GET");
		// 获取请求响应数据
		StringBuffer sb = new StringBuffer();
		BufferedReader in = new BufferedReader(new InputStreamReader(
				conn.getInputStream(), "utf-8"));
		String readLine = "";
		while ((readLine = in.readLine()) != null) {
			sb.append(readLine);
		}
		in.close();
		return sb.toString();
	}
}
