package com.snaillove.DaoImpl;

import org.springframework.stereotype.Component;

import com.snaillove.Dao.LoginDao;
import com.snaillove.Dao.SuperDao;
import com.snaillove.model.User;

@Component
public class LoginDaoimpl extends SuperDao implements LoginDao {

	public Boolean checkLogin(String uname, String password) {
		Boolean check = false;
		User user = (User) this.getHibernateTemplate().find("from User").get(0);
		if (uname.trim().equals(user.getUsername())
				&& password.trim().equals(user.getUserpassword())) {
			check = true;
		}
		return check;
	}
}
