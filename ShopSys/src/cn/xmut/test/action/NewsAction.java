package cn.xmut.test.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.xmut.test.model.News;
import cn.xmut.test.service.NewsService;

import com.xmut.base.BaseAction;

public class NewsAction extends BaseAction {
	
	private static final long serialVersionUID = 1L;
	protected NewsService newsService;
	protected List<News> list;
	protected Map<String,Object> map = new HashMap<String, Object>();

	public List<News> getList() {
		return list;
	}

	public void setList(List<News> list) {
		this.list = list;
	}
	
	public NewsService getNewsService() {
		return newsService;
	}

	public void setNewsService(NewsService newsService) {
		this.newsService = newsService;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public String listAction() {
		list=newsService.listByClassName(News.class);
		map.put("News", list);
		return "list";
	}

}
