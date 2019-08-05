<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<title>공지사항 상세보기</title>
<head>
<%@ include file="/WEB-INF/include/include-header.jspf" %>
<%@ include file="/WEB-INF/include/adminHeader.jspf" %>

<link rel="stylesheet" type="text/css" href="<c:url value='/css/myInterest.css'/>"/>

<script type="text/javascript">
function goPage1(num) {   // 새 약관 등록
	location.href="/nnb/admin/terms/list?num="+num; 
	}	
</script>

</head>

<br/><br/><br/>

<body>


<div><h1>공지사항</h1></div>
<br/>
<hr>
<br/><br/><br/>

<div class="selectNoticeDetail">


<div class="noticeList">
   
   <div class="notice">
      <ul>
  	<li>번호 
			 ${terms.TERMS_NUM} &nbsp;     
			</li>	
			<li>날짜 
	         ${terms.TERMS_REGDATE}&nbsp;
	      	</li>
	      	<li>약관제목  :&nbsp;      	
	         ${terms.TERMS_TITLE}&nbsp;
	         </li>
	         <li>약관내용  :&nbsp;
			${terms.TERMS_CONTENT}    
	         </li>	
    </ul>
    <br/><br/><br/> 
    <a href="#" onClick="goPage1(${terms.TERMS_NUM})">목록으로</a>
    

   </div>	
 
</div>

</div>
<br/><hr><br/><br/>
<div>
<%@include file = "/WEB-INF/include/footer.jspf" %>
</div>
</body>
</html>