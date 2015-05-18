package com.shopsys.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.context.support.StaticApplicationContext;

public class JqgridUtil {
	
	public static String SearchToHqlParam(String nd,String sidx,String sord,String filters,String searchField,String searchString,String searchOper) {
		FilterSearch filterSearch =new FilterSearch();
		Map classMap = new HashMap();
	    classMap.put("rules", SearchRule.class);
		filterSearch=(FilterSearch) JSONObject.toBean(JSONObject.fromObject(filters),FilterSearch.class,classMap);
		
        StringBuilder sb = new StringBuilder("");

        if (null != filterSearch) {
                List<SearchRule> rules = filterSearch.getRules();
                if (rules.size()==0) {
                	sb.append(" where 1=1");
                	return sb.toString();
				}
                sb.append(" where ");
                
                int count = 0;
                
                if (null != rules && (count = rules.size()) > 0) {
                        for (SearchRule rule : rules) {
                                if (null != rule.getField() && null != rule.getData() 
                                	&& null != rule.getOp()) {
                                	    if (("").equals(rule.getData()) ||  ("myac").equals(rule.getField()) ) {
                                	    	 if (null != filterSearch.getGroupOp()) {
                                                 if (filterSearch.getGroupOp().equals("AND"))
                                                         sb.append(" 1 = 1");
                                                 else
                                                         sb.append(" 1 != 1");
                                            }

										}else  if ("eq".equalsIgnoreCase(rule.getOp())) {
                                                sb.append(rule.getField()).append(" = ")
                                                                .append("'").append(rule.getData()).append(
                                                                                "'");

                                        } else if ("ne".equalsIgnoreCase(rule.getOp())) {
                                                sb.append(rule.getField()).append(" != ").append(
                                                                "'").append(rule.getData()).append("'");
                                        } else if ("lt".equalsIgnoreCase(rule.getOp())) {
                                                sb.append(rule.getField()).append(" < ")
                                                                .append("'").append(rule.getData()).append(
                                                                                "'");
                                        } else if ("le".equalsIgnoreCase(rule.getOp())) {
                                                sb.append(rule.getField()).append(" <= ").append(
                                                                "'").append(rule.getData()).append("'");
                                        } else if ("gt".equalsIgnoreCase(rule.getOp())) {
                                               
                                                sb.append(rule.getField()).append(" > ")
                                                                .append("'").append(rule.getData()).append(
                                                                                "'");
                                        } else if ("ge".equalsIgnoreCase(rule.getOp())) {
                                                
                                                sb.append(rule.getField()).append(" >= ").append(
                                                                "'").append(rule.getData()).append("'");
                                        }else if("cn".equalsIgnoreCase(rule.getOp())){
                                        	sb.append(rule.getField()).append(" like ").append(
                                                    "'%").append(rule.getData()).append("%'");
                                        }else if("nc".equalsIgnoreCase(rule.getOp())){
                                        	sb.append(rule.getField()).append(" not like ").append(
                                                    "'%").append(rule.getData()).append("%'");
                                        }else {
                                        	 if (null != filterSearch.getGroupOp()) {
                                                 if (filterSearch.getGroupOp().equals("AND"))
                                                         sb.append(" 1 = 1");
                                                 else
                                                         sb.append(" 1 != 1");
                                            }
										}
                               
                                        count--;
                                        if (count > 0) {
                                                if (null != filterSearch.getGroupOp()) {
                                                        if (filterSearch.getGroupOp().equals("AND"))
                                                                sb.append(" and ");
                                                        else
                                                                sb.append(" or ");
                                                }

                                        }
                                }

                        }
                }
        }
        return sb.toString();
		
	}
	
	public static int countPageNumbers(int pageSize,int allRecordNumbers) {
		//allRecordNumbers 是个大于等于0的整数
		if(allRecordNumbers==0){
			return 0;
		}else {
		 return	(allRecordNumbers-1)/pageSize+1;
		}
	}
	/**
	 * 将字符串的id转化成integer数组类型的id
	 * @param id : 字符串形式的id
	 * @return intIds : integer数组类型的id
	 */
	public static Integer[] idToIntIds(String id) {
		String ids[]=null;
		Integer intIds[]=null;
		//字符串id以","分割转化成integer数组id
		if (id.contains(",")) {
			ids=id.split(",");
			intIds=new Integer[ids.length];
			for (int i = 0; i < ids.length; i++) {
				intIds[i]=Integer.parseInt(ids[i]);
			}
		}else {
			Integer singleId=Integer.parseInt(id);
			intIds=new Integer[1];
			intIds[0]=singleId;
		}
		return intIds;
	}

}
