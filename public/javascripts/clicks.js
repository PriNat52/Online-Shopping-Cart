function addItem(){
    window.location.href = '/admin/add';
}

function cancelAdd(){
    window.location.href = '/admin';
}

function canceladd(){
    window.location.href = '/';
}

function cancelDelete(){
    window.location.href = '/admin';
}

function canceldelete(){
    window.location.href = '/member';
}

function addCart(){
    window.location.href = '/member/add';
}

function addMemItem(){
    window.location.href = '/admin/memcart/add';
}

//Sigin Validation
function Submit(){
    let c_id = document.getElementById("c_id").value;
    let c_idError = document.getElementById("c_idError");

    if(c_id === "cs602a" || c_id === "cs602b")
    {
        return true;
    }else if( c_id === "cs602c")
    {
        return true;
    }else
    {
        errorc();
        c_idError.innerHTML = c_idError.textContent;
        return false;
    }
}

function errorc(e){
    document.getElementById("c_id").style.backgroundColor= "red";
}

//Admin page Add validation
function Validate(){
    let p_name = document.getElementById("p_name").value;
    let p_nameError = document.getElementById("p_nameError");
    let p_id = document.getElementById("p_id").value;
    let p_idError = document.getElementById("p_idError");
    let p_qty = document.getElementById("qty").value;
    let p_qtyError = document.getElementById("qtyError");
    let p_price = document.getElementById("price").value;
    let p_priceError = document.getElementById("priceError");

    let p_exp = /^[A-Za-z ]+$/i;
    let reg_id = /^[a-z0-9]+$/i;
    let p_num = /^[0-9.]+$/g;
    console.log('inside validate');

    if(!p_name.match(p_exp)){
        errorn();
        p_nameError.innerHTML = p_nameError.textContent;
        return false;
    }else if(!p_id.match(reg_id)){
        errorid();
        p_idError.innerHTML = p_idError.textContent;
        return false;
    }else if(!p_qty.match(p_num)){
        errorq();
        p_qtyError.innerHTML = p_qtyError.textContent;
        return false;
    }else if(!p_price.match(p_num)){
        errorp();
        p_priceError.innerHTML = p_priceError.textContent;
        return false;
    }else{
        return true;
    }
    ///[1-4][[A-Za-z ]$]/g; ///\w/gi; accepts numbers,alphabets n _underscore
}

function errorn(e){
    document.getElementById("p_name").style.backgroundColor= "red";
}

function errorid(e){
    document.getElementById("p_id").style.backgroundColor= "red";
}

function errorq(e){
    document.getElementById("qty").style.backgroundColor= "red";
}

function errorp(e){
    document.getElementById("price").style.backgroundColor= "red";
}

//Admin page Delete validation
function ValidateDel(){
    let vd_name = document.getElementById("name").value;
    let vd_nameError = document.getElementById("vd_nameError");
    let vd_price = document.getElementById("price").value;
    let vd_priceError = document.getElementById("vd_priceError");

    let vd_exp = /^[A-Za-z ]+$/i;
    let vd_num = /^[0-9.]+$/g;

    if(!vd_name.match(vd_exp)){
        errorvdn();
        vd_nameError.innerHTML = vd_nameError.textContent;
        return false;
    }else if(!vd_price.match(vd_num)){
        errorvdp();
        vd_priceError.innerHTML = vd_priceError.textContent;
        return false;
    }else{
        return true;
    }
}

function errorvdn(e){
    document.getElementById("name").style.backgroundColor= "red";
}

function errorvdp(e){
    document.getElementById("price").style.backgroundColor= "red";
}

//Admin page Edit validation
function ValidEdit(e){
    let ve_name = document.getElementById("name").value;
    let ve_nameError = document.getElementById("ve_nameError");
    let ve_id = document.getElementById("id").value;
    let ve_idError = document.getElementById("ve_idError");
    let ve_price = document.getElementById("price").value;
    let ve_priceError = document.getElementById("ve_priceError");

    let ve_exp = /^[A-Za-z ]+$/i;
    let v_id = /^[a-z0-9]+$/i;
    let ve_num = /^[0-9.]+$/g;

    //console.log('inside valid edit');

    if(!ve_name.match(ve_exp)){
        errorven();
        ve_nameError.innerHTML = ve_nameError.textContent;
        return false;
    }else if(!ve_id.match(v_id)){
        errorve();
        ve_idError.innerHTML = ve_idError.textContent;
        return false;
    }else if(!ve_price.match(ve_num)){
        errorvep();
        ve_priceError.innerHTML = ve_priceError.textContent;
        return false;
    }else{
        return true;
    }
    ///[1-4][[A-Za-z ]$]/g; ///\w/gi; accepts numbers,alphabets n _underscore
}

