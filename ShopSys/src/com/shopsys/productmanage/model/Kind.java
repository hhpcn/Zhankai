package com.shopsys.productmanage.model;

public class Kind  implements java.io.Serializable{
	private static final long serialVersionUID = -4609134894701829240L;
	private Integer id;
	private String kindName;
	private String pageUrl;
	/**
	 * 父类别id
	 */
	private Integer categoryId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getKindName() {
		return kindName;
	}
	public void setKindName(String kindName) {
		this.kindName = kindName;
	}
	public String getPageUrl() {
		return pageUrl;
	}
	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	
	
}
