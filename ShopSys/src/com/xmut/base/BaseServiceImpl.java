package com.xmut.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

import cn.xmut.test.model.News;

@Transactional //事务控制
public class BaseServiceImpl implements BaseService,Serializable {

	private static final long serialVersionUID = 7156954649272824869L;
	protected BaseDao baseDao;
	
	public BaseDao getBaseDao() {
		return baseDao;
	}
	public void setBaseDao(BaseDao baseDao) {
		this.baseDao = baseDao;
	}



	@Override
	public <T> int save(T entity) {
		return baseDao.save(entity);
	}
	@Override
	@Transactional(readOnly=true)
	public <T> T getByClassNameAndId(Class<T> entityClass, Serializable id) {
		return baseDao.getByClassNameAndId(entityClass, id);
	}

	@Override
	@Transactional(readOnly=true)
	public <T> T getByHQL(String hql) {
		return baseDao.getByHQL(hql);
	}

/*	public <T> List<T> getBySQL(String sql) {
		
		return baseDao.getBySQL(sql);
	}*/
	@Override
	@Transactional(readOnly=true)
	public <T> T getByClassNameAndParams(Class<?> entityClass,
			Map<String, Object> whereParams) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	@Transactional(readOnly=true)
	public <T> List<T> listByClassName(Class<?> entityClass) {
		return baseDao.listByClassName(entityClass);
	}
	@Override
	@Transactional(readOnly=true)
	public <T> List<T> listByHQL(String hql) {
		return baseDao.listByHQL(hql);
	}

	@Override
	@Transactional(readOnly=true)
	public <T> List<T> listPageRowsByClassAndParams(Class<?> entityClass,int currentPage,int pageSize,
			String whereParams) {
		return baseDao.listPageRowsByClassAndParams(entityClass, currentPage, pageSize, whereParams);
	}
	@Override
	@Transactional(readOnly=true)
	public <T> List<T> listPageRowsByClass(Class<?> entityClass,
			int currentPage, int pageSize) {
		return baseDao.listPageRowsByClass(entityClass, currentPage, pageSize);
	}
	@Override
	@Transactional(readOnly=true)
	public <T> List<T> listPageRowsByHQL(String hql, int currentPage,
			int pageSize) {
		return baseDao.listPageRowsByHQL(hql, currentPage, pageSize);
	}
	@Override
	public void saveOrUpdate(Object entity) {
		baseDao.saveOrUpdate(entity);
		
	}
	@Override
	public void saveOrUpdate(Class<?> entityClass, Object entity) {
		baseDao.saveOrUpdate(entityClass, entity);
		
	}
	@Override
	public void update(Object entity) {
		baseDao.update(entity);
		
	}
	@Override
	public void update(Class<?> entityClass, Object entity) {
		baseDao.update(entityClass, entity);
		
	}
	@Override
	public int updateColumnById(Class<?> entityClass, Serializable id,
			String columnName, Object value) {
	    return	baseDao.updateColumnById(entityClass, id, columnName, value);
		
	}
	@Override
	public int updateColumnByIds(Class<?> entityClass, Serializable[] ids,
			String columnName, Object value) {
		return baseDao.updateColumnByIds(entityClass, ids, columnName, value);
		
	}
	@Override
	public int updateColumnsById(Class<?> entityClass, Serializable id,
			Map<String, Object> params) {
		return baseDao.updateColumnsById(entityClass, id, params);
		
	}
	@Override
	public int updateColumnsByIds(Class<?> entityClass, Serializable[] ids,
			Map<String, Object> params) {
		return baseDao.updateColumnsByIds(entityClass, ids, params);
	}
	@Override
	@Transactional(readOnly=true)
	public int countByClass(Class<?> entityClass) {
		return baseDao.countByClass(entityClass);
	}
	@Override
	@Transactional(readOnly=true)
	public int countByHQL(String hql) {
		return baseDao.countByHQL(hql);
	}
	@Override
	@Transactional(readOnly=true)
	public int countByClassAndParams(Class<?> entityClass,
			String whereParams) {
		return baseDao.countByClassAndParams(entityClass, whereParams);
	}
	@Override
	public <T> void delete(T entity) {
		baseDao.delete(entity);
	}
	@Override
	public void delete(Class<?> entityClass, Object entity) {
		baseDao.delete(entityClass, entity);
		
	}
	@Override
	public <T> void deleteByClassAndId(Class<T> entityClass, Serializable id) {
		baseDao.deleteByClassAndId(entityClass, id);
		
	}
	@Override
	public int deleteByClassAndIds(Class<?> entityClass, Serializable[] ids) {
	    return	baseDao.deleteByClassAndIds(entityClass, ids);
		
	}
	@Override
	public int deleteByClassAndParams(Class<?> entityClass, String whereParams) {
		return baseDao.deleteByClassAndParams(entityClass, whereParams);
		
	}
	@Override
	public int deleteByHQL(String hql) {
		return baseDao.deleteByHQL(hql);
		
	}
	
	
	

}
