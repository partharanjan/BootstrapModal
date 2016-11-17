/*
Author: Partha Ranjan Nayak
Dynamic Bootstrap Modal
http://partha.pw
*/
function BsModal(heading, size) {
    var modal_size = "modal-";
    if (typeof size == "undefined") {
        modal_size = modal_size + "lg";
    }
    else {
        modal_size = modal_size + size;
    }
    this.ID =0;
    this.ModalID = "";
    this.MessageID = "";
    this.Heading =heading;
    this.BodyID = "";
    this.Size = modal_size;
    this.OnClose = function () { };
}

BsModal.prototype.show = function (url,postParam,func_callback) {
    //set the ID of the modal
    var d = new Date();
    this.ID = d.getTime();
    this.ModalID="modal_"+this.ID;
    this.BodyID = 'modal_body_' + this.ID;
    this.MessageID = "modal_msg_" + this.ID;

    var modalStr = '<div class="modal fade" id="'+ this.ModalID + '" tabindex="-1" name="dynamicBsModal" data-backdrop="static" data-keyboard="false">';
    modalStr += '<div class="modal-dialog '+this.Size+'">';
    modalStr += '<div class="modal-content">';
    //header area
    modalStr += '<div class="modal-header">';
    modalStr += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="modal_close_'+this.ID+'"><span aria-hidden="true">&times;</span></button>';
    modalStr += '<h4 class="modal-title">' + this.Heading + '</h4>';
    modalStr += '</div>';
    //body area
    modalStr += '<div class="modal-body">';
    //dynamic message
    modalStr += '<div id="' + this.MessageID + '"></div>';
    //body content
    modalStr += '<div id="' + this.BodyID + '">';
    modalStr += '<div style="text-align:center">Please wait...</div>';
    modalStr += "</div></div>";
    //end of the page
    modalStr += "</div></div></div></div>";
    //append the child
    var div = document.createElement('div');
    div.innerHTML = modalStr;
    while (div.children.length > 0) {
        document.body.appendChild(div.children[0]);
    }
    //modal
    var obj = this;
    $(document.getElementById(this.ModalID)).modal('show');
    //close
    $("#modal_close_" + this.ID).click(function (e) {
        obj.close();
    });

    //load url
    if(typeof url!='undefined')
    {
        var isPost = false;
        var isCallBack = false;
        //check for post
        if (typeof postParam != 'undefined')
        {
            if (postParam != null) {
                isPost = true;
            }
        }
        //check call back
        if (typeof func_callback != 'undefined') {
            if (typeof func_callback === "function") {
                isCallBack = true;
            }
        }
        if (isPost) {
            $("#" + this.BodyID).load(url, postParam, function () {
                if (isCallBack) {
                    func_callback();
                }

            });
        }
        else {
            $("#" + this.BodyID).load(url, function () {
                if (isCallBack) {
                    func_callback();
                }
            });
        }
    }
},

BsModal.prototype.close=function()
{
    var modal = document.getElementById(this.ModalID);
    if (modal != null) {

        //remove body class
        $("body").removeClass("modal-open");
        $("body").css('padding-right','0px');
        //remove from body
        document.body.removeChild(modal);

        $('.modal-backdrop').remove();
    }
}

BsModal.prototype.reload=function(url)
{
    $("#" + this.BodyID).load(url);
}

BsModal.prototype.setMessage = function (message, type) {
    var msg_type = 'danger';
    if (typeof type != 'undefined') {
        msg_type = type;
    }
    $("#" + this.MessageID).html('<div class="alert alert-' + msg_type + '"><p>' + message + '</p></div>');
}
