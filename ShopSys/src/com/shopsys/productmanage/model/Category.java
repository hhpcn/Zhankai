package com.shopsys.productmanage.model;

public class Category implements java.io.Serializable{

	
	private static final long serialVersionUID = -1207976358200883001L;
	private Integer id;
	private String categoryName;
	private String pageUrl;
	/**
	 * 是否发布
	 */
	private Boolean isPublish=false;
	
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
	public Boolean getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(Boolean isPublish) {
		this.isPublish = isPublish;
	}
	
	
}
