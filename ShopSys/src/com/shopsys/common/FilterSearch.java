package com.shopsys.common;

import java.util.List;

public class FilterSearch {
    private String groupOp; //多字段查询时分组类型，主要是AND或者OR   
    private List<SearchRule> rules; //多字段查询时候，查询条件的集合 

    
    
    
	public FilterSearch() {
		super();
	}

	public FilterSearch(String groupOp, List<SearchRule> rules) {
		super();
		this.groupOp = groupOp;
		this.rules = rules;
	}

	public String getGroupOp() {
		return groupOp;
	}

	public void setGroupOp(String groupOp) {
		this.groupOp = groupOp;
	}

	public List<SearchRule> getRules() {
		return rules;
	}

	public void setRules(List<SearchRule> rules) {
		this.rules = rules;
	}
    
    
}
