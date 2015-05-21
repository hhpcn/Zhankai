package com.shopsys.productmanage.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.shopsys.common.JqgridUtil;
import com.shopsys.personnel.model.User;
import com.shopsys.productmanage.model.Category;
import com.shopsys.productmanage.model.Kind;
import com.shopsys.productmanage.model.Product;
import com.shopsys.productmanage.service.CategoryService;
import com.shopsys.productmanage.service.KindService;
import com.shopsys.productmanage.service.ProductService;
import com.xmut.base.BaseAction;

public class ProductAction extends BaseAction {
	
	private static final long serialVersionUID = 7931741272037461013L;
	private ProductService productService;
	private CategoryService categoryService;
	private KindService kindService;
	private Product product;

	
	
	
	/**
	 * 查询产品数据，包括条件分页搜索和非条件分页搜索两种
	 * @return
	 */
	public String listProducts() {
		dataMap=new HashMap<String, Object>();
		int currentPage=Integer.parseInt(page);
		int pageSize=Integer.parseInt(rows);
		List<Product> products =null;
		List<Map<String, Object>> productMaps = new ArrayList<Map<String, Object>>();
		int allRecordNumbers=0;
		if (_search) {
			String whereParams = JqgridUtil.SearchToHqlParam(null, null, null, filters, null, null, null);
			products=productService.listPageRowsByClassAndParams(Product.class, currentPage, pageSize, whereParams);
			allRecordNumbers=productService.countByClassAndParams(Product.class, whereParams);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}else {
			allRecordNumbers=productService.countByClass(Product.class);
		    //products=productService.listPageRowsByClass(Product.class, currentPage, pageSize);
		    products=productService.listPageRowsByHQL("from Product where 1=1 order by id desc", currentPage, pageSize);
			dataMap.put("total", JqgridUtil.countPageNumbers(pageSize, allRecordNumbers));//总页数
			dataMap.put("records", allRecordNumbers);//总记录数
		}
		for (Product product : products) {
			Map<String, Object> productMap= new HashMap<String, Object>();
			productMap.put("productName", product.getProductName());
			productMap.put("id", product.getId());
			productMap.put("productNo", product.getProductNo());
			productMap.put("price", product.getPrice());
			productMap.put("color", product.getColor());
			productMap.put("brandName", product.getBrandName());
			productMap.put("brandId", product.getBrandId());
			productMap.put("url", product.getUrl());
			productMap.put("isPublish",product.getIsPublish());
			productMap.put("createTime", product.getCreateTime());
			productMap.put("kindId", product.getKindId());
			Kind kind = kindService.getByClassNameAndId(Kind.class, product.getKindId());
			if (kind!=null) {
				productMap.put("kindName",kind.getKindName());
			}else {
				productMap.put("kindName","");
			}
			productMaps.add(productMap);
		}
	
		dataMap.put("rows", productMaps);
	
		
		
		return "list";
	}
	
	
	public String addProduct() {
		product.setId(null);
		productService.saveOrUpdate(product);
			flag=true;
		return "flag";
	}
	
	
	public String editProduct() {
		productService.saveOrUpdate(product);
			flag=true;
		return "flag";
	}
	
	/**
	 * 行编辑：更新，删除
	 * @return
	 */
	public String edit() {
		
		Integer[] intIds = JqgridUtil.idToIntIds(id);
		if ("del".equalsIgnoreCase(oper)) {
			productService.deleteByClassAndIds(Product.class, intIds);
			flag=true;
		}
		return "flag";
	}
	
