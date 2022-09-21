package backend.controller;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
// import java.util.logging.Level;
// import java.util.logging.Logger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;

@Component
public class LogFilter implements Filter {

// private static final Logger LOG = Logger.getLogger(LogFilter.class.getName());
private static final Logger LOG=LoggerFactory.getLogger(LogFilter.class);
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
       // LOG.log(Level.INFO, "Hello from: " + request.getLocalAddr());
       String addr = request.getLocalAddr();
        String name = request.getLocalName();
       int reqPort = request.getServerPort();
       //
       HttpServletRequest httpReq = (HttpServletRequest) request;

       StringBuffer buffUrl = httpReq.getRequestURL();
       //
       String type = request.getContentType();
       int len = request.getContentLength();
       java.util.Map<String,String[]> params = request.getParameterMap();
       if(!params.isEmpty()){
           LOG.info("params: " + params);
         java.util.Set<java.util.Map.Entry<String,String[]>> entryList = params.entrySet();
         java.util.Iterator<java.util.Map.Entry<String,String[]>> iter = entryList.iterator();
         java.util.Map.Entry<String,String[]> entry = iter.next();
         String key = entry.getKey();
         String val = entry.getValue()[0];
       LOG.info("key: " + key + ", val: " + val);
       }
       LOG.info("addr: " + addr + ", name: " + name + ", port: " + reqPort + ", type: " + type
       + ", len: " + len + ", buffUrl: " + buffUrl);
        chain.doFilter(request, response);
    }

}