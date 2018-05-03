/*
 * form Check v1.1
 * use: onsubmit="return frmCheck('name,name2');"
 * 제이쿼리 1.x.x 버전이 필요합니다.
 * coding: 2014-07-23 bae jongyoung
 * https://github.com/bae-jongyoung/frmcheck
 
사용법 1:
	/// onsubmit="return frmCheck('name,name2');"
사용법 2:
	// onsubmit="return frmCheck2('name,name2');"
	
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
*/

function frmCheck(nv){

    var nameVal = nv.split(",")
    var inputName = new Array();
    var sVal_select = new Array();
    var inputText,thislimit,inputValue;
    var n_cnt = nameVal.length;
    for(n=0;n<n_cnt;n++){

		var sVal = $("input[name="+nameVal[n]+"]").val();
		if(sVal==undefined){
			sVal_select[n] = $("select[name="+nameVal[n]+"]").val();
			if ( sVal_select[n]==undefined ){
				inputName[n] = $("textarea[name="+nameVal[n]+"]");
				if(inputName[n].val()==undefined){
					// 
					inputName[n] = "array";
				}
			}else{
				inputName[n] = $("select[name="+nameVal[n]+"]");
			}
		}else{
			inputName[n] = $("input[name="+nameVal[n]+"]");
		}
	}

    var x_cnt = inputName.length;
    for(x=0;x<x_cnt;x++){

	if (inputName[x]=="array"){
		inputPlaceholder = $("input[name*="+nameVal[x]+"]").attr('placeholder');
		inputText = $("input[name*="+nameVal[x]+"]").attr('title');
		inputType = $("input[name*="+nameVal[n]+"]").attr('type');
	}else{
		inputPlaceholder = inputName[x].attr('placeholder');
		inputText = inputName[x].attr('title');
		thislimit = inputName[x].attr('txtlimit');
		inputType = inputName[x].attr('type');
		inputChks = inputName[x].attr('chk');
	}
			if (inputText=='' || inputText==undefined){
				if (inputPlaceholder=='' || inputPlaceholder==undefined){
					//title, placeholder 이 없는 경우 name 으로 대치
					inputText = nameVal[x];
				}else{
					inputText = inputPlaceholder;
				}
			}

            if(inputType=="radio"){
                 if(!$(":radio[name="+nameVal[x]+"]:checked").val()){
                    alert(inputText+"을(를) 체크해주세요");
                    return false;
                 }

            }else if(inputType=="checkbox"){
                if($("input:checkbox[name="+nameVal[x]+"]").is(":checked") != true ){
                    alert(inputText+"을(를) 체크해주세요");
                    return false;
                }
                /// 값가져오기 $('input:checkbox [ id="checkbox_id" ]').val();

            }else if(inputType=="text"){

                inputValue = inputName[x].val();
                if(!inputValue ){
                        alert(inputText+"을(를) 입력해주세요");
                        inputName[x].focus();
                       return false;
                }else{
                    if(thislimit){ ///txtlimit='n'
                        var valcnt = inputValue.length;
                        if(thislimit > valcnt){
                                alert(inputText+"의 글자 수가 작습니다.");
                                inputName[x].focus();
                                return false;
                        }
                    }
                }

				if(inputChks){
					if(inputChks=="idcheck"){
						  if(inputValue < 5 || inputValue > 15) {
							 alert("아이디는 5 ~ 15자의 영문 소문자나 숫자 또는 조합된 문자열이어야 합니다!");
							 return false;
						  }
						  for(var i = 0; i < inputValue.length; i++) {
							 var chr = inputValue.substr(i,1);
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
					if(inputChks=="engnum"){
					    var NumberChkExp = /[^a-zA-Z0-9]/gi;
						if(NumberChkExp.test(inputName[x].val())== true ) {
							alert('영문,숫자만 입력해주세요');
								inputName[x].focus();
							return false;
						}
					}					
				} ///CHK
            }else if(inputType=="hidden"){
                inputValue = inputName[x].val();
                if(!inputValue ){
                    alert(inputText+"을(를) 학인 해주세요.");
                    return false;
                }
            }else if(inputType=="password"){
                inputValue = inputName[x].val();
                if(!inputValue ){
                        alert(inputText+"을(를) 입력해주세요");
                        inputName[x].focus();
                       return false;
                }else{
                    if(thislimit){
                        var valcnt = inputValue.length;
                        if(thislimit > valcnt){
                                alert(inputText+"의 글자 수가 작습니다.");
                                inputName[x].focus();
                                return false;
                        }
                    }
                }
            }else{ ///select
	 	if (inputName[x]=="array"){
			inputValue = "";

			$("input[name*="+nameVal[x]+"]").each(function(){
				if ($(this).prop('checked')==true){
				    inputValue = inputValue +""+ $(this).val();
				}
			});
		}else{
			inputValue = inputName[x].val();
		}

		if(!inputValue ){
					if ( sVal_select[x]==undefined ){
						alert(inputText+"을(를) 입력해 주세요.");
					}else{
						alert(inputText+"을(를) 선택해 주세요.");
					}
					inputName[x].focus();
                    return false;
                }
            } //inputType
     }
    return true;
}