function errorven(e){
    document.getElementById("name").style.backgroundColor= "red";
}

function errorve(e){
    document.getElementById("id").style.backgroundColor= "red";
}

function errorvep(e){
    document.getElementById("price").style.backgroundColor= "red";
}

//Member Cart Add validation
function MCA(){
    let mca_name = document.getElementById("name").value;
    let mca_nameError = document.getElementById("mca_nameError");
    let mca_id = document.getElementById("id").value;
    let mca_idError = document.getElementById("mca_idError");
    let mca_qty = document.getElementById("qty").value;
    let mca_qtyError = document.getElementById("mca_qtyError");
    let mca_price = document.getElementById("price").value;
    let mca_priceError = document.getElementById("mca_priceError");

    let mca_exp = /^[A-Za-z ]+$/i;
    let ma_id = /^[a-z0-9]+$/i;
    let mca_num = /^[0-9.]+$/g;
    //console.log('inside validate');

    if(!mca_name.match(mca_exp)){
        errormca();
        mca_nameError.innerHTML = mca_nameError.textContent;
        return false;
    }else if(!mca_id.match(ma_id)){
        errormid();
        mca_idError.innerHTML = mca_idError.textContent;
        return false;
    }else if(!mca_qty.match(mca_num)){
        errormcq();
        mca_qtyError.innerHTML = mca_qtyError.textContent;
        return false;
    }else if(!mca_price.match(mca_num)){
        errormcp();
        mca_priceError.innerHTML = mca_priceError.textContent;
        return false;
    }else{
        Submit();
        return true;
    }
    ///[1-4][[A-Za-z ]$]/g; ///\w/gi; accepts numbers,alphabets n _underscore
}

function errormca(e){
    document.getElementById("name").style.backgroundColor= "red";
}

function errormid(e){
    document.getElementById("id").style.backgroundColor= "red";
}

function errormcq(e){
    document.getElementById("qty").style.backgroundColor= "red";
}

function errormcp(e){
    document.getElementById("price").style.backgroundColor= "red";
}

//Memcart Edit Validation
function emc(e){
    let emc_name = document.getElementById("name").value;
    let emc_nameError = document.getElementById("emc_nameError");
    let emc_id = document.getElementById("id").value;
    let emc_idError = document.getElementById("emc_idError");
    let emc_price = document.getElementById("price").value;
    let emc_priceError = document.getElementById("emc_priceError");

    let emc_exp = /^[A-Za-z ]+$/i;
    let em_id = /^[a-z0-9]+$/i;
    let emc_num = /^[0-9.]+$/g;

    //console.log('inside valid edit');

    if(!emc_name.match(emc_exp)){
        erroremc();
        emc_nameError.innerHTML = emc_nameError.textContent;
        return false;
    }else if(!emc_id.match(em_id)){
        errorem();
        emc_idError.innerHTML = emc_idError.textContent;
        return false;
    }else if(!emc_price.match(emc_num)){
        erroremp();
        emc_priceError.innerHTML = emc_priceError.textContent;
        return false;
    }else{
        Submit();
        return true;
    }
    ///[1-4][[A-Za-z ]$]/g; ///\w/gi; accepts numbers,alphabets n _underscore
}

function erroremc(e){
    document.getElementById("name").style.backgroundColor= "red";
}

function errorem(e){
    document.getElementById("id").style.backgroundColor= "red";
}

function erroremp(e){
    document.getElementById("price").style.backgroundColor= "red";
}

//Member Cart Delete Validation
function dmc(){
    let dmc_name = document.getElementById("name").value;
    let dmc_nameError = document.getElementById("dmc_nameError");
    let dmc_id = document.getElementById("id").value;
    let dmc_idError = document.getElementById("dmc_idError");

    let dmc_exp = /^[A-Za-z ]+$/i;
    let dmc_num = /^[a-z0-9]+$/i;

    if(!dmc_name.match(dmc_exp)){
        errordmc();
        dmc_nameError.innerHTML = dmc_nameError.textContent;
        return false;
    }else if(!dmc_id.match(dmc_num)){
        errordmp();
        dmc_idError.innerHTML = dmc_idError.textContent;
        return false;
    }else{
        Submit();
        return true;
    }
}

function errordmc(e){
    document.getElementById("name").style.backgroundColor= "red";
}

function errordmp(e){
    document.getElementById("id").style.backgroundColor= "red";
}