package cn.xmut.test.model;

public class News {
	Integer id;
	String title;
	String content;
	
	
	public News() {
		super();
	}
	
	public News(Integer id, String title) {
		super();
		this.id = id;
		this.title = title;
	}
	
	
	


	public News(Integer id, String title, String content) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	
	
}
