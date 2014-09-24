/*
 * form Check v1.0
 * use: onsubmit="return frmCheck('name,name2');"
 * 제이쿼리 1.x.x 버전이 필요합니다.
 * codding: 2014-07-23 bae jongyoung
 */
/// onsubmit="return frmCheck('name,name2');"
function frmCheck(nv){

    var nameVal = nv.split(",")
    var inputName = new Array();
    var sVal_select = new Array();
    var inputText,thislimit,inputValu;
    var n_cnt = nameVal.length;
    for(n=0;n<n_cnt;n++){

		var sVal = $("input[name="+nameVal[n]+"]").val();
		if(sVal==undefined){
			sVal_select[n] = $("select[name="+nameVal[n]+"]").val();
			if ( sVal_select[n]==undefined ){
				inputName[n] = $("textarea[name="+nameVal[n]+"]");
			}else{
				inputName[n] = $("select[name="+nameVal[n]+"]");
			}
		}else{
			inputName[n] = $("input[name="+nameVal[n]+"]");
		}
	}

    var x_cnt = inputName.length;
    for(x=0;x<x_cnt;x++){

        inputText = inputName[x].attr('title');
        thislimit = inputName[x].attr('txtlimit');
        inputType = inputName[x].attr('type');
        inputChks = inputName[x].attr('chk');

            if(inputType=="radio"){
                 if(!$(":radio[name="+nameVal[x]+"]:checked").val()){
                    alert(inputText+"를(을) 체크해주세요");
                    return false;
                 }

            }else if(inputType=="checkbox"){
                if($("input:checkbox[name="+nameVal[x]+"]").is(":checked") != true ){
                    alert(inputText+"를(을) 체크해주세요");
                    return false;
                }
                /// 값가져오기 $('input:checkbox [ id="checkbox_id" ]').val();

            }else if(inputType=="text"){

                inputValu = inputName[x].val();
                if(!inputValu ){
                        alert(inputText+"를(을) 입력해주세요");
                        inputName[x].focus();
                       return false;
                }else{
                    if(thislimit){ ///txtlimit='n'
                        var valcnt = inputValu.length;
                        if(thislimit > valcnt){
                                alert(inputText+"의 글자 수가 작습니다.");
                                inputName[x].focus();
                                return false;
                        }
                    }
                }

				if(inputChks){
					if(inputChks=="idcheck"){
						  if(inputValu < 5 || inputValu > 15) {
							 alert("아이디는 5 ~ 15자의 영문 소문자나 숫자 또는 조합된 문자열이어야 합니다!");
							 return false;
						  }
						  for(var i = 0; i < inputValu.length; i++) {
							 var chr = inputValu.substr(i,1);
							 if((chr < '0' || chr > '9') && (chr < 'a' || chr > 'z')) {
								alert("아이디는 영문 소문자나 숫자 또는 조합된 문자열이어야 합니다!");
								return false;
							 }

						  }
					}
					if(inputChks=="email"){
					    var EmailChkExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
						if(!EmailChkExp.test(inputName[x].val())) {
							alert('이메일 주소가 유효하지 않습니다');
								inputName[x].focus();
							return false;
						}
					}
					if(inputChks=="number"){
					    var NumberChkExp = /[^0-9.]/gi;
						if(NumberChkExp.test(inputName[x].val())== true ) {
							alert('숫자만 입력해주세요');
								inputName[x].focus();
							return false;
						}
					}
					if(inputChks=="eng"){
					    var NumberChkExp = /[^a-zA-Z]/g;;
						if(NumberChkExp.test(inputName[x].val())== true ) {
							alert('영문만 입력해주세요');
								inputName[x].focus();
							return false;
						}
					}
				} ///CHK
            }else if(inputType=="hidden"){
                inputValu = inputName[x].val();
                if(!inputValu ){
                    alert(inputText+"의 값이 없습니다.");
                    return false;
                }
            }else if(inputType=="password"){
                inputValu = inputName[x].val();
                if(!inputValu ){
                        alert(inputText+"를(을) 입력해주세요");
                        inputName[x].focus();
                       return false;
                }else{
                    if(thislimit){
                        var valcnt = inputValu.length;
                        if(thislimit > valcnt){
                                alert(inputText+"의 글자 수가 작습니다.");
                                inputName[x].focus();
                                return false;
                        }
                    }
                }
            }else{ ///select
                inputValu = inputName[x].val();
                if(!inputValu ){
					if ( sVal_select[x]==undefined ){
						alert(inputText+"를(을) 입력해 주세요.");
					}else{
						alert(inputText+"를(을) 선택해 주세요.");
					}
					inputName[x].focus();
                    return false;
                }
            } //inputType
     }
    return true;
}