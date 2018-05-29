frmcheck
========

 * form Check v1.2
 * use: onsubmit="return frmCheck('name,name2');"
 * 제이쿼리 1.x.x 버전이 필요합니다.
 * coding: 2014-07-23 bae jongyoung


사용법 :

필수 입력채크를 하려는 곳의 name를 적어 주면됩니다.
각 인풋에 있는 title 을 이용하여 알럿을 띄워 줍니다.
title 값이 없으면 placeholder 값을 확인해서 
    
    <form method="post" action="?" onsubmit="return frmCheck('name,name2,name2');">
      <input type="text" name="name" title="이름" txtlimit='4' chk="eng">
      <select name="name1" title="이름1">
      	<option value="" selected>선택</option>
      	<option value="1">1값</option>
      	<option value="2">2값</option>
      	<option value="3">3값</option>
      </select>
    	<textarea name="name3" title="이름2" ></textarea>
    </form>


글자수 제한 가능
<input type="text" name="name" title="이름" txtlimit='4' chk="eng">
  txtlimit='n'  // n 은 숫자


채크 옵션도 추가 가능
<input type="text" name="name" title="이름" txtlimit='4' chk="eng">
    chk="idcheck"  // 아이디
    chk="email"    // 이메일
    chk="number"   // 숫자
    chk="eng"      // 영문



사용법 1.
    onsubmit="return frmCheck('name,name2,name2');"
    
사용법 2.
    onsubmit="return frmCheck2('name,name2');"
    
    function frmCheck2(nv){
    
    	if ($('#agree').prop('checked')==true){
    		if (frmCheck(nv)==true){
    			return true;
    		}else{
    			return false;
    		}
    	}else{
    		alert ('동의가 필요 합니다.');
    		return false;
    	}
    }
