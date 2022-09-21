package backend.controller;
//

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;






@Controller
public class MyErrorController implements ErrorController  {
    private static final Logger LOG=LoggerFactory.getLogger(MyErrorController.class);

    
public String handleError(HttpServletRequest request) {
    
    String pathInfo = request.getPathInfo();
    LOG.info("pathInfo: " + pathInfo);
    //
    String ctxPath = request.getContextPath();
    LOG.info("ctxPath: " + ctxPath);
    //
    String query = request.getQueryString();
    LOG.info("query: " + query);
    //
    String url = request.getRequestURL().toString();
    LOG.info("url: " + url);
    
    Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        LOG.info("status: " + status);
    
    if (status != null) {
        Integer statusCode = Integer.valueOf(status.toString());
    
        if(statusCode == HttpStatus.NOT_FOUND.value()) {
            return "error-404";
        }
        else if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
            return "error-500";
        }
        
    }
    return "error";
}    
    
}