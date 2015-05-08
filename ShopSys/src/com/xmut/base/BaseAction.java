package com.xmut.base;

import java.util.Map;



import com.opensymphony.xwork2.ActionSupport;
public class BaseAction extends ActionSupport{
	private static final long serialVersionUID = 2817071984746760965L;
	public Map<String, Object> dataMap;
	public Boolean flag=false;
    public String id;
	
	public String page;//当前页
	public String rows;
	public Boolean _search;//是否条件搜索
	public String nd;
	public String sidx;
	public String sord;
	public String filters;//条件搜索
	public String searchField;		//单字段查询的时候，查询字段名称
	public String searchString;	//单字段查询的时候，查询字段的值
	public String searchOper;		//单字段查询的时候，查询的操作
	public String oper;//编辑表格行时，传过来的操作类型。
	
	
	
	
	
	protected BaseService baseService;
	
	
	
	public BaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(BaseService baseService) {
		this.baseService = baseService;
	}
	
	public Map<String, Object> getDataMap() {
		return dataMap;
	}

	public void setDataMap(Map<String, Object> dataMap) {
		this.dataMap = dataMap;
	}

	public Boolean getFlag() {
		return flag;
	}

	public void setFlag(Boolean flag) {
		this.flag = flag;
	}

	public String getPage() {
		return page;
	}

	public void setPage(String page) {
		this.page = page;
	}

	public String getRows() {
		return rows;
	}

	public void setRows(String rows) {
		this.rows = rows;
	}

	public Boolean get_search() {
		return _search;
	}

	public void set_search(Boolean _search) {
		this._search = _search;
	}

	public String getNd() {
		return nd;
	}

	public void setNd(String nd) {
		this.nd = nd;
	}

	public String getSidx() {
		return sidx;
	}

	public void setSidx(String sidx) {
		this.sidx = sidx;
	}

	public String getSord() {
		return sord;
	}

	public void setSord(String sord) {
		this.sord = sord;
	}

	public String getFilters() {
		return filters;
	}

	public void setFilters(String filters) {
		this.filters = filters;
	}

	public String getSearchField() {
		return searchField;
	}

	public void setSearchField(String searchField) {
		this.searchField = searchField;
	}

	public String getSearchString() {
		return searchString;
	}

	public void setSearchString(String searchString) {
		this.searchString = searchString;
	}

	public String getSearchOper() {
		return searchOper;
	}

	public void setSearchOper(String searchOper) {
		this.searchOper = searchOper;
	}

	public String getOper() {
		return oper;
	}

	public void setOper(String oper) {
		this.oper = oper;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}

	
	
	
}
