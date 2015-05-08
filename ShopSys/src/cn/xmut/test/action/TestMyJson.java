package cn.xmut.test.action;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import com.shopsys.common.FilterSearch;
import com.shopsys.common.SearchRule;

public class TestMyJson {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		TestMyJson testjson = new TestMyJson();
		testjson.test("");
	}
	
	public void test(String s){
		
		s = "{\"groupOp\":\"AND\",\"rules\":[{\"field\":\"id\",\"op\":\"eq\",\"data\":\"1\"}]}";
		FilterSearch filterSearch =new FilterSearch();
		
		
		Map classMap = new HashMap();
	    classMap.put("rules", SearchRule.class);
		filterSearch=(FilterSearch) JSONObject.toBean(JSONObject.fromObject(s),FilterSearch.class,classMap);
		System.out.print(filterSearch.getGroupOp());
	}

}
