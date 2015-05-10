package com.shopsys.productmanage.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.shopsys.common.JqgridUtil;
import com.shopsys.personnel.model.User;
import com.shopsys.productmanage.model.Product;
import com.shopsys.productmanage.service.ProductService;
import com.xmut.base.BaseAction;

public class ProductAction extends BaseAction {
	
	private static final long serialVersionUID = 7931741272037461013L;
	private ProductService productService;
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
		    products=productService.listPageRowsByClass(Product.class, currentPage, pageSize);
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
			productMap.put("kindName",product.getKindName());
			productMap.put("kindId", product.getKindId());
			productMaps.add(productMap);
		}
	
		dataMap.put("rows", productMaps);
	
		
		
		return "list";
	}
	
	
	public String addProduct() {
		System.out.println();
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
		return "dataMap";
	}
	
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
	
	
	
	
	
	
}
