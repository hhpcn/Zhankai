package com.xmut.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public interface BaseService {
	public <T> int save(T entity);
	public <T> T getByClassNameAndId(Class<T> entityClass,Serializable id);
	/**
	 * 
	 * @param hql example: from User as user where user.name=?
	 * @return object or null
	 */
	public <T> T getByHQL(String hql);
    /**
     * 
     * @param example: select * from News_Table where id = 1
     * @return
     */
	
	
	public <T> T getByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	
	
	/**
	 * 
	 * @param entityClass
	 * @return
	 */
	public <T> List<T> listByClassName(Class<?> entityClass);
	/**
	 * 
	 * @param hql example1:全查询  from News;
	 *            example2:投影查询 select new cn.xmut.test.News(id,title) from News;
	 *          
	 * @return
	 */
	public <T> List<T> listByHQL(String hql);
	public <T> List<T> listPageRowsByClassAndParams(Class<?> entityClass,int currentPage,int pageSize,String whereParams);
	public <T> List<T> listPageRowsByClass(Class<?> entityClass,int currentPage,int pageSize);
	public <T> List<T> listPageRowsByHQL(String hql,int currentPage,int pageSize);

	public void saveOrUpdate(Object entity);
	public void saveOrUpdate(Class<?> entityClass, Object entity);
	public void update(Object entity);
	public void update(Class<?> entityClass, Object entity);
	/**
	 * 
	 * @param entityClass
	 * @param id
	 * @param columnName
	 * @param value
	 * @return 被改变的记录数
	 */
	public int updateColumnById(Class<?> entityClass,Serializable id,String columnName,Object value);
	public int updateColumnByIds(Class<?> entityClass,Serializable[] ids,String columnName,Object value);
	public int updateColumnsById(Class<?> entityClass,Serializable id,Map<String, Object> params);
	public int updateColumnsByIds(Class<?> entityClass,Serializable[] ids,Map<String, Object> params);
	public int countByClass(Class<?> entityClass);
	public int countByHQL(String hql);
	public int countByClassAndParams(Class<?> entityClass,String whereParams);
	
	public <T> void delete(T entity);
	public void delete(Class<?> entityClass, Object entity);
	public <T> void deleteByClassAndId(Class<T> entityClass,Serializable id);
	public int deleteByClassAndIds(Class<?> entityClass,Serializable[] ids);
	public int deleteByClassAndParams(Class<?> entityClass,String whereParams);
	/**
	 * 
	 * @param hql:"delete News where title='id'"
	 */
	public int deleteByHQL(String hql);
	
	
}
