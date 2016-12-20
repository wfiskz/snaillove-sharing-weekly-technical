package com.snaillove.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FormatText {
	/**
	 * yyyy-MM-dd HH:mm
	 * 
	 * @param currentTime
	 * @return
	 */
	public static String getStringDate(Date currentTime) {
		if (currentTime != null) {
			SimpleDateFormat formatter = new SimpleDateFormat(
					"yyyyMMddHHmm");
			String dateString = formatter.format(currentTime);
			return dateString;
		}
		return currentTime.toString();
	}

	public static String getStringYear(Date currentTime) {
		if (currentTime != null) {
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy");
			String dateString = formatter.format(currentTime);
			return dateString;
		}
		return currentTime.toString();
	}

	public static String getStringMonth(Date currentTime) {
		if (currentTime != null) {
			SimpleDateFormat formatter = new SimpleDateFormat("MM");
			String dateString = formatter.format(currentTime);
			return dateString;
		}
		return currentTime.toString();
	}

	public static String getStringDay(Date currentTime) {
		if (currentTime != null) {
			SimpleDateFormat formatter = new SimpleDateFormat("dd");
			String dateString = formatter.format(currentTime);
			return dateString;
		}
		return currentTime.toString();
	}

	/**
	 * 返回后缀�?
	 * 
	 * @param filename
	 * @return
	 */
	public static String getExt(String filename) {
		if (filename.indexOf(".") == -1)
			return "";

		return filename.split("[.]")[filename.split("[.]").length - 1];
	}

	/**
	 * md5
	 * 
	 * @param plainText
	 * @return
	 */
	public static String Md5(String plainText) {
		StringBuffer buf = new StringBuffer("");
		if (plainText != null) {
			try {
				MessageDigest md = MessageDigest.getInstance("MD5");

				md.update(plainText.getBytes());
				byte b[] = md.digest();

				int i;

				for (int offset = 0; offset < b.length; offset++) {
					i = b[offset];
					if (i < 0)
						i += 256;
					if (i < 16)
						buf.append("0");
					buf.append(Integer.toHexString(i));
				}
				// System.out.println("result: " + buf.toString());

			} catch (NoSuchAlgorithmException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return buf.toString();
	}

	public static void main(String[] args) {

		System.out.println(getStringYear(new Date()));
		System.out.println(getStringMonth(new Date()));
		System.out.println(getStringDay(new Date()));
	}
}
