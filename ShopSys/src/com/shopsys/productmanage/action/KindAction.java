package com.shopsys.productmanage.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.shopsys.common.JqgridUtil;
import com.shopsys.productmanage.model.Category;
import com.shopsys.productmanage.model.Kind;
import com.shopsys.productmanage.model.Product;
import com.shopsys.productmanage.service.CategoryService;
import com.shopsys.productmanage.service.KindService;
import com.xmut.base.BaseAction;

public class KindAction extends BaseAction {
	private static final long serialVersionUID = 2596810572151940605L;
	private KindService kindService;
	private CategoryService categoryService;
	public Kind kind;
	
	
	
	
	/**
	 * 查询产品分类数据，包括条件分页搜索和非条件分页搜索两种
	 * @return
	 */
	public String listKinds() {
		dataMap=new HashMap<String, Object>();
		int currentPage=Integer.parseInt(page);
		int pageSize=Integer.parseInt(rows);
		List<Kind> kinds =null; //根据条件从数据库中取出暂时存放的位置
		List<Map<String, Object>> kindMaps = new ArrayList<Map<String, Object>>();//分装要返回给前台的数据，最后存入dataMap
		int allRecordNumbers=0;
		if (_search) {
			String whereParams = JqgridUtil.SearchToHqlParam(null, null, null, filters, null, null, null);
			kinds=kindService.listPageRowsByClassAndParams(Kind.class, currentPage, pageSize, whereParams);
			allRecordNumbers=kindService.countByClassAndParams(Kind.class, whereParams);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}else {
			allRecordNumbers=kindService.countByClass(Kind.class);
		    kinds=kindService.listPageRowsByClass(Kind.class, currentPage, pageSize);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}
		for (Kind kind : kinds) {
			Map<String, Object> kindMap= new HashMap<String, Object>();
			kindMap.put("id", kind.getId());
			kindMap.put("kindName", kind.getKindName());
			Integer categoryId=kind.getCategoryId();
			kindMap.put("categoryId", categoryId);
			Category category= categoryService.getByClassNameAndId(Category.class,categoryId);
			kindMap.put("categoryName", category.getCategoryName());
			kindMap.put("pageUrl", kind.getPageUrl());
			kindMap.put("isPublish", kind.getIsPublish());
			kindMaps.add(kindMap);
		}
		dataMap.put("rows", kindMaps);
		return "list";
	}
	
	
	/**
	 * 增加产品种类
	 * @return
	 */
	public String addKind() {
		//因为spring管理action,默认为单例实例,则就kind就会一直存在，则kind的id会一直存在；
		//为了实现增加记录，这里调用saveorupdate必须将id设置为null
		kind.setId(null);
		kindService.saveOrUpdate(kind);
			flag=true;
		return "flag";
	}
	
	/**
	 * 增加产品种类
	 * @return
	 */
	public String updateKind() {
		kindService.saveOrUpdate(kind);
			flag=true;
		return "flag";
	}
	
	/**
	 * 行编辑：删除
	 * @return
	 */
	public String edit() {
		
		Integer[] intIds = JqgridUtil.idToIntIds(id);
		if ("del".equalsIgnoreCase(oper)) {
			kindService.deleteByClassAndIds(Kind.class, intIds);
			flag=true;
		}
		return "flag";
	}
	
	
	/**
	 * 列出所有的可选栏目
	 * @return
	 */
	public String listKindsByCategoryId() {
		dataMap=new HashMap<String, Object>();
		List<Kind> kinds =kindService.listByHQL("from Kind where categoryId ="+id);
		dataMap.put("rows", kinds);
		return "list";
	}
	
	
	/**
	 * 根据id获取记录
	 * @return
	 */
	public String loadKindById() {
		kind = kindService.getByClassNameAndId(Kind.class, Integer.parseInt(id));
		dataMap=new HashMap<String, Object>();
		dataMap.put("kind", kind);
		return "dataMap";
	}
	
	
	
	
	
	
	
	
	
	public KindService getKindService() {
		return kindService;
	}
	public void setKindService(KindService kindService) {
		this.kindService = kindService;
	}
	public Kind getKind() {
		return kind;
	}
	public void setKind(Kind kind) {
		this.kind = kind;
	}
	public CategoryService getCategoryService() {
		return categoryService;
	}
	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	
	
	
	
}
