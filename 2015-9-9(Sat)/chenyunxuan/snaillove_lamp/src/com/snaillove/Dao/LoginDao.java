package com.snaillove.Dao;

public interface LoginDao {
	/**
	 * ¼ì²éµÇÂ¼
	 * @param uname
	 * @param password
	 * @return
	 */
	public Boolean checkLogin(String uname,String password);
}
