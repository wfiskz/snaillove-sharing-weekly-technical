package com.example.administrator.ormlite_jackwaiting.bean;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;

/**
 * Created by JackWaiting on 2016/7/11.
 */

@DatabaseTable(tableName = "tb_user")
public class User {

    @DatabaseField(generatedId = true)
    private int user_id;

    @DatabaseField
    private String user_name;

    @DatabaseField
    private String password;

    public User(String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
    }

    public User(){

    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
