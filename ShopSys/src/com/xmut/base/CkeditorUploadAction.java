package com.xmut.base;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.xmut.util.DateUtil;


public class CkeditorUploadAction  extends BaseAction{
      
	private static final long serialVersionUID = -4229694803908453752L;
		private File upload;  
        private String uploadContentType;  
        private String uploadFileName;  
        
        //引导图
    	private File guideImg;  
        private String guideImgContentType;  
        private String guideImgFileName;
        private String message;
      
        public File getUpload() {  
            return upload;  
        }  
      
        public void setUpload(File upload) {  
              
            this.upload = upload;  
        }  
      
        public String getUploadContentType() {  
            return uploadContentType;  
        }  
      
        public void setUploadContentType(String uploadContentType) {  
            this.uploadContentType = uploadContentType;  
        }  
      
        public String getUploadFileName() {  
            return uploadFileName;  
        }  
      
        public void setUploadFileName(String uploadFileName) {  
            this.uploadFileName = uploadFileName;  
        }  
      
        public File getGuideImg() {
			return guideImg;
		}

		public void setGuideImg(File guideImg) {
			this.guideImg = guideImg;
		}

		public String getGuideImgContentType() {
			return guideImgContentType;
		}

		public void setGuideImgContentType(String guideImgContentType) {
			this.guideImgContentType = guideImgContentType;
		}

		public String getGuideImgFileName() {
			return guideImgFileName;
		}

		public void setGuideImgFileName(String guideImgFileName) {
			this.guideImgFileName = guideImgFileName;
		}
		
		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}

		/**
		 * 上传图片
		 * @return
		 * @throws Exception
		 */
		public String uploadImage() throws Exception {  
            flag=false;
            HttpServletResponse response = ServletActionContext.getResponse();  
            response.setCharacterEncoding("UTF-8");  
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();  
      
            // CKEditor提交的很重要的一个参数  
            String callback = ServletActionContext.getRequest().getParameter("CKEditorFuncNum");   
              
            String expandedName = "";  //文件扩展名  
            if (uploadContentType.equals("image/pjpeg") || uploadContentType.equals("image/jpeg")) {  
                //IE6上传jpg图片的headimageContentType是image/pjpeg，而IE9以及火狐上传的jpg图片是image/jpeg  
                expandedName = ".jpg";  
            }else if(uploadContentType.equals("image/png") || uploadContentType.equals("image/x-png")){  
                //IE6上传的png图片的headimageContentType是"image/x-png"  
                expandedName = ".png";  
            }else if(uploadContentType.equals("image/gif")){  
                expandedName = ".gif";  
            }else if(uploadContentType.equals("image/bmp")){  
                expandedName = ".bmp";  
            }else{  
                out.println("<script type=\"text/javascript\">");    
                out.println("window.parent.CKEDITOR.tools.callFunction(" + callback + ",''," + "'文件格式不正确（必须为.jpg/.gif/.bmp/.png文件）');");   
                out.println("</script>");  
                return null;  
            }  
              
            if(upload.length() > 2000*1024){  
                out.println("<script type=\"text/javascript\">");    
                out.println("window.parent.CKEDITOR.tools.callFunction(" + callback + ",''," + "'文件大小不得大于2M');");   
                out.println("</script>");  
                return null;  
            }  
              
              
            InputStream is = new FileInputStream(upload);  
            String uploadPath = ServletActionContext.getServletContext().getRealPath("img/upload/"+DateUtil.getDirDate());
            System.out.println("uploadpath:"+uploadPath);
            File dirfile=new File(uploadPath);
            if(!dirfile.exists()){
                     dirfile.mkdirs();
                  }
            
            String fileName = DateUtil.getDate();  //采用时间+UUID的方式随即命名  
            fileName += expandedName;  
            System.out.println("filename:"+fileName);
            File toFile = new File(uploadPath, fileName);  
            OutputStream os = new FileOutputStream(toFile);     
            byte[] buffer = new byte[1024];     
            int length = 0;  
            while ((length = is.read(buffer)) > 0) {     
                os.write(buffer, 0, length);     
            }     
            is.close();  
            os.close();  
            HttpServletRequest request = ServletActionContext.getRequest();  
           String URL=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+ request.getContextPath()+"/";
            
            
            // 返回“图像”选项卡并显示图片  
            out.println("<script type=\"text/javascript\">");    
            out.println("window.parent.CKEDITOR.tools.callFunction(" + callback + ",'" + URL+"img/upload/"+ DateUtil.getDirDate() +"/"+ fileName + "','')");    
            out.println("</script>");  
            out.println("<span style=‘font-size: 20px;‘>上传成功！</span>"); //上传成功
            // flag=true;
            return null;  
        }  
		
		/**
		 * 上传引导图
		 * @return
		 * @throws Exception
		 */
		public String uploadGuideImg() throws Exception {  
            String expandedName = "";  //文件扩展名  
            if (guideImgContentType.equals("image/pjpeg") || guideImgContentType.equals("image/jpeg")) {  
                //IE6上传jpg图片的headimageContentType是image/pjpeg，而IE9以及火狐上传的jpg图片是image/jpeg  
                expandedName = ".jpg";  
            }else if(guideImgContentType.equals("image/png") || guideImgContentType.equals("image/x-png")){  
                //IE6上传的png图片的headimageContentType是"image/x-png"  
                expandedName = ".png";  
            }else if(guideImgContentType.equals("image/gif")){  
                expandedName = ".gif";  
            }else if(guideImgContentType.equals("image/bmp")){  
                expandedName = ".bmp";  
            }else{  
                message="文件格式不正确（必须为.jpg/.gif/.bmp/.png文件）";
                return "guideimgerror";  
            }  
              
            if(guideImg.length() > 2000*1024){ 
                message="文件大小不得大于2M";
                return "guideimgerror";  
            }  
              
              
            InputStream is = new FileInputStream(guideImg);  
            String uploadPath = ServletActionContext.getServletContext().getRealPath("img/guide/"+DateUtil.getDirDate());
            System.out.println("guidePath:"+uploadPath);
            File dirfile=new File(uploadPath);
            if(!dirfile.exists()){
                     dirfile.mkdirs();
                  }
            
            String fileName = DateUtil.getDate();  //采用时间+UUID的方式随即命名  
            fileName += expandedName;  
            System.out.println("filename:"+fileName);
            File toFile = new File(uploadPath, fileName);  
            OutputStream os = new FileOutputStream(toFile);     
            byte[] buffer = new byte[1024];     
            int length = 0;  
            while ((length = is.read(buffer)) > 0) {     
                os.write(buffer, 0, length);     
            }     
            is.close();  
            os.close();  
            HttpServletRequest request = ServletActionContext.getRequest();  
           String URL=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+ request.getContextPath()+"/";
            
           dataMap=new HashMap<String, Object>();
           dataMap.put("guideImgUrl", "img/guide/"+ DateUtil.getDirDate() +"/"+ fileName);
            message="img/upload/"+ DateUtil.getDirDate() +"/"+ fileName;
           
            return "dataMap";  
        }  
		
		public String removeFile() {
			
			System.out.println(message);
			String uploadPath = ServletActionContext.getServletContext().getRealPath(message);
			File file = new File(uploadPath);
			if (file.exists()) {
				file.delete();
			}
			
				
			return "flag";
			
		}

		
		
		
}
