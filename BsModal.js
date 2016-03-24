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
    this.ModalID="";
    this.Heading =heading;
    this.BodyID = "";
    this.Size = modal_size;
    this.OnClose = function () { };
}

BsModal.prototype.show = function () {
    //set the ID of the modal
    var d = new Date();
    this.ID = d.getTime();
    this.ModalID="modal_"+this.ID;
    this.BodyID = 'modal_body_' + this.ID;

    var modalStr = '<div class="modal fade" id="'+ this.ModalID + '" tabindex="-1" name="dynamicBsModal" data-backdrop="static" data-keyboard="false">';
    modalStr += '<div class="modal-dialog '+this.Size+'">';
    modalStr += '<div class="modal-content">';
    //header area
    modalStr += '<div class="modal-header">';
    modalStr += '<button type="button" class="close" data-dismiss="modal" aria-label="Close" id="modal_close_'+this.ID+'"><span aria-hidden="true">&times;</span></button>';
    modalStr += '<h4 class="modal-title">' + this.Heading + '</h4>';
    modalStr += '</div>';
    //body area
    modalStr += '<div class="modal-body" id="' + this.BodyID + '">';
    modalStr += '<div style="text-align:center"><img src="/assets/core/img/loader/ripple.gif" /> Please wait...</div>';
    modalStr += "</div>";
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
},

BsModal.prototype.close=function()
{
    var modal = document.getElementById(this.ModalID);
    if (modal != null) {
        //remove body class
        $("body").removeClass("modal-open");
        //remove from body
        document.body.removeChild(modal);
        //fire close
        obj.OnClose();
    }
}