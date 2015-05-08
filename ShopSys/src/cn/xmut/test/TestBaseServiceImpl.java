package cn.xmut.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.xmut.test.model.News;

import com.xmut.base.BaseService;



@RunWith(SpringJUnit4ClassRunner.class) // 整合 
@ContextConfiguration(locations="classpath:applicationContext.xml") // 加载配置
public class TestBaseServiceImpl {
    @Resource
	BaseService baseService;

    public BaseService getBaseService() {
		return baseService;
	}

	public void setBaseService(BaseService baseService) {
		this.baseService = baseService;
	}

    @Test
	public void testSave(){
    	
    	System.out.println("ffff");
    	News news = new News();
		news.setContent("Hiberante");
		news.setTitle("ORM2");
		System.out.print(baseService.save(news));
    }
    
   
    
    @Test
    public void testGet(){
    	News news=baseService.getByClassNameAndId(News.class, 8);
    	System.out.println("gggg");
    	System.out.println(news.getContent());
    }
    
    @Test
    public void testGetByHql(){
    	News news=baseService.getByHQL("from News as news where news.id = 199");
    	System.out.println("gggg");
    	System.out.println(news.getContent());
    }
    

/*    public void testGetBysql(){
    	List<News> newslist=baseService.getBySQL("select id,content from News_Table where id = 1");
    	System.out.println("gggg");
    	System.out.println(newslist.get(0).content);
    }*/
    
    @Test
    public void testListByClass(){
    	List<News> news=baseService.listByClassName(News.class);
    	System.out.println("gggg");
    	
    }
    
    @Test
    public void testListByHQL(){
    	List<News> news=baseService.listByHQL("from News");
    	System.out.println(news.get(0).getTitle());
    }
    
    @Test
    public void testListpagesByClassName(){
    	List<News> news=baseService.listPageRowsByClass(News.class, 2, 3);
    	System.out.println(news.get(0).getTitle());
    	
    }
    
    @Test
    public void testListpagesByClassNameAndParams(){
    	List<News> news=baseService.listPageRowsByClassAndParams(News.class, 2, 3,"where id = 2");
    	System.out.println(news.get(0).getTitle());
    	
    }
    
    /**
     * object对象有多个值时，取得内部结果的方法
     * 
     */
    @Test
    public void testListpagesByHQL(){
    	List news=baseService.listPageRowsByHQL("select id,title from News", 1, 10);
    	Object[] obj= (Object[]) news.get(0);
    	System.out.println(obj[1]);
    	
    }
    
    
    @Test
    public void testSaveOrUpdate(){
    	News news = new News();
    	news.setContent("ggg");
    	
    	baseService.saveOrUpdate(news);
    	News news2 = new News(1, "save2", "test");
    	baseService.saveOrUpdate(News.class, news2);
    	
    }
    
    /**
     * 这个对象都插入了2次
     */
    @Test
    public void testUpdateColumn(){
    	baseService.updateColumnById(News.class, 2, "content","89990");
    	Integer[] ids = {3,4,5};
    	int i =baseService.updateColumnByIds(News.class, ids, "content", "345");
    	System.out.println(i);
    }
    
    @Test
    public void testUpdateColumns(){
    	Map<String, Object> map1 = new HashMap<String, Object>();
    	map1.put("content", "378");
    	map1.put("title", "id");
    	baseService.updateColumnsById(News.class, 2, map1);
    	Integer[] ids = {9,10,11};
    	int i =baseService.updateColumnsByIds(News.class, ids, map1);
    	System.out.println(i);
    }
    
    @Test
    public void testCount(){
        int i = baseService.countByClass(News.class);
        int j = baseService.countByHQL("select count(*) from News");
    	System.out.println(i);
    	System.out.println("j:"+j);
    	
        int s = baseService.countByClassAndParams(News.class, "where content ='345'");
    	System.out.println(s);
    }
    
    @Test
    public void testDeletes(){
    	/*News news = new News();
    	news.setId(100);
    	baseService.delete(news);*/
    	/*News news1 = new News();
    	news1.setId(10);
    	baseService.delete(News.class,news1);*/
    	
    	
    	String hql ="delete News where title is null";
    	System.out.println(baseService.deleteByHQL(hql));
    	
    	System.out.println(baseService.deleteByClassAndParams(News.class, "where content=''"));
    	
    	
    	/*baseService.deleteByClassAndId(News.class, 14);*/
    	Integer[] sIntegers= {1,2,3,4,5,6,7,8};
    	System.out.print(baseService.deleteByClassAndIds(News.class, sIntegers));
    }
    
}

