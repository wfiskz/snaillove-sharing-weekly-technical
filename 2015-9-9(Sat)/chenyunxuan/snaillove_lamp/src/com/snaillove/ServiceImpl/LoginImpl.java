package com.snaillove.ServiceImpl;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.LoginDao;
import com.snaillove.Service.LoginService;

@Component
public class LoginImpl implements LoginService {
	@Resource
	private LoginDao dao;

	public LoginDao getDao() {
		return dao;
	}

	public void setDao(LoginDao dao) {
		this.dao = dao;
	}

	public Boolean checkLogin(String uname, String password) {
		Boolean check=dao.checkLogin(uname, password);
		return check;
	}
}
