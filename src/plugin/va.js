let TosnPlugin = {}
import Sprite from './sprite'
import regList from './../../static/js/regList.js'
/*
 *va:unrequired 可以为空 
 */

//sameTarget sameas 的classname
function checkElement (el,valiType,sameTarget,elTarget) {
    let $el = Sprite(el);
    let _msg = regList[valiType] || {empty: `${valiType}不能为空`,error: `请输入合法的${valiType}`};  //有没有自定义规则
    $el.attr("data-empty") && (_msg = Object.assign({},_msg,{"empty": $el.attr("data-empty")}))
    $el.attr("data-error") && (_msg = Object.assign({},_msg,{"error": $el.attr("data-error")}))
    $el.attr("data-pattern") && (_msg = Object.assign({},_msg,{"pattern": eval($el.attr("data-pattern"))}))
    let _message = '',_check = true;
    if (!(el.getAttribute("unrequired") != null) && el.value.trim() == '') {
        _check = false;
        _message = _msg['empty']
    }
    else if (valiType == 'sameas' && sameTarget != undefined) {
        let _target = document.querySelector("."+sameTarget);
        if (el.value.trim() != _target.value.trim()) {
            _check = false;
            _message = _msg['error']
        }
    }
    else if ((el.getAttribute("unrequired") != null) && el.value.trim() == '') {
        _check = true
    }
    else if (_msg['pattern'] && !_msg['pattern'].test($el.val().trim())) {
        if (elTarget && elTarget != '') {
            let targetElement = document.querySelector("."+elTarget);
            if (targetElement.value.trim() != '') {
                checkElement(targetElement,targetElement.valiType,targetElement.sameTarget)
            }
        }
        _check = false;
        _message = _msg['error']
        
    }
    else if (_msg['pattern'] && _msg['pattern'].test($el.val().trim()) && elTarget && elTarget != '') {
        let targetElement = document.querySelector("."+elTarget);
        if (targetElement.value.trim() != '') {
            checkElement(targetElement,targetElement.valiType,targetElement.sameTarget)
        }
    }
    else {
        _check = true
    }
    // let $_oParent = $el.parents(".form-item");   //如果有外层的div

    let $_oParent = $el;  //如果直接在元素后追加
    if (!_check) {
        if($_oParent.next('.va-message').length > 0) {
            $_oParent.addClass("input-error");
            $_oParent.next('.va-message').text(_message)
        }
        else {
            $_oParent.addClass("input-error");
            $_oParent.after("<p class='va-message'>"+_message+"</p>")
        }
    }
    else {
        $_oParent.removeClass("input-error");
        $_oParent.next('.va-message').remove();
    }
    return _check
}

function focuseElement (el,valiType,sameTarget,elTarget) {
    let $el = Sprite(el);
    // let $_oParent = $el.parents(".form-item");   //如果有外层的div
    let $_oParent = $el;
    $_oParent.removeClass("input-error");
    $_oParent.next(".va-message").remove();

    if (elTarget) {
        let _target = document.querySelector("."+elTarget);
        // let $_targetParent = Sprite(_target).parents(".form-item");   //如果有外层的div
        let $_targetParent = Sprite(_target);
        $_targetParent.removeClass("input-error");
        $_targetParent.next(".va-message").remove();
    }
}

// function showClear (el) {
//     let $el = Sprite(el);
//     if ($el.val().trim() != '') {
//         if($el.next('.va-clear-text').length > 0) {
//             $el.next('.va-clear-text')[0].style.display = 'block'
//         }
//         else {
//             $el.parent().append("<span class='va-clear-text'>x</span>");

//             document.querySelector(".va-clear-text").onclick = function (e) {
//             }
//         }
//     }
//     else {
//         $el.next(".va-clear-text").remove();
//     }
// }


// function hideClear (el) {
//     let $el = Sprite(el);
//     $el.next(".va-clear-text").remove();
// }

TosnPlugin.install = function (Vue, options) {
    Vue.directive('va', {
        inserted (el,binding,vnode) {
            let valiType = binding.arg === 'EXTEND' ? el.getAttribute('valiType'): binding.arg;
            let sameTarget = Object.keys(binding.modifiers)[0];
            el.valiType = valiType;
            (!!sameTarget) && (el.sameTarget = sameTarget);
            Sprite(el).addClass('va-validator');
            let elTarget = '';
            if (binding.value && binding.value.target != '') {
                elTarget = binding.value.target
            }
            el.onblur = function () {
                setTimeout (() => {
                    checkElement(el,valiType,sameTarget,elTarget)
                },0)
                // hideClear(el);
            }

            el.onfocus = function () {
                focuseElement(el,valiType,sameTarget,elTarget)
                // showClear(el);
            }

            // el.oninput = function () {
            //     showClear(el);
            // }
        }
    })

    Vue.directive("va-check", {
        bind: function (el, binding, vnode) {
            el.addEventListener('click', function () {
                let isScroll = el.getAttribute("unscroll");
                let _formCheck = true;
                let domList = [];
                let key = Object.keys(binding.modifiers);
                if (key.length > 0) {
                    domList = document.querySelectorAll('.'+key[0])
                }
                else {
                    domList = document.querySelectorAll(".va-validator");
                }
                for (let i = 0;i< domList.length; i++) {
                    let dom = domList[i],
                        valiType = dom.valiType,
                        sameTarget = dom.sameTarget,
                        value = dom.value.trim();
                        _formCheck = checkElement(dom,valiType,sameTarget) && _formCheck
                }
                if (_formCheck) {
                    binding.value && binding.value();
                }
                else if(isScroll == null) {
                    let errInput = document.querySelector(".form-item.input-error");
                    // VueScrollTo.scrollTo(errInput,{
                    //     offset: -100
                    // })
                }
            })
        }
    })

    Vue.prototype.$vaReset = (container) => {
        if (container.target && container.clientX && container.clientY) {
            container = '#App'
        }
        Sprite(container+ ' .va-message').remove();
        Sprite(container+ ' .va-validator').removeClass("input-error")
    }

    Vue.prototype.$vaCheckElement = function (domList) {
        for (let i = 0;i< domList.length; i++) {
            let dom = domList[i],
            valiType = dom.valiType,
            sameTarget = dom.sameTarget,
            value = dom.value.trim();
            checkElement(dom,valiType,sameTarget)
        }
    }
}

export default TosnPlugin