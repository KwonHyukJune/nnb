function gfn_isNull(str){ //null 값을 체크하는 함수
	if(str==null) return true;
	if(str=="NaN") return true;
	if(new String(str).valueOf()=="undefined") return true;
	var chkStr = new String(str);
	if(chkStr.valueOf()=="undefined") return true;
	if(chkStr==null) return true;
	if(chkStr.toString().length==0) return true;
	return false;
}

function ComSubmit(opt_formId){ 
	this.formId = gfn_isNull(opt_formId)==true? "commonForm" : opt_formId; // 값이 없으면 commonForm, 있으면 그 아이디를 formId에 넣는다. 
	this.url = ""; 
	
	if(this.formId=="commonForm"){
		$("#commonForm")[0].reset();
	}
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.addParam = function addParam(key, value){
		$("#"+this.formId).append($("<input type='hidden' name='"+key+"' id='"+key+"' value='"+value+"'>"));
	};
	
	this.submit = function submit(){
		var frm = $("#"+this.formId)[0];
		frm.action = this.url;
		frm.method = "post";
		frm.submit();
	};
	
	this.delParam = function delParam(){
		var del = document.getElementById(this.formId);
		while(del.firstChild){
			del.removeChild(del.firstChild);
		}
	};
}

/* ajax */
var gfv_ajaxCallback = "";
function ComAjax(opt_formId){
	this.url = "";
	this.formId = gfn_isNull(opt_formId)==true? "commonForm": opt_formId;
	this.param = "";
	
	if(this.formId=="commonForm"){
		var frm = $("#commonForm");
		if(frm.length>0){
			frm.remove();
		}
		var str = "<form id='commonForm' name='commonForm'></form>";
		$('body').append(str);
	}
	
	this.setUrl = function setUrl(url){
		this.url = url;
	};
	
	this.setCallback = function setCallback(callBack){ //데이터를 전송한 후 호출 될 함수를 지정.
		fv_ajaxCallback = callBack;
	};
	
	this.addParam = function addParam(key,value){
		this.param = this.param+"&"+key+"="+value;
	};
	
	this.ajax = function ajax(){
		if(this.formId!="commonForm"){
			this.param += "&"+$("#"+this.formId).serialize();
		}
		$.ajax({
			url:this.url,
			type:"POST", //통신 방식을 설정. 그냥 post로 지정
			data:this.param, //서버로 전달한 인자 (parameter), 보통은 object형식으로 데이터를 지정.//여기서는 addParam또는 form 자체를 전송하기때문에 이렇게 만듬 
			async:false, 
			success:function(data,status){
				if(typeof(fv_ajaxCallback)=="function"){
					fv_ajaxCallback(data);
				}
				else{
					eval(fv_ajaxCallback+"(data);");
				}
			}
		});
	};
}
/* paging tag */
/*
divId: 페이징 태그가 그려질 div
pageIdx: 현재 페이지 위치가 저장될 input 태그 id
recordCount: 페이지당 레코드 수
totalCount: 전체 조회 건수
eventName: 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
*/
var gfv_pageIndex = null;
var gfv_eventName = null;
function gfn_renderPaging(params){ //페이징 태그를 작성하는 역할.
	var divId = params.divId;	//페이징이 그려질 div id
	gfv_pageIndex = params.pageIndex;	//현재 위치가 저장될 input 태그
	var totalCount = params.totalCount;	//전체 조회 건수
	var currentIndex = $("#"+params.pageIndex).val();	//현재 위치
	if($("#"+params.pageIndex).length==0 || gfn_isNull(currentIndex)==true){
		currentIndex = 1;
	}
	
	var recordCount = params.recordCount;	//페이지 당 레코드 수 (줄 수)
	if(gfn_isNull(recordCount)==true){
		recordCount = 20;
	}
	var totalIndexCount = Math.ceil(totalCount/recordCount);	//전체 인덱스 수 (올림해서 구하긔)
	gfv_eventName = params.eventName;
	
	$("#"+divId).empty(); //페이징이 그려질 div id를 비운다.
	var preStr = ""; //맨앞으로 이동하는 태그
	var postStr = "";// 맨뒤로 이동하는 태그
	var str = ""; //인덱스 태그
	
	var first = (parseInt((currentIndex-1)/10)*10)+1;
	var last = (parseInt(totalIndexCount/10)==parseInt(currentIndex/10))? totalIndexCount%10: 10;
	var prev = (parseInt((currentIndex-1)/10)*10)-1>0? (parseInt((currentIndex-1)/10)*10)-9: 1;
	var next = (parseInt((currentIndex-1)/10)+1)*10+1<totalIndexCount? (parseInt((currentIndex-1)/10)+1)*10+1: totalIndexCount;
	
	if(totalIndexCount>10){	//전체 인덱스가 10이 넘을 경우 > 맨앞, 앞 태그 작성
		preStr += "<a href='#this' class='pad_5' onclick='_movePage(1)'>[<<]</a>"
			+ "<a href='#this' class='pad_5' onclick='_movePage("+prev+")'>[<]</a>";
	}
	else if(totalIndexCount<=10 && totalIndexCount>1){	//전체 인덱스가 10보다 작을 경우 > 맨앞 태그 작성
		preStr += "<a href='#this' class='pad_5' onclick='_movePage(1)'>[<<]</a>";
	}
	
	if(totalIndexCount>10){	//전체 인덱스가 10이 넘을 경우 > 맨뒤, 뒤 태그 작성
		postStr += "<a hef='#this' class='pad_5' onclick='_movePage("+next+")'>[>]</a>"
			+ "<a href='#this' class='pad_5' onclick='_movePage("+totalIndexCount+")'>[>>]</a>";
	}
	else if(totalIndexCount<=10 && totalIndexCount>1){
		postStr += "<a href='#this' class='pad_5' onclick='_mpvePage("+totalIndexCount+")'>[>>]</a>";
	}
	
	for(var i=first; i<(first+last); i++){
		if(i!=currentIndex){
			str += "<a href='#this' class='pad_5' onclick='_movePage("+i+")'>"+i+"</a>";
		}
		else{
			str += "<b><a href='$this' class='pad_5' onclick='_movePage("+i+")'>"+i+"</a></b>";
		}
	}
	$("#"+divId).append(preStr+str+postStr);
}

function _movePage(value){ //페이징 태그를 눌렀을 경우 페이지를 이동하는 역할.
	$("$"+gfv_pageIndex).val(value);
	if(typeof(gfv_eventName)=="function"){
		gfv_eventName(value);
	}
	else{
		eval(gfv_eventName+"(value);");
	}
}

function back(){
	history.go(-1);
}

function getParameterByName(name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}