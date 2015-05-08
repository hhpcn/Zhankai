package com.xmut.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;


public interface BaseDao {
	
	public <T> T getByClassNameAndId(Class<T> entityClass,Serializable id);
	public <T> T getByHQL(String hql);
	public <T> T getByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	public <T> List<T> listByClassName(Class<?> entityClass);
	public <T> List<T> listByHQL(String hql);
	public <T> List<T> listPageRowsByClassAndParams(Class<?> entityClass,int currentPage,int pageSize,String whereParams);
	public <T> List<T> listPageRowsByClass(Class<?> entityClass,int currentPage,int pageSize);
	public <T> List<T> listPageRowsByHQL(String hql,int currentPage,int pageSize);
	public <T> int save(T entity);
	public void saveOrUpdate(Object entity);
	public void saveOrUpdate(Class<?> entityClass, Object entity);
	public void update(Object entity);
	public void update(Class<?> entityClass, Object entity);
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
	public int deleteByHQL(String hql);
	
/*	public int save(Class<?> entityClass, Object entity);
	public void saveOrUpdate(Object entity);
	public void saveOrUpdate(Class<?> entityClass, Object entity);
	public <T> T getByClassNameAndId(Class<?> entityClass,Serializable id);
	public <T> T getByClassAndId(Class<?> clazz,Serializable id);
	public <T> T getByHQL(String hql);
	public <T> T getBySQL(String sql);
	public <T> T getByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	public void delete(Object entity);
	public void delete(Class<?> entityClass, Object entity);
	public void deleteByClassNameAndId(Class<?> entityClass,Serializable id);
	public void deleteByClassNameAndIds(Class<?> entityClass,Serializable[] ids);
	public void deleteByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	public void deleteByHQL(String hql);
	public void deleteBySQL(String sql);
	public void update(Object entity);
	public void updateColumnById(Class<?> entityClass,String columnName,Object value,Serializable id);
	public void updateColumnByIds(Class<?> entityClass,String columnName,Object value,Serializable[] ids);
	public void updateColumnsByParmas(Class<?> entityClass,Serializable id,Map<String, Object> parmas);
	public void updateColumnsByParmas(Class<?> entityClass,Serializable[] ids,Map<String, Object> parmas);
	public void update(Class<?> entityClass, Object entity);
	public int countByClassName(Class<?> entityClass);
	public int countByHQL(String hql);
	public int countBySQL(String sql);
	public int countByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	public <T> List<T> listByClassName(Class<?> entityClass);
	public <T> List<T> listByHQL(String hql);
	public <T> List<T> listBySQL(String sql);
	public <T> List<T> listByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams);
	public <T> List<T> listPageRowsByClassName(Class<?> entityClass,int currentPage,int pageSize);
	public <T> List<T> listPageRowsByHQL(String hql,int currentPage,int pageSize);
	public <T> List<T> listPageRowsBySQL(String sql,int currentPage,int pageSize);
	public <T> List<T> listPageRowsByClassNameAndParams(Class<?> entityClass,Map<String, Object> whereParams,int currentPage,int pageSize);
*/
}
