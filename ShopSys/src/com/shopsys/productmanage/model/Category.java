package com.shopsys.productmanage.model;

public class Category implements java.io.Serializable{

	
	private static final long serialVersionUID = -1207976358200883001L;
	private Integer id;
	private String categoryName;
	private String pageUrl;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
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
	
	
}
