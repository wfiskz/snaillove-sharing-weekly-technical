package com.example.administrator.ormlite_jackwaiting.db;

import android.content.Context;

import com.example.administrator.ormlite_jackwaiting.bean.User;
import com.j256.ormlite.dao.Dao;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by JackWaiting on 2016/7/11.
 */
public class UserDao {

    private Context context;
    private Dao<User, Integer> userDaoOpe;
    private DatabaseHelper helper;

    public UserDao(Context context) {
        this.context = context;
        try {
            helper = DatabaseHelper.getHelper(context);
            userDaoOpe = helper.getDao(User.class);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }


    /**
     * 注册一个用户
     *
     * @param user
     * @throws SQLException
     */
    public boolean addUser(User user) {
        try {
            userDaoOpe.create(user);
            return true;  //userDaoOpe.createOrUpdate(user).isCreated()  //userDaoOpe.createIfNotExists(user);
         } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    /**
     * 根据用户id查询用户数据
     *
     * @param id
     * @throws SQLException
     */
    public User get(int id)
    {
        try
        {
            return userDaoOpe.queryForId(id);
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 根据用户名查询用户数据
     *
     * @param username
     * @throws SQLException
     */
    public List<User> getUserByUserName(String username)
    {
        try
        {
            return userDaoOpe.queryBuilder().where().eq("user_name",username).query();
        } catch (SQLException e)
        {
            e.printStackTrace();
        }
        return null;
    }

}
