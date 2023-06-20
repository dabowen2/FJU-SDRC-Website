function upload_file(table){
    var file = document.getElementById(`input_${table}_file`).files[0];
    if(!file) {
        Swal.fire({title:'未選擇檔案', text:'請再確認上傳檔案',icon:'warning',timer:1300})
    }
    else{
        var myformData = new FormData(); 
        myformData.append('file',file);
        $.ajax({
            type: 'POST',
            async: false,
            processData: false,
            contentType: false,
            cache: false,
            url: `/upload_file/${table}`,
            data: myformData,
            enctype: 'multipart/form-data',
            success: function(result) {
                if(result == 'success'){
                    Swal.fire({title:'上傳成功！',icon:'success',timer:2000, showConfirmButton: false})
                    setTimeout(function () {
                        location.reload();
                    }, 2200);
                }
                else if(result == 'fail')
                    Swal.fire({title:'上傳出錯',icon:'error',timer:1200, showConfirmButton: false , toast:true})
                else
                    Swal.fire({title:'上傳失敗',text:result, icon:'error' ,showConfirmButton: true})
            },
            error: function(e) {
                Swal.fire({title:'執行失敗',text:e, icon:'error' ,showConfirmButton: true, toast:true})
            }
        });
    }
    
}

function saveEdit(obj){
    var id = $(obj).parents("tr").find("td.id").html();
    var medicineName = $(obj).parents("tr").find("td.medicine").html();
    var weightVal = $(obj).parents("tr").find(".weight").val();
    console.log(id, medicineName, weightVal);
    var data = {
        'id': id,
        'medicineName': medicineName,
        'weightVal': weightVal
    }
    $.ajax({
        type: 'POST',
        async: false,
        url: `/upload/edit_weight`,
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(data),
        success: function(result) {
            if(result == 'success'){
                Swal.fire({title:'修改成功！',icon:'success',timer:2000, showConfirmButton: false})
            }
            else
                Swal.fire({title:'修改失敗',text:'執行結果'+result, icon:'error', showConfirmButton: true})
        },
        error: function(e) {
            Swal.fire({title:'執行失敗',text:e, icon:'error' ,showConfirmButton: true, toast:true})
        }
    });
}