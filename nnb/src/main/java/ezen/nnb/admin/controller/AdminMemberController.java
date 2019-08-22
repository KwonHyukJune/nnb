package ezen.nnb.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Calendar;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ezen.nnb.admin.paging.Paging;
import ezen.nnb.admin.service.AdminMemberService;
import ezen.nnb.common.CommandMap;
@Controller
public class AdminMemberController{

	@Resource(name="adminMemberService")
	private AdminMemberService adminMemberService;
		
	@RequestMapping(value="/admin/memberList")
	public ModelAndView adMemberList(CommandMap commandMap,HttpServletRequest request)throws Exception{
		ModelAndView mv=new ModelAndView("admin/member/memberList");
		List<Map<String,Object>>adminMemberList=adminMemberService.adminMemberList(commandMap.getMap());  
		mv.addObject("adminMemberList",adminMemberList);
		mv.addObject("count",adminMemberList.size());
		return mv;
	}	  
	
	@RequestMapping(value="/admin/memberDetail")
    public ModelAndView adMemberDetail(CommandMap commandMap) throws Exception{
		ModelAndView mv = new ModelAndView();
		System.out.println("ban"+commandMap.getMap());
		Map<String,Object> map = adminMemberService.adminMemberDetail(commandMap.getMap());
		List<Map<String,Object>>map2=adminMemberService.adminMemberBanDetail(commandMap.getMap());
		mv.addObject("memberDetail",map);
		mv.addObject("memberDetails",map2);
		mv.setViewName("admin/member/memberDetail");			
		return mv;		 
	}
			
		@RequestMapping(value="/admin/memberDelete")
		public ModelAndView adMemberBan(CommandMap commandMap,HttpServletRequest request)throws Exception{
			ModelAndView mv=new ModelAndView("redirect:/admin/memberDetail");
			Map<String,Object>map=adminMemberService.adminMemberBan(commandMap.getMap());
			
			 
			mv.addObject("map",map);
			mv.addObject("MEM_NUM",commandMap.get("MEM_NUM"));
			mv.addObject("MEM_ID",commandMap.get("MEM_ID"));
			return mv;
		}
	}
				
