package com.shopsys.auth;

import java.util.ArrayList;
import java.util.List;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import com.shopsys.personnel.model.User;
import com.xmut.util.WebUtil;

/**
 * 
 * @author Helen
 *	登录验证拦截器,拦截所有未登录的非法Action操作 
 */
public class AuthorityInterceptor extends AbstractInterceptor{
	private static final long serialVersionUID = -2905756241500468595L;
	
	private String excludeName;//排除(不拦截)的方法名
	private String excludePrefixName;//排除(不拦截)的方法名
	private List<String>  list;
	private List<String>  prefixList;
	
	@Override
	public void init() {
		 String[]  methods = excludeName.split(",");
	     list = new  ArrayList<String>();
	     for(String method : methods){
	        list.add(method.trim());
	     }
	     String[]  prefixMethods = excludePrefixName.split(",");
	     prefixList = new  ArrayList<String>();
	     for(String method : prefixMethods){
	    	 prefixList.add(method.trim());
	     }
	}
	@Override
	public String intercept(ActionInvocation arg0) throws Exception {
		String methodName = arg0.getProxy().getMethod();
		Boolean flag1=list.contains(methodName);//方法名匹配
		Boolean flag2=listContainsPrefix(prefixList,methodName);//前缀匹配
		if(!(flag2 || flag1)){
			User user=(User) WebUtil.getSession(WebUtil.KEY_LOGIN_USER_SESSION);
			if(user==null){
				System.out.println("调用Action时,Session Account为空");
				return Action.ERROR;
			}
		}
		return arg0.invoke();
	}
	
	//如果调用的方法包含前缀符,则返回true;否则返回false;
	public Boolean listContainsPrefix(List<String> list,String methodName) {
		Boolean flag=false;
		for(String prefix : list){
	    	 if (methodName.startsWith(prefix,0)) {
	    		 System.out.println(methodName);
				flag=true;
				break;
			}
	     }
		return flag;
	}
	
	public String getExcludeName() {
		return excludeName;
	}
	public void setExcludeName(String excludeName) {
		this.excludeName = excludeName;
	}
	public String getExcludePrefixName() {
		return excludePrefixName;
	}
	public void setExcludePrefixName(String excludePrefixName) {
		this.excludePrefixName = excludePrefixName;
	}
	public List<String> getList() {
		return list;
	}
	public void setList(List<String> list) {
		this.list = list;
	}
	public List<String> getPrefixList() {
		return prefixList;
	}
	public void setPrefixList(List<String> prefixList) {
		this.prefixList = prefixList;
	}

	
}
