package com.xmut.base;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.ObjectNotFoundException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;



public class BaseDaoImpl implements BaseDao {

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
    /**
     * 
     * @return session
     */
    public Session getSession() {
        //需要开启事物，才能得到CurrentSession
        return sessionFactory.getCurrentSession();
    }



	@SuppressWarnings("unchecked")
	@Override
	public <T> T getByClassNameAndId(Class<T> entityClass, Serializable id) {
		try{
			return (T) this.getSession().load(entityClass, id);
		}catch (ObjectNotFoundException e) {
			System.out.println("notfound this object");
			
		}
		return null;
	}


	@Override
	public <T> T getByHQL(String hql) {
		// TODO Auto-generated method stub
		Query query = this.getSession().createQuery(hql);
		return (T) query.uniqueResult();
	}


	@Override
	public <T> T getByClassNameAndParams(Class<?> entityClass,
			Map<String, Object> whereParams) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public <T> int save(T entity) {
		return (Integer) this.getSession().save(entity);
	}


	@Override
	public <T> List<T> listByClassName(Class<?> entityClass) {
		return this.getSession().createQuery("from "+entityClass.getSimpleName()).list();
	}

	@Override
	public <T> List<T> listByHQL(String hql) {
		return this.getSession().createQuery(hql).list();
	}


	@Override
	public <T> List<T> listPageRowsByClassAndParams(Class<?> entityClass,int currentPage,
			int pageSize,String whereParams) {
		Query query=this.getSession().createQuery("from "+entityClass.getSimpleName()+" "+whereParams);
		System.out.println("from "+entityClass.getSimpleName()+" "+whereParams);
		query.setFirstResult((currentPage-1)*pageSize);
		query.setMaxResults(pageSize);
		return query.list();
	}

	@Override
	public <T> List<T> listPageRowsByClass(Class<?> entityClass,
			int currentPage, int pageSize) {
		Query query=this.getSession().createQuery("from "+entityClass.getSimpleName());
		query.setFirstResult((currentPage-1)*pageSize);
		query.setMaxResults(pageSize);
		return query.list();
	}

	@Override
	public <T> List<T> listPageRowsByHQL(String hql, int currentPage,
			int pageSize) {
		Query query=this.getSession().createQuery(hql);
		query.setFirstResult((currentPage-1)*pageSize);
		query.setMaxResults(pageSize);
		return query.list();
	}

	@Override
	public void saveOrUpdate(Object entity) {
		this.getSession().saveOrUpdate(entity);
	}

	@Override
	public void saveOrUpdate(Class<?> entityClass, Object entity) {
		this.getSession().saveOrUpdate(entityClass.getSimpleName(), entity);
		
	}

	@Override
	public void update(Object entity) {
		this.getSession().update(entity);
		
	}

	@Override
	public void update(Class<?> entityClass, Object entity) {
		this.getSession().update(entityClass.getSimpleName(), entity);
		
	}

	@Override
	public int updateColumnById(Class<?> entityClass, Serializable id,
			String columnName, Object value) {
		StringBuffer sb=new StringBuffer();
		sb.append("update "+entityClass.getSimpleName()+" set "+columnName);
		if(value instanceof String){
			sb.append("='"+value+"' where id="+id);
		}else{
			sb.append("="+value+" where id="+id);
		}
		String hql=sb.toString();
		Query query = this.getSession().createQuery(hql);
		return query.executeUpdate();
	}

	@Override
	public int updateColumnByIds(Class<?> entityClass, Serializable[] ids,
			String columnName, Object value) {
				StringBuffer sb=new StringBuffer();
				sb.append("update "+entityClass.getSimpleName()+" set "+columnName);
				if(value instanceof String){
					sb.append("='"+value+"'");
				}else{
					sb.append("="+value);
				}
				sb.append(" where ");
				for (int i = 0; i < ids.length; i++) {
					if(i==0){
						sb.append("id="+ids[i]);
					}else{
						sb.append(" or id="+ids[i]);
					}
				}
			String hql=sb.toString();
			Query query = this.getSession().createQuery(hql);
			return query.executeUpdate();
		
	}

