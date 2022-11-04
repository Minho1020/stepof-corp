$(document).ready(function () {
    const addBtn = document.querySelector("#submit-btn"),
        content = document.querySelector("#input-content"),
        url = document.querySelector("#input-link"),
        date = document.querySelector("#input-date");

    getHistory()
    addBtn.addEventListener("click", addHistory);

    $("#add-history-box-btn").click(function () {
        if($(this).hasClass("on")) {
            closeAdd();
        } else if($(this).hasClass("off")) {
            openAdd();
        }

    });
    $(".on").click(closeAdd());
    $(".optionArray-Btn").click(function() {
        $(".selected").removeClass("selected")
        $(this).toggleClass("selected")
        getHistory()
    });
    $(".optionYear-Btn").click(function() {
        const id = $(this).attr('id').slice(2,);
        const location = document.getElementById(id).offsetTop - 100;
        window.scrollTo({top:location, behavior:"smooth"})
    })
    
    function openAdd() {
        $("#add-history-box-btn > i").css("transform","rotateZ(135deg)");
        $(".close").attr("class","open");
        $(".off").attr("class","on");
    };
    function closeAdd() {
        $(".open").attr("class","close");
        $("#add-history-box-btn > i").css("transform","rotateZ(0)");
        $(".on").attr("class","off");
    };
    
    function getHistory() {
        const option = document.querySelector(".selected").id.toString();
        const req = {
            order : option,
        };
        fetch("history/gethistories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((data) => {
            $("#2022year-group").html("");
            $("#2021year-group").html("");
            for(const i of data) {
                const card = `
                <div class="history-card" id="${i.historyId}">
                    <div class="history-card-wrapper">
                        <div class="history-card-content">
                            <div class="history-icon"><i class="fa-solid fa-shoe-prints"></i></div>
                            <div class="history-content">
                                <div class="history-date">${i.historyDate.slice(5,7) + "월" + " " + i.historyDate.slice(8,10) + "일"}</div>
                                <a href="${i.historyURL}" class="history-title">${i.historyContent}<span class="title-line"></span></a>
                            </div>
                        </div>
                        <div class="history-card-setting">
                            <div class="history-card-setting-right">
                                <div class="history-card-edit edit-btn"><i class="fa-solid fa-pen-to-square"></i></div>
                                <div class="history-card-delete delete-btn"><i class="fa-solid fa-trash-can"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                if(i.historyDate.slice(0,4) === "2022") {
                    $("#2022year-group").append(card);
                } else if(i.historyDate.slice(0,4) === "2021") {
                    $("#2021year-group").append(card);
                }
            }
            $(".delete-btn").click(function () {
                const info = {
                    id : $(this).parent().parent().parent().parent().attr('id'),
                    type : "delete",
                }
                popup(info);
            });
            $(".edit-btn").click(function() {
                const info = {
                    id : $(this).parent().parent().parent().parent().attr('id'),
                    type : "edit",
                }
                popup(info);
            })
        })

    };

    function addHistory() {
        if(!content.value) return alert("스토리를 입력해주세요");
        if(!date.value) return alert("날짜를 기입해주세요");
        if(!url.value) return alert("URL를 입력해주세요");

        const req = {
            content : content.value,
            date : date.value,
            url :  url.value,
        };

        fetch("history/addhistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.success = true) {
                alert("스토리가 포스트되었습니다.");
                location.href=location.href;
            } else {
                alert("다시 시도해주세요.");
                location.href=location.href;
            }
        })
    };

    const popupQuitBtn = document.querySelector("#quit"),
        popupQuitWrapper = document.querySelector("#popup-background"),
        secureId = document.querySelector("#popupId"),
        securePsword = document.querySelector("#popupPsword"),
        secureBtn = document.querySelector("#userCheck-btn");

    popupQuitBtn.addEventListener("click", popdown);
    popupQuitWrapper.addEventListener("click", popdown);

    secureBtn.addEventListener("click", async function() {
        const id = $(".popup").attr('data-id');
        const type = $(".popup").attr('data-type');
        const response = await check();
        if(response.success) {
            if(type === "delete") {
                deleteHistory(id);
            } else if(type === "edit") {
                editOpen(id)
            };
        } else if(!response.success) {
            popdown()
            popup()
        }
    })
    

    function popup(info) {
        $("#popup-background").fadeIn("fast");
        $(".popup").fadeIn("fast");
        $(".popup").attr("data-id" , info.id );
        $(".popup").attr('data-type', info.type);
        $("#popupId").focus()
    };

    function popdown() {
        secureId.value = '';
        securePsword.value = '';
        $("#popup-background").fadeOut("fast");
        $(".popup").fadeOut("fast");
    };


    async function check() {
        const req = {
            id : secureId.value,
            psword : securePsword.value,
        };

        const response = await fetch("user/secure", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            return res;
        })
        return response;
    }

    async function deleteHistory(id) {
        $(".popup").attr('data-id','');
        popdown()

        const response = confirm("스토리를 삭제하시겠습니까?");
        if(response) {
            const req = {
                id: id,
            };

            fetch("history/deletehistory",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            })
            .then((res) => res.json())
            .then((res) => {
                if(res.success = true) {
                    alert("스토리가 삭제되었습니다.");
                    location.href=location.href;
                } else {
                    alert("다시 시도해주세요.");
                    location.href=location.href;
                }
            })
        } else {
            return false;
        }

    };

    

    function editOpen(id) {
        $(".popup").attr('data-id','');
        popdown()

        const req = {
            id : id,
        }
        fetch("history/gethistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }).then((res) => res.json())
        .then((data) => {
            const editBox = `
            <div id="edit-history-input">
                <div id="edit-history-input-wrapper">
                    <textarea id="edit-content" placeholder="문구를 입력해주세요" >${data[0].historyContent}</textarea>
                    <div id="edit-group">                            
                        <input type="date" name="edit-date" id="edit-date" value="${data[0].historyDate}">
                        <input type="url" name="edit-link" id="edit-link" placeholder="URL을 입력해주세요" value="${data[0].historyURL}">
                    </div>
                    <div id="edit-history-submit">
                        <button id="edit-cancel">취소</button>
                        <button id="edit-submit">계속</button>
                    </div> 
                </div>                    
            </div>
            `;
            $(`#${data[0].historyId}`).append(editBox);
            $(`#${data[0].historyId}`).css("border","solid 3px #5786FF")
            $("#edit-history-input").slideDown('fast');

            $("#edit-cancel").click(editCancel)
            $("#edit-submit").click(function() {
                const editContent = document.querySelector("#edit-content"),
                    editDate = document.querySelector("#edit-date"),
                    editURL = document.querySelector("#edit-link");

                const info = {
                    content : editContent.value,
                    date : editDate.value,
                    url : editURL.value,
                }
                editHistory(info);
            })


        })
    }
    function editCancel() {
        const response = confirm("스토리 수정을 취소하시겠습니까?")
        if(response) {
            $("#edit-history-input").slideUp('fast');
            $(`#edit-history-input`).parent().css("border","solid 3px white", function() {
                $("#edit-history-input").remove()
            });
        } else {
            return
        }
    }


    function editHistory(info) {
        const response = confirm("내용이 올바른지 확인하신 후 스토리를 수정하시겠습니까?");
        if(response) {
            const req = {
                content : info.content,
                date : info.date,
                url : info.url,
                id : $("#edit-history-input").parent().attr('id'),
            }
            fetch("history/updatehistory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            }).then((res) => res.json())
            .then((res) => {
                if(res.success) {
                    alert("스토리가 수정되었습니다")
                    location.href=location.href;
                }
            })
        }

    }
})