	/**
	 * 根据id获取记录
	 * @return
	 */
	public String loadProductById() {
		product = productService.getByClassNameAndId(Product.class, Integer.parseInt(id));
		dataMap=new HashMap<String, Object>();
		dataMap.put("product", product);
		
		Kind kind=kindService.getByClassNameAndId(Kind.class, product.getKindId());
		//所属栏目Id
		dataMap.put("categoryId", kind.getCategoryId());
		List<Kind> kinds= kindService.listByHQL("From Kind where categoryId="+kind.getCategoryId());
		dataMap.put("kinds", kinds);
		List<Category> categories= categoryService.listByHQL("From Category");
		dataMap.put("categorys", categories);
		
		return "dataMap";
	}
	
/***************************前台调用的方法，不进行拦截********************************************************************/
    //datamap 会不会有访问互相干扰的情形。spring类变量的管理
	public String frontLoadProducts() {
		dataMap=new HashMap<String, Object>();
		Integer kindId= Integer.parseInt(id);
		Integer currentPage=Integer.parseInt(page);
		Integer pageSize=Integer.parseInt(rows);
		String hql="from Product where kindId = "+kindId+" order by priority desc , id desc";
		List<Product> productList = productService.listPageRowsByHQL(hql, currentPage, pageSize);
		List<Map<String, Object>> productMapList= new ArrayList<Map<String,Object>>();
		for (int i = 0; i < productList.size(); i++) {
			Map<String, Object> productMap = new HashMap<String, Object>();
			productMap.put("id", productList.get(i).getId());
			productMap.put("productName", productList.get(i).getProductName());
			productMap.put("price", productList.get(i).getPrice());
			productMap.put("kindId", productList.get(i).getKindId());
			
			String guideImageUrls= productList.get(i).getGuideMap();
			if (guideImageUrls!=null && guideImageUrls != "") {
				String[] guideImageUrlsArray = guideImageUrls.split(";");
				if (guideImageUrlsArray.length>0) {
					productMap.put("guideImageUrl", guideImageUrlsArray[0]);
				}else {
					productMap.put("guideImageUrl", "");
				}
			}else {
				productMap.put("guideImageUrl", "");
			}
			
			productMapList.add(productMap);
		}
		dataMap.put("rowsSize", productList.size());
		dataMap.put("rows", productMapList);
		
		return "dataMap";
	}
	
	
	/**
	 * 根据id以及每页几条，统计页数
	 * @return
	 */
    public String frontCountPageNumber() {
    	Integer pageSize=Integer.parseInt(rows);
    	dataMap=new HashMap<String, Object>();
    	String hql="select count(*) from Product where kindId = "+id;
    	Integer allRecordNumbers=productService.countByHQL(hql);
    	Integer pageNumber=JqgridUtil.countPageNumbers(pageSize, allRecordNumbers);
    	dataMap.put("pageNumber", pageNumber);
		return "dataMap";
	}
    
    
    /**
     * 条件搜索产品，根据产品名、产品所属种类名匹配
     * @return
     */
    public String  frontLoadProductsBySearch() {
    	dataMap=new HashMap<String, Object>();
    	dataMap=new HashMap<String, Object>();
		Integer currentPage=Integer.parseInt(page);
		Integer pageSize=Integer.parseInt(rows);
		String hql="from Product where productName like '%"+searchString+"%' or kindName like '%"+searchString+"%' order by priority desc , id desc";
		List<Product> productList = productService.listPageRowsByHQL(hql, currentPage, pageSize);
		List<Map<String, Object>> productMapList= new ArrayList<Map<String,Object>>();
		for (int i = 0; i < productList.size(); i++) {
			Map<String, Object> productMap = new HashMap<String, Object>();
			productMap.put("id", productList.get(i).getId());
			productMap.put("productName", productList.get(i).getProductName());
			productMap.put("price", productList.get(i).getPrice());
			productMap.put("kindId", productList.get(i).getKindId());
			
			String guideImageUrls= productList.get(i).getGuideMap();
			if (guideImageUrls!=null && guideImageUrls != "") {
				String[] guideImageUrlsArray = guideImageUrls.split(";");
				if (guideImageUrlsArray.length>0) {
					productMap.put("guideImageUrl", guideImageUrlsArray[0]);
				}else {
					productMap.put("guideImageUrl", "");
				}
			}else {
				productMap.put("guideImageUrl", "");
			}
			
			productMapList.add(productMap);
		}
		dataMap.put("rowsSize", productList.size());
		dataMap.put("rows", productMapList);
    	return "dataMap";
	}
    
    
	/**
	 * 根据id以及每页几条，统计页数
	 * @return
	 */
    public String frontCountPageNumberBySearch() {
    	Integer pageSize=Integer.parseInt(rows);
    	dataMap=new HashMap<String, Object>();
    	String hql="select count(*) from Product where productName like '%"+searchString+"%' or kindName like '%"+searchString+"%'";
    	Integer allRecordNumbers=productService.countByHQL(hql);
    	Integer pageNumber=JqgridUtil.countPageNumbers(pageSize, allRecordNumbers);
    	dataMap.put("pageNumber", pageNumber);
		return "dataMap";
	}
	
/***************************前台调用的方法，不进行拦截*********************************************************************/
	
	
	
	public ProductService getProductService() {
		return productService;
	}

	public void setProductService(ProductService productService) {
		this.productService = productService;
	}
	
	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}


	public CategoryService getCategoryService() {
		return categoryService;
	}


	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}


	public KindService getKindService() {
		return kindService;
	}


	public void setKindService(KindService kindService) {
		this.kindService = kindService;
	}
	
	
	
	
	
	
}