	@Override
	public int updateColumnsById(Class<?> entityClass, Serializable id,
			Map<String, Object> params) {
		StringBuffer sb=new StringBuffer();
		sb.append("update "+entityClass.getSimpleName()+" set ");
		Set<String> keys=params.keySet();
		for (String key : keys) {
			Object value=params.get(key);
			if(value instanceof String){
				sb.append(key+"='"+value+"',");
			}else{
				sb.append(key+"="+value+",");
			}
		}
		//去掉最后一个,
		sb.replace(sb.length()-1, sb.length(), "");
		sb.append(" where id="+id);
		String hql=sb.toString();
		Query query = this.getSession().createQuery(hql);
		return query.executeUpdate();
	}

	@Override
	public int updateColumnsByIds(Class<?> entityClass, Serializable[] ids,
			Map<String, Object> params) {
				StringBuffer sb=new StringBuffer();
				sb.append("update "+entityClass.getSimpleName()+" set ");
				Set<String> keys=params.keySet();
				for (String key : keys) {
					Object value=params.get(key);
					if(value instanceof String){
						sb.append(key+"='"+value+"',");
					}else{
						sb.append(key+"="+value+",");
					}
				}
				//去掉最后一个,
				sb.replace(sb.length()-1, sb.length(), "");
				sb.append(" where ");
				for (int i = 0; i < ids.length; i++) {
					if(i==0){
						sb.append("id="+ids[i]);
					}else{
						sb.append(" or id="+ids[i]);
					}
				}
			  String hql=sb.toString();
			  Query query = this.getSession().createQuery(hql);
			  return query.executeUpdate();
		
	}

	@Override
	public int countByClass(Class<?> entityClass) {
		String hql = "select count(*) from "+entityClass.getSimpleName();
		int count=0;
		Query query=this.getSession().createQuery(hql);
		count = ((Long) query.uniqueResult()).intValue();
		return count;
	}

	@Override
	public int countByHQL(String hql) {
		Query query=this.getSession().createQuery(hql);
		return ((Long) query.uniqueResult()).intValue();
		
	}

	@Override
	public int countByClassAndParams(Class<?> entityClass,
			String whereParams) {
		String hql = "select count(*) from "+entityClass.getSimpleName()+" "+whereParams;
		Query query=this.getSession().createQuery(hql);
		return ((Long) query.uniqueResult()).intValue();
	}

	@Override
	public <T> void delete(T entity) {
		this.getSession().delete(entity);
	}

	@Override
	public void delete(Class<?> entityClass, Object entity) {
		this.getSession().delete(entityClass.getSimpleName(), entity);
	}

	@Override
	public <T> void deleteByClassAndId(Class<T> entityClass, Serializable id) {
		T entity = getByClassNameAndId(entityClass, id);
		if (entity!=null) {
			delete(entity);
		}
		
	}

	@Override
	public int deleteByClassAndIds(Class<?> entityClass, Serializable[] ids) {
		StringBuffer sb=new StringBuffer();
		sb.append("delete from "+entityClass.getSimpleName()+" where ");
		for (int i = 0; i < ids.length; i++) {
			if(i==0){
				sb.append("id="+ids[i]);
			}else{
				sb.append("or id="+ids[i]);
			}
		}
		Query query=this.getSession().createQuery(sb.toString());
		return query.executeUpdate();
		
		
	}

	@Override
	public int deleteByClassAndParams(Class<?> entityClass, String whereParams) {
		String hql = "delete "+entityClass.getSimpleName()+" "+whereParams;
		Query query=this.getSession().createQuery(hql);
		return query.executeUpdate();
		
	}

	@Override
	public int deleteByHQL(String hql) {
		Query query=this.getSession().createQuery(hql);
		return query.executeUpdate();
		
	}



}
