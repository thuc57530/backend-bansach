//button-status
const ButtonStatus = document.querySelectorAll("[button-status]");
if (ButtonStatus.length > 0) {
    let url = new URL(window.location.href);
    ButtonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    }
    );
}

// Form search
const formsearch = document.querySelector("#form-search");
if (formsearch) {
    let url = new URL(window.location.href);
    formsearch.addEventListener("submit", (e) => {

        e.preventDefault();
        console.log(e.target.elements.keyword.value);
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;

    });
}
//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");

if (buttonPagination) {
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {


        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");


            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
//CheckBOx
const checkboxMulti = document.querySelector("[checkbox-multi");
if (checkboxMulti) {

    const inputcheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name=id]");

    inputcheckAll.addEventListener("click", () => {
        console.log(inputcheckAll.checked);
        if (inputcheckAll.checked) {
            inputIds.forEach(input => {
                input.checked = true;
            });
        } else {
            inputIds.forEach(input => {
                input.checked = false;
            }
            );
        }
    });

    inputIds.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name=id]:checked");

            if (countChecked.length == inputIds.length) {
                inputcheckAll.checked = true;

            }
            else {
                inputcheckAll.checked = false;
            }
        });

    }
    );

}

// Form checkall
const formchangeMulti = document.querySelector("[form-change-multi]");
if (formchangeMulti) {

    formchangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputchecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;
        if (typeChange === "delete-all") {
            const isConfirm = confirm("ban co chac muon xoa khong");
            if (!isConfirm) {
                return; // tat ca nhung doan sau se dung hoat dong 
            }
        }
        // console.log(typeChange);



        if (inputchecked.length > 0) {
            let ids = [];
            let inputIds = formchangeMulti.querySelector("input[name='ids']");

            inputchecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value; // dua ve the cha  tr va tim den the con input gia' tri chi update ngam`



                    
                    ids.push(`${id}-${position}`);
                }
                else {
                    ids.push(id);
                }

            });
            
            inputIds.value = ids.join(", ");

            formchangeMulti.submit();
        }

        else {
            alert("vui long chon it nhat 1 ban ghi :> ");
        }
    }

    );
}
//show alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert)
{
    
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() =>
    {
        showAlert.classList.add("alert-hidden");
    },time);
    closeAlert.addEventListener("click", () =>
    {
        showAlert.classList.add("alert-hidden");
    });

    
}
// upload IMG
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage)
{
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const closeUploadImage = uploadImage.querySelector("[upload-image-close]");

    uploadImageInput.addEventListener("change", (e) =>
    {
        console.log(e);
        const file = e.target.files[0];
        if(file)
        {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    }
    );
    closeUploadImage.addEventListener("click", ()=>
    {
        uploadImage.value ="";
        uploadImagePreview.src="";
    }
    );
};
