package com.shopsys.productmanage.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.shopsys.common.JqgridUtil;
import com.shopsys.personnel.model.User;
import com.shopsys.productmanage.model.Category;
import com.shopsys.productmanage.service.CategoryService;
import com.shopsys.productmanage.service.KindService;
import com.xmut.base.BaseAction;

public class CategoryAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	private CategoryService categoryService;
	private KindService kindService;
	private Category category;
	
	private String  categoryName;
	private Boolean  isPublish;
	private String pageUrl;
	
	
	/**
	 * 列出所有的可选栏目
	 * @return
	 */
	public String listCategoryForKind() {
		dataMap=new HashMap<String, Object>();
		List<Category> categories =categoryService.listByClassName(Category.class);
		dataMap.put("rows", categories);
		return "list";
	}
	
	
	
	
	/**
	 * 查询用户数据，包括条件分页搜索和非条件分页搜索两种
	 * @return
	 */
	public String listCategory() {
		dataMap=new HashMap<String, Object>();
		int currentPage=Integer.parseInt(page);
		int pageSize=Integer.parseInt(rows);
		List<Category> categories =null;
		List<Map<String, Object>> categoryMaps = new ArrayList<Map<String, Object>>();
		int allRecordNumbers=0;
		
		if (_search) {
			String whereParams = JqgridUtil.SearchToHqlParam(null, null, null, filters, null, null, null);
			categories=categoryService.listPageRowsByClassAndParams(Category.class, currentPage, pageSize, whereParams);
			allRecordNumbers=categoryService.countByClassAndParams(Category.class, whereParams);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}else {
			allRecordNumbers=categoryService.countByClass(Category.class);
		    categories=categoryService.listPageRowsByClass(Category.class, currentPage, pageSize);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}
		for (Category category : categories) {
			Map<String, Object> categoryMap= new HashMap<String, Object>();
			categoryMap.put("categoryName", category.getCategoryName());
			categoryMap.put("id", category.getId());
			categoryMap.put("pageUrl", category.getPageUrl());
			categoryMap.put("isPublish", category.getIsPublish());
			categoryMaps.add(categoryMap);
		}
	
		dataMap.put("rows", categoryMaps);
		
		return "list";
	}
	
	//行编辑：更新，删除
	public String edit() {
		if("add".equalsIgnoreCase(oper)){
			Category category = new Category();
			category.setCategoryName(categoryName);
			category.setPageUrl(pageUrl);
			category.setIsPublish(isPublish);
			categoryService.saveOrUpdate(Category.class, category);
			flag=true;
		}else{
			Integer[] intIds = JqgridUtil.idToIntIds(id);
			if ("edit".equalsIgnoreCase(oper)) {
				//在某一时刻编辑时只有一行记录能被编辑，浏览器发送过看来的ids只有一个id，所以这里直接去intIds[0]
				Category categoryData= categoryService.getByClassNameAndId(Category.class, intIds[0]);
				categoryData.setCategoryName(categoryName);
				categoryData.setPageUrl(pageUrl);
				categoryData.setIsPublish(isPublish);
				categoryService.update(categoryData);
				flag=true;
				
			}else if ("del".equalsIgnoreCase(oper)) {
				
				kindService.deleteByHQL("delete Kind Where categoryId in ("+id+")");
				categoryService.deleteByClassAndIds(Category.class, intIds);
				flag=true;
			}
		}
		
		return "flag";
	}
	
	
	
	//**********以下是前台访问的方法区域，不会进行拦截****************************************************************************************8
		public String frontLoadCategory() {
			dataMap=new HashMap<String, Object>();
			List<Category> listCategories = categoryService.listByHQL("from Category where isPublish = true");
			dataMap.put("categories", listCategories);
			return "list";
		}
	
	
	
	public CategoryService getCategoryService() {
		return categoryService;
	}
	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getPageUrl() {
		return pageUrl;
	}
	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}
	public KindService getKindService() {
		return kindService;
	}
	public void setKindService(KindService kindService) {
		this.kindService = kindService;
	}
	public Boolean getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Boolean isPublish) {
		this.isPublish = isPublish;
	}
	
	
	
}
