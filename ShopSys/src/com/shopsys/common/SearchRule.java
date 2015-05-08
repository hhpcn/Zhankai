package com.shopsys.common;

public class SearchRule {
    private String field;   //查询字段
    private String op;      //查询操作
    private String data;    //选择的查询值
    
    
    
	public SearchRule() {
		super();
	}
	public SearchRule(String field, String op, String data) {
		super();
		this.field = field;
		this.op = op;
		this.data = data;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getOp() {
		return op;
	}
	public void setOp(String op) {
		this.op = op;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
}